import {
    CancellationToken,
    InlayHint,
    InlayHintKind,
    InlayHintLabelPart,
    InlayHintRequest,
    Position,
    Range
} from 'vscode-languageserver-protocol';
import { Document, isInTag, mapRangeToOriginal } from '../../../lib/documents';
import { getAttributeContextAtPosition } from '../../../lib/documents/parseHtml';
import { InlayHintProvider } from '../../interfaces';
import { DocumentSnapshot } from '../../typescript/DocumentSnapshot';
import { isInGeneratedCode, startsWithIgnoredPosition } from '../../typescript/features/utils';
import { isSvelte2tsxShimFile } from '../../typescript/utils';
import { TsApiService } from '../lspService';
import { tsAst } from '../types';
import {
    findContainingNode,
    findRenderFunction,
    getScannerForSourceFile,
    getStartOfNode,
    isSvelteFilePath,
    scanSyntaxNode
} from './utils';

interface InlayHintFilterContext {
    tsAstModule: typeof tsAst;
    sourceFile: tsAst.SourceFile;
    tsDoc: DocumentSnapshot;
    scanner?: tsAst.Scanner | undefined;
}

export class TsGoInlayHintProvider implements InlayHintProvider {
    private readonly tsApiService: TsApiService;
    constructor(tsApiService: TsApiService) {
        this.tsApiService = tsApiService;
    }

    async getInlayHints(
        document: Document,
        range: Range,
        cancellationToken?: CancellationToken
    ): Promise<InlayHint[] | null> {
        const tsDoc = this.tsApiService.getDocumentSnapshot(document);
        if (!tsDoc) {
            return null;
        }

        const generatedRange = this.mapToTargetRange(range, tsDoc);
        const inlayHints = await this.tsApiService.sendRequest(
            InlayHintRequest.type,
            {
                textDocument: { uri: document.uri },
                range: generatedRange
            },
            cancellationToken
        );

        if (!inlayHints) {
            return null;
        }

        const [apiProject, tsAstModule] = await Promise.all([
            this.tsApiService.getApiProject(tsDoc.filePath),
            this.tsApiService.importAstApi()
        ]);
        const sourceFile = await apiProject?.program.getSourceFile(tsDoc.filePath);
        if (!sourceFile) {
            return null;
        }

        const renderFunction = findRenderFunction(tsAstModule, sourceFile);
        const context: InlayHintFilterContext = {
            tsAstModule,
            sourceFile,
            tsDoc
        };
        const renderFunctionReturnTypeLocation =
            renderFunction && this.getTypeAnnotationPosition(context, renderFunction);

        const result = inlayHints
            .filter(
                (inlayHint) =>
                    !isInGeneratedCode(tsDoc.getFullText(), tsDoc.offsetAt(inlayHint.position)) &&
                    tsDoc.offsetAt(inlayHint.position) !== renderFunctionReturnTypeLocation &&
                    !this.isSvelte2tsxFunctionHints(inlayHint, context) &&
                    !this.isGeneratedVariableTypeHint(inlayHint, context) &&
                    !this.isGeneratedAsyncFunctionReturnType(inlayHint, context) &&
                    !this.isGeneratedFunctionReturnType(inlayHint, context)
            )
            .map(
                (inlayHint): InlayHint => ({
                    label: this.convertInlayHintLabelParts(inlayHint),
                    position: this.getOriginalPosition(document, tsDoc, inlayHint),
                    kind: inlayHint.kind,
                    paddingLeft: inlayHint.paddingLeft,
                    paddingRight: inlayHint.paddingRight
                })
            );

        return result.filter(
            (inlayHint) =>
                inlayHint.position.line >= 0 &&
                inlayHint.position.character >= 0 &&
                !this.checkGeneratedFunctionHintWithSource(inlayHint, document)
        );
    }

    private mapToTargetRange(range: Range, snapshot: DocumentSnapshot) {
        const generatedStartOffset = snapshot.getGeneratedPosition(range.start);
        const generatedEndOffset = snapshot.getGeneratedPosition(range.end);

        const start = generatedStartOffset.line < 0 ? 0 : snapshot.offsetAt(generatedStartOffset);
        const end =
            generatedEndOffset.line < 0
                ? snapshot.getLength()
                : snapshot.offsetAt(generatedEndOffset);

        return {
            start: snapshot.positionAt(start),
            end: snapshot.positionAt(end)
        };
    }

    private getOriginalPosition(
        document: Document,
        tsDoc: DocumentSnapshot,
        inlayHint: InlayHint
    ): Position {
        let originalPosition = tsDoc.getOriginalPosition(inlayHint.position);
        if (inlayHint.kind === InlayHintKind.Type) {
            const originalOffset = document.offsetAt(originalPosition);
            const source = document.getText();
            // detect if inlay hint position is off by one
            // by checking if source[offset] is part of an identifier
            // https://github.com/sveltejs/language-tools/pull/2070
            if (
                originalOffset < source.length &&
                !/[\x00-\x23\x25-\x2F\x3A-\x40\x5B\x5D-\x5E\x60\x7B-\x7F]/.test(
                    source[originalOffset]
                )
            ) {
                originalPosition.character += 1;
            }
        }

        return originalPosition;
    }

    private convertInlayHintLabelParts(inlayHint: InlayHint) {
        if (typeof inlayHint.label === 'string') {
            return inlayHint.label;
        }

        return inlayHint.label.map((part): InlayHintLabelPart => {
            if (!part.location || !isSvelteFilePath(part.location.uri)) {
                return part;
            }

            const snapshot = this.tsApiService.getDocumentSnapshot(part.location.uri);
            if (!snapshot) {
                return part;
            }

            const originalLocation = mapRangeToOriginal(snapshot, part.location.range);

            return {
                ...part,
                location: {
                    uri: snapshot.getURL(),
                    range: originalLocation
                }
            };
        });
    }

    private isSvelte2tsxFunctionHints(
        inlayHint: InlayHint,
        context: InlayHintFilterContext
    ): boolean {
        if (inlayHint.kind !== InlayHintKind.Parameter) {
            return false;
        }

        if (
            inlayHint.label &&
            typeof inlayHint.label !== 'string' &&
            inlayHint.label?.some((v) => isSvelte2tsxShimFile(v.location?.uri))
        ) {
            return true;
        }

        const offset = context.tsDoc.offsetAt(inlayHint.position);
        const hasParameterWithSamePosition = (node: tsAst.CallExpression | tsAst.NewExpression) =>
            node.arguments !== undefined &&
            node.arguments.some(
                (arg) => getStartOfNode(context.tsAstModule, arg, context.sourceFile) === offset
            );

        const tsAstModule = context.tsAstModule;
        const node = findContainingNode(
            context.sourceFile,
            { start: inlayHint.position, end: inlayHint.position },
            context.tsDoc,
            (node): node is tsAst.CallExpression | tsAst.NewExpression =>
                (tsAstModule.isCallExpression(node) || tsAstModule.isNewExpression(node)) &&
                hasParameterWithSamePosition(node)
        );

        if (!node) {
            return false;
        }

        const isComponentEventHandler = tsAstModule.isPropertyAccessExpression(node.expression)
            ? tsAstModule.isIdentifier(node.expression.name) && node.expression.name.text === '$on'
            : false;

        return (
            isComponentEventHandler ||
            this.isCreateElementCall(tsAstModule, node) ||
            (tsAstModule.isIdentifier(node.expression) &&
                (node.expression.text.includes('__sveltets_') ||
                    node.expression.text.startsWith('$$_')))
        );
    }

    private isCreateElementCall(
        tsAstModule: typeof tsAst,
        node: tsAst.CallExpression | tsAst.NewExpression
    ): boolean {
        return (
            tsAstModule.isPropertyAccessExpression(node.expression) &&
            tsAstModule.isIdentifier(node.expression.name) &&
            node.expression.name.text === 'createElement'
        );
    }

    private isGeneratedVariableTypeHint(
        inlayHint: InlayHint,
        context: InlayHintFilterContext
    ): boolean {
        if (inlayHint.kind !== InlayHintKind.Type) {
            return false;
        }

        const { sourceFile, tsDoc, tsAstModule } = context;
        if (startsWithIgnoredPosition(sourceFile.text, tsDoc.offsetAt(inlayHint.position))) {
            return true;
        }

        const declaration = findContainingNode(
            sourceFile,
            { start: inlayHint.position, end: inlayHint.position },
            tsDoc,
            tsAstModule.isVariableDeclaration
        );

        if (!declaration) {
            return false;
        }

        // $$_tnenopmoC, $$_value, $$props, $$slots, $$restProps...
        return (
            isInGeneratedCode(sourceFile.text, declaration.pos) ||
            (tsAstModule.isIdentifier(declaration.name) && declaration.name.text.startsWith('$$'))
        );
    }

    private isGeneratedAsyncFunctionReturnType(
        inlayHint: InlayHint,
        context: InlayHintFilterContext
    ) {
        if (inlayHint.kind !== InlayHintKind.Type) {
            return false;
        }

        const sourceFile = context.sourceFile;
        const tsDoc = context.tsDoc;
        const tsAstModule = context.tsAstModule;
        const expression = findContainingNode(
            sourceFile,
            { start: inlayHint.position, end: inlayHint.position },
            tsDoc,
            (node): node is tsAst.ArrowFunction => tsAstModule.isArrowFunction(node)
        );

        if (
            !expression?.modifiers?.some((m) => m.kind === tsAstModule.SyntaxKind.AsyncKeyword) ||
            !expression.parent?.parent ||
            !tsAstModule.isBlock(expression.parent.parent)
        ) {
            return false;
        }

        return (
            expression.type == null &&
            this.getTypeAnnotationPosition(context, expression) ===
                context.tsDoc.offsetAt(inlayHint.position)
        );
    }

    private isGeneratedFunctionReturnType(inlayHint: InlayHint, context: InlayHintFilterContext) {
        if (inlayHint.kind !== InlayHintKind.Type) {
            return false;
        }

        const { sourceFile, tsDoc, tsAstModule } = context;
        // $: a = something
        // it's always top level and shouldn't be under other function call
        // so we don't need to use findClosestContainingNode
        const expression = findContainingNode(
            sourceFile,
            { start: inlayHint.position, end: inlayHint.position },
            tsDoc,
            (node): node is IdentifierCallExpression =>
                tsAstModule.isCallExpression(node) && tsAstModule.isIdentifier(node.expression)
        );

        if (!expression) {
            return false;
        }

        return (
            expression.expression.text === '__sveltets_2_invalidate' &&
            tsAstModule.isArrowFunction(expression.arguments[0]) &&
            expression.arguments[0].type == null &&
            this.getTypeAnnotationPosition(context, expression.arguments[0]) ===
                tsDoc.offsetAt(inlayHint.position)
        );
    }

    private getTypeAnnotationPosition(
        context: InlayHintFilterContext,
        decl:
            | tsAst.FunctionDeclaration
            | tsAst.ArrowFunction
            | tsAst.FunctionExpression
            | tsAst.MethodDeclaration
            | tsAst.GetAccessorDeclaration
    ) {
        // the type said parameters is always defined but it can be undefined
        const scanStart = decl.parameters?.end ?? decl.name?.end ?? decl.pos;
        if (!context.scanner) {
            context.scanner = getScannerForSourceFile(
                context.tsAstModule,
                context.sourceFile,
                scanStart
            );
        }
        const scanner = context.scanner;
        const closeParenToken = scanSyntaxNode(
            decl,
            scanner,
            scanStart,
            context.tsAstModule.SyntaxKind.CloseParenToken
        );

        if (closeParenToken) {
            return closeParenToken.end;
        }
        return decl.parameters?.end;
    }

    private checkGeneratedFunctionHintWithSource(inlayHint: InlayHint, document: Document) {
        if (isInTag(inlayHint.position, document.moduleScriptInfo)) {
            return false;
        }

        if (isInTag(inlayHint.position, document.scriptInfo)) {
            return document
                .getText()
                .slice(document.offsetAt(inlayHint.position))
                .trimStart()
                .startsWith('$:');
        }

        const attributeContext = getAttributeContextAtPosition(document, inlayHint.position);

        if (!attributeContext || attributeContext.inValue || !attributeContext.name.includes(':')) {
            return false;
        }

        const { name, elementTag } = attributeContext;

        // <div on:click>
        if (name.startsWith('on:') && !elementTag.attributes?.[attributeContext.name]) {
            return true;
        }

        const directives = ['in', 'out', 'animate', 'transition', 'use'];

        // hide
        // - transitionCall: for __sveltets_2_ensureTransition
        // - tag: for svelteHTML.mapElementTag inside transition call and action call
        // - animationCall: for __sveltets_2_ensureAnimation
        // - actionCall for __sveltets_2_ensureAction
        return directives.some((directive) => name.startsWith(directive + ':'));
    }
}

interface IdentifierCallExpression extends tsAst.CallExpression {
    expression: tsAst.Identifier;
}
