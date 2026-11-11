import type * as tsAst from "@typescript/native/ast" with { "resolution-mode": "import" };
import type ts from "typescript";
export interface ReadonlyTextRange {
    readonly pos: number;
    readonly end: number;
}
export enum SyntaxKind {
    Unknown = 0,
    EndOfFileToken = 1,
    SingleLineCommentTrivia = 2,
    MultiLineCommentTrivia = 3,
    NewLineTrivia = 4,
    WhitespaceTrivia = 5,
    ShebangTrivia = 6,
    ConflictMarkerTrivia = 7,
    NonTextFileMarkerTrivia = 8,
    NumericLiteral = 9,
    BigIntLiteral = 10,
    StringLiteral = 11,
    JsxText = 12,
    JsxTextAllWhiteSpaces = 13,
    RegularExpressionLiteral = 14,
    NoSubstitutionTemplateLiteral = 15,
    TemplateHead = 16,
    TemplateMiddle = 17,
    TemplateTail = 18,
    OpenBraceToken = 19,
    CloseBraceToken = 20,
    OpenParenToken = 21,
    CloseParenToken = 22,
    OpenBracketToken = 23,
    CloseBracketToken = 24,
    DotToken = 25,
    DotDotDotToken = 26,
    SemicolonToken = 27,
    CommaToken = 28,
    QuestionDotToken = 29,
    LessThanToken = 30,
    LessThanSlashToken = 31,
    GreaterThanToken = 32,
    LessThanEqualsToken = 33,
    GreaterThanEqualsToken = 34,
    EqualsEqualsToken = 35,
    ExclamationEqualsToken = 36,
    EqualsEqualsEqualsToken = 37,
    ExclamationEqualsEqualsToken = 38,
    EqualsGreaterThanToken = 39,
    PlusToken = 40,
    MinusToken = 41,
    AsteriskToken = 42,
    AsteriskAsteriskToken = 43,
    SlashToken = 44,
    PercentToken = 45,
    PlusPlusToken = 46,
    MinusMinusToken = 47,
    LessThanLessThanToken = 48,
    GreaterThanGreaterThanToken = 49,
    GreaterThanGreaterThanGreaterThanToken = 50,
    AmpersandToken = 51,
    BarToken = 52,
    CaretToken = 53,
    ExclamationToken = 54,
    TildeToken = 55,
    AmpersandAmpersandToken = 56,
    BarBarToken = 57,
    QuestionToken = 58,
    ColonToken = 59,
    AtToken = 60,
    QuestionQuestionToken = 61,
    BacktickToken = 62,
    HashToken = 63,
    EqualsToken = 64,
    PlusEqualsToken = 65,
    MinusEqualsToken = 66,
    AsteriskEqualsToken = 67,
    AsteriskAsteriskEqualsToken = 68,
    SlashEqualsToken = 69,
    PercentEqualsToken = 70,
    LessThanLessThanEqualsToken = 71,
    GreaterThanGreaterThanEqualsToken = 72,
    GreaterThanGreaterThanGreaterThanEqualsToken = 73,
    AmpersandEqualsToken = 74,
    BarEqualsToken = 75,
    BarBarEqualsToken = 76,
    AmpersandAmpersandEqualsToken = 77,
    QuestionQuestionEqualsToken = 78,
    CaretEqualsToken = 79,
    Identifier = 80,
    PrivateIdentifier = 81,
    BreakKeyword = 83,
    CaseKeyword = 84,
    CatchKeyword = 85,
    ClassKeyword = 86,
    ConstKeyword = 87,
    ContinueKeyword = 88,
    DebuggerKeyword = 89,
    DefaultKeyword = 90,
    DeleteKeyword = 91,
    DoKeyword = 92,
    ElseKeyword = 93,
    EnumKeyword = 94,
    ExportKeyword = 95,
    ExtendsKeyword = 96,
    FalseKeyword = 97,
    FinallyKeyword = 98,
    ForKeyword = 99,
    FunctionKeyword = 100,
    IfKeyword = 101,
    ImportKeyword = 102,
    InKeyword = 103,
    InstanceOfKeyword = 104,
    NewKeyword = 105,
    NullKeyword = 106,
    ReturnKeyword = 107,
    SuperKeyword = 108,
    SwitchKeyword = 109,
    ThisKeyword = 110,
    ThrowKeyword = 111,
    TrueKeyword = 112,
    TryKeyword = 113,
    TypeOfKeyword = 114,
    VarKeyword = 115,
    VoidKeyword = 116,
    WhileKeyword = 117,
    WithKeyword = 118,
    ImplementsKeyword = 119,
    InterfaceKeyword = 120,
    LetKeyword = 121,
    PackageKeyword = 122,
    PrivateKeyword = 123,
    ProtectedKeyword = 124,
    PublicKeyword = 125,
    StaticKeyword = 126,
    YieldKeyword = 127,
    AbstractKeyword = 128,
    AccessorKeyword = 129,
    AsKeyword = 130,
    AssertsKeyword = 131,
    AssertKeyword = 132,
    AnyKeyword = 133,
    AsyncKeyword = 134,
    AwaitKeyword = 135,
    BooleanKeyword = 136,
    ConstructorKeyword = 137,
    DeclareKeyword = 138,
    GetKeyword = 139,
    InferKeyword = 140,
    IntrinsicKeyword = 141,
    IsKeyword = 142,
    KeyOfKeyword = 143,
    ModuleKeyword = 144,
    NamespaceKeyword = 145,
    NeverKeyword = 146,
    OutKeyword = 147,
    ReadonlyKeyword = 148,
    RequireKeyword = 149,
    NumberKeyword = 150,
    ObjectKeyword = 151,
    SatisfiesKeyword = 152,
    SetKeyword = 153,
    StringKeyword = 154,
    SymbolKeyword = 155,
    TypeKeyword = 156,
    UndefinedKeyword = 157,
    UniqueKeyword = 158,
    UnknownKeyword = 159,
    UsingKeyword = 160,
    FromKeyword = 161,
    GlobalKeyword = 162,
    BigIntKeyword = 163,
    OverrideKeyword = 164,
    OfKeyword = 165,
    DeferKeyword = 166,
    QualifiedName = 167,
    ComputedPropertyName = 168,
    TypeParameter = 169,
    Parameter = 170,
    Decorator = 171,
    PropertySignature = 172,
    PropertyDeclaration = 173,
    MethodSignature = 174,
    MethodDeclaration = 175,
    ClassStaticBlockDeclaration = 176,
    Constructor = 177,
    GetAccessor = 178,
    SetAccessor = 179,
    CallSignature = 180,
    ConstructSignature = 181,
    IndexSignature = 182,
    TypePredicate = 183,
    TypeReference = 184,
    FunctionType = 185,
    ConstructorType = 186,
    TypeQuery = 187,
    TypeLiteral = 188,
    ArrayType = 189,
    TupleType = 190,
    OptionalType = 191,
    RestType = 192,
    UnionType = 193,
    IntersectionType = 194,
    ConditionalType = 195,
    InferType = 196,
    ParenthesizedType = 197,
    ThisType = 198,
    TypeOperator = 199,
    IndexedAccessType = 200,
    MappedType = 201,
    LiteralType = 202,
    NamedTupleMember = 203,
    TemplateLiteralType = 204,
    TemplateLiteralTypeSpan = 205,
    ImportType = 206,
    ObjectBindingPattern = 207,
    ArrayBindingPattern = 208,
    BindingElement = 209,
    ArrayLiteralExpression = 210,
    ObjectLiteralExpression = 211,
    PropertyAccessExpression = 212,
    ElementAccessExpression = 213,
    CallExpression = 214,
    NewExpression = 215,
    TaggedTemplateExpression = 216,
    TypeAssertionExpression = 217,
    ParenthesizedExpression = 218,
    FunctionExpression = 219,
    ArrowFunction = 220,
    DeleteExpression = 221,
    TypeOfExpression = 222,
    VoidExpression = 223,
    AwaitExpression = 224,
    PrefixUnaryExpression = 225,
    PostfixUnaryExpression = 226,
    BinaryExpression = 227,
    ConditionalExpression = 228,
    TemplateExpression = 229,
    YieldExpression = 230,
    SpreadElement = 231,
    ClassExpression = 232,
    OmittedExpression = 233,
    ExpressionWithTypeArguments = 234,
    AsExpression = 235,
    NonNullExpression = 236,
    MetaProperty = 237,
    SyntheticExpression = 238,
    SatisfiesExpression = 239,
    TemplateSpan = 240,
    SemicolonClassElement = 241,
    Block = 242,
    EmptyStatement = 243,
    VariableStatement = 244,
    ExpressionStatement = 245,
    IfStatement = 246,
    DoStatement = 247,
    WhileStatement = 248,
    ForStatement = 249,
    ForInStatement = 250,
    ForOfStatement = 251,
    ContinueStatement = 252,
    BreakStatement = 253,
    ReturnStatement = 254,
    WithStatement = 255,
    SwitchStatement = 256,
    LabeledStatement = 257,
    ThrowStatement = 258,
    TryStatement = 259,
    DebuggerStatement = 260,
    VariableDeclaration = 261,
    VariableDeclarationList = 262,
    FunctionDeclaration = 263,
    ClassDeclaration = 264,
    InterfaceDeclaration = 265,
    TypeAliasDeclaration = 266,
    EnumDeclaration = 267,
    ModuleDeclaration = 268,
    ModuleBlock = 269,
    CaseBlock = 270,
    NamespaceExportDeclaration = 271,
    ImportEqualsDeclaration = 272,
    ImportDeclaration = 273,
    ImportClause = 274,
    NamespaceImport = 275,
    NamedImports = 276,
    ImportSpecifier = 277,
    ExportAssignment = 278,
    ExportDeclaration = 279,
    NamedExports = 280,
    NamespaceExport = 281,
    ExportSpecifier = 282,
    MissingDeclaration = 283,
    ExternalModuleReference = 284,
    JsxElement = 285,
    JsxSelfClosingElement = 286,
    JsxOpeningElement = 287,
    JsxClosingElement = 288,
    JsxFragment = 289,
    JsxOpeningFragment = 290,
    JsxClosingFragment = 291,
    JsxAttribute = 292,
    JsxAttributes = 293,
    JsxSpreadAttribute = 294,
    JsxExpression = 295,
    JsxNamespacedName = 296,
    CaseClause = 297,
    DefaultClause = 298,
    HeritageClause = 299,
    CatchClause = 300,
    ImportAttributes = 301,
    ImportAttribute = 302,
    AssertClause = 301,
    AssertEntry = 302,
    ImportTypeAssertionContainer = 303,
    PropertyAssignment = 304,
    ShorthandPropertyAssignment = 305,
    SpreadAssignment = 306,
    EnumMember = 307,
    SourceFile = 308,
    Bundle = 309,
    JSDocTypeExpression = 310,
    JSDocNameReference = 311,
    JSDocMemberName = 312,
    JSDocAllType = 313,
    JSDocUnknownType = 314,
    JSDocNullableType = 315,
    JSDocNonNullableType = 316,
    JSDocOptionalType = 317,
    JSDocFunctionType = 318,
    JSDocVariadicType = 319,
    JSDocNamepathType = 320,
    JSDoc = 321,
    JSDocComment = 321,
    JSDocText = 322,
    JSDocTypeLiteral = 323,
    JSDocSignature = 324,
    JSDocLink = 325,
    JSDocLinkCode = 326,
    JSDocLinkPlain = 327,
    JSDocTag = 328,
    JSDocAugmentsTag = 329,
    JSDocImplementsTag = 330,
    JSDocAuthorTag = 331,
    JSDocDeprecatedTag = 332,
    JSDocClassTag = 333,
    JSDocPublicTag = 334,
    JSDocPrivateTag = 335,
    JSDocProtectedTag = 336,
    JSDocReadonlyTag = 337,
    JSDocOverrideTag = 338,
    JSDocCallbackTag = 339,
    JSDocOverloadTag = 340,
    JSDocEnumTag = 341,
    JSDocParameterTag = 342,
    JSDocReturnTag = 343,
    JSDocThisTag = 344,
    JSDocTypeTag = 345,
    JSDocTemplateTag = 346,
    JSDocTypedefTag = 347,
    JSDocSeeTag = 348,
    JSDocPropertyTag = 349,
    JSDocThrowsTag = 350,
    JSDocSatisfiesTag = 351,
    JSDocImportTag = 352,
    SyntaxList = 353,
    NotEmittedStatement = 354,
    NotEmittedTypeElement = 355,
    PartiallyEmittedExpression = 356,
    CommaListExpression = 357,
    SyntheticReferenceExpression = 358,
    Count = 359,
    FirstAssignment = 64,
    LastAssignment = 79,
    FirstCompoundAssignment = 65,
    LastCompoundAssignment = 79,
    FirstReservedWord = 83,
    LastReservedWord = 118,
    FirstKeyword = 83,
    LastKeyword = 166,
    FirstFutureReservedWord = 119,
    LastFutureReservedWord = 127,
    FirstTypeNode = 183,
    LastTypeNode = 206,
    FirstPunctuation = 19,
    LastPunctuation = 79,
    FirstToken = 0,
    LastToken = 166,
    FirstTriviaToken = 2,
    LastTriviaToken = 7,
    FirstLiteralToken = 9,
    LastLiteralToken = 15,
    FirstTemplateToken = 15,
    LastTemplateToken = 18,
    FirstBinaryOperator = 30,
    LastBinaryOperator = 79,
    FirstStatement = 244,
    LastStatement = 260,
    FirstNode = 167,
    FirstJSDocNode = 310,
    LastJSDocNode = 352,
    FirstJSDocTagNode = 328,
    LastJSDocTagNode = 352
}
export enum NodeFlags {
    None = 0,
    Let = 1,
    Const = 2,
    Using = 4,
    AwaitUsing = 6,
    NestedNamespace = 8,
    Synthesized = 16,
    Namespace = 32,
    OptionalChain = 64,
    ExportContext = 128,
    ContainsThis = 256,
    HasImplicitReturn = 512,
    HasExplicitReturn = 1024,
    GlobalAugmentation = 2048,
    HasAsyncFunctions = 4096,
    DisallowInContext = 8192,
    YieldContext = 16384,
    DecoratorContext = 32768,
    AwaitContext = 65536,
    DisallowConditionalTypesContext = 131072,
    ThisNodeHasError = 262144,
    JavaScriptFile = 524288,
    ThisNodeOrAnySubNodesHasError = 1048576,
    HasAggregatedChildData = 2097152,
    JSDoc = 16777216,
    JsonFile = 134217728,
    BlockScoped = 7,
    Constant = 6,
    ReachabilityCheckFlags = 1536,
    ReachabilityAndEmitFlags = 5632,
    ContextFlags = 101441536,
    TypeExcludesFlags = 81920
}
export interface NodeArray<T extends Node> extends ReadonlyArray<T>, ReadonlyTextRange {
    readonly hasTrailingComma: boolean;
}
export interface FileReference extends TextRange {
    fileName: string;
    resolutionMode?: ResolutionMode;
    preserve?: boolean;
}
export enum ScriptKind {
    Unknown = 0,
    JS = 1,
    JSX = 2,
    TS = 3,
    TSX = 4,
    External = 5,
    JSON = 6,
    Deferred = 7
}
export enum ScriptTarget {
    ES3 = 0,
    ES5 = 1,
    ES2015 = 2,
    ES2016 = 3,
    ES2017 = 4,
    ES2018 = 5,
    ES2019 = 6,
    ES2020 = 7,
    ES2021 = 8,
    ES2022 = 9,
    ES2023 = 10,
    ES2024 = 11,
    ES2025 = 12,
    ESNext = 99,
    JSON = 100,
    Latest = 99,
    LatestStandard = 12
}
export declare function isWhiteSpaceLike(ch: number): boolean;
export declare function isWhiteSpaceSingleLine(ch: number): boolean;
export declare function forEachLeadingCommentRange(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean) => U): U | undefined;
export declare function forEachLeadingCommentRange(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state: T): U | undefined;
export declare function getLeadingCommentRanges(text: string, pos: number): CommentRange[] | undefined;
export declare function createScanner(languageVersion: ScriptTarget, skipTrivia: boolean, languageVariant?: LanguageVariant, textInitial?: string, onError?: ErrorCallback, start?: number, length?: number): Scanner;
export declare function isParameterPropertyDeclaration(node: Node, parent: Node): node is ParameterPropertyDeclaration;
export declare function isEmptyBindingPattern(node: BindingName): node is BindingPattern;
export declare function getModifiers(node: HasModifiers): readonly Modifier[] | undefined;
export declare function getJSDocParameterTags(param: ParameterDeclaration): readonly JSDocParameterTag[];
export declare function getJSDocType(node: Node): TypeNode | undefined;
export declare function getJSDocTags(node: Node): readonly JSDocTag[];
export declare function getAllJSDocTagsOfKind(node: Node, kind: SyntaxKind): readonly JSDocTag[];
export declare function isMemberName(node: Node): node is MemberName;
export declare function isPropertyAccessChain(node: Node): node is PropertyAccessChain;
export declare function isElementAccessChain(node: Node): node is ElementAccessChain;
export declare function isCallChain(node: Node): node is CallChain;
export declare function isNonNullChain(node: Node): node is NonNullChain;
export declare function isBreakOrContinueStatement(node: Node): node is BreakOrContinueStatement;
export declare function isNamedExportBindings(node: Node): node is NamedExportBindings;
export declare function isJSDocPropertyLikeTag(node: Node): node is JSDocPropertyLikeTag;
export declare function isLiteralExpression(node: Node): node is LiteralExpression;
export declare function isTemplateLiteralToken(node: Node): node is TemplateLiteralToken;
export declare function isTypeOnlyImportDeclaration(node: Node): node is TypeOnlyImportDeclaration;
export declare function isTypeOnlyExportDeclaration(node: Node): node is TypeOnlyExportDeclaration;
export declare function isTypeOnlyImportOrExportDeclaration(node: Node): node is TypeOnlyAliasDeclaration;
export declare function isImportAttributeName(node: Node): node is ImportAttributeName;
export declare function isModifier(node: Node): node is Modifier;
export declare function isEntityName(node: Node): node is EntityName;
export declare function isPropertyName(node: Node): node is PropertyName;
export declare function isBindingName(node: Node): node is BindingName;
export declare function isFunctionLike(node: Node | undefined): node is SignatureDeclaration;
export declare function isClassElement(node: Node): node is ClassElement;
export declare function isClassLike(node: Node): node is ClassLikeDeclaration;
export declare function isAccessor(node: Node): node is AccessorDeclaration;
export declare function isAutoAccessorPropertyDeclaration(node: Node): node is AutoAccessorPropertyDeclaration;
export declare function isModifierLike(node: Node): node is ModifierLike;
export declare function isTypeElement(node: Node): node is TypeElement;
export declare function isObjectLiteralElementLike(node: Node): node is ObjectLiteralElementLike;
export declare function isTypeNode(node: Node): node is TypeNode;
export declare function isArrayBindingElement(node: Node): node is ArrayBindingElement;
export declare function isCallLikeExpression(node: Node): node is CallLikeExpression;
export declare function isTemplateLiteral(node: Node): node is TemplateLiteral;
export declare function isLeftHandSideExpression(node: Node): node is LeftHandSideExpression;
export declare function isExpression(node: Node): node is Expression;
export declare function isAssertionExpression(node: Node): node is AssertionExpression;
export declare function isIterationStatement(node: Node, lookInLabeledStatements: false): node is IterationStatement;
export declare function isConciseBody(node: Node): node is ConciseBody;
export declare function isForInitializer(node: Node): node is ForInitializer;
export declare function isModuleBody(node: Node): node is ModuleBody;
export declare function isNamedImportBindings(node: Node): node is NamedImportBindings;
export declare function isDeclarationStatement(node: Node): node is DeclarationStatement;
export declare function isStatement(node: Node): node is Statement;
export declare function isModuleReference(node: Node): node is ModuleReference;
export declare function isJsxTagNameExpression(node: Node): node is JsxTagNameExpression;
export declare function isJsxChild(node: Node): node is JsxChild;
export declare function isJsxAttributeLike(node: Node): node is JsxAttributeLike;
export declare function isJsxOpeningLikeElement(node: Node): node is JsxOpeningLikeElement;
export declare function isJsxCallLike(node: Node): node is JsxCallLike;
export declare function isCaseOrDefaultClause(node: Node): node is CaseOrDefaultClause;
export declare function isSetAccessor(node: Node): node is SetAccessorDeclaration;
export declare function isGetAccessor(node: Node): node is GetAccessorDeclaration;
export declare function hasOnlyExpressionInitializer(node: Node): node is HasExpressionInitializer;
export declare function isObjectLiteralElement(node: Node): node is ObjectLiteralElement;
export declare function isStringLiteralLike(node: Node | FileReference): node is StringLiteralLike;
export declare function isNumericLiteral(node: Node): node is NumericLiteral;
export declare function isBigIntLiteral(node: Node): node is BigIntLiteral;
export declare function isStringLiteral(node: Node): node is StringLiteral;
export declare function isJsxText(node: Node): node is JsxText;
export declare function isRegularExpressionLiteral(node: Node): node is RegularExpressionLiteral;
export declare function isNoSubstitutionTemplateLiteral(node: Node): node is NoSubstitutionTemplateLiteral;
export declare function isTemplateHead(node: Node): node is TemplateHead;
export declare function isTemplateMiddle(node: Node): node is TemplateMiddle;
export declare function isTemplateTail(node: Node): node is TemplateTail;
export declare function isDotDotDotToken(node: Node): node is DotDotDotToken;
export declare function isPlusToken(node: Node): node is PlusToken;
export declare function isMinusToken(node: Node): node is MinusToken;
export declare function isAsteriskToken(node: Node): node is AsteriskToken;
export declare function isExclamationToken(node: Node): node is ExclamationToken;
export declare function isQuestionToken(node: Node): node is QuestionToken;
export declare function isColonToken(node: Node): node is ColonToken;
export declare function isQuestionDotToken(node: Node): node is QuestionDotToken;
export declare function isEqualsGreaterThanToken(node: Node): node is EqualsGreaterThanToken;
export declare function isIdentifier(node: Node): node is Identifier;
export declare function isPrivateIdentifier(node: Node): node is PrivateIdentifier;
export declare function isAssertsKeyword(node: Node): node is AssertsKeyword;
export declare function isAwaitKeyword(node: Node): node is AwaitKeyword;
export declare function isQualifiedName(node: Node): node is QualifiedName;
export declare function isComputedPropertyName(node: Node): node is ComputedPropertyName;
export declare function isTypeParameterDeclaration(node: Node): node is TypeParameterDeclaration;
export declare function isParameter(node: Node): node is ParameterDeclaration;
export declare function isDecorator(node: Node): node is Decorator;
export declare function isPropertySignature(node: Node): node is PropertySignature;
export declare function isPropertyDeclaration(node: Node): node is PropertyDeclaration;
export declare function isMethodSignature(node: Node): node is MethodSignature;
export declare function isMethodDeclaration(node: Node): node is MethodDeclaration;
export declare function isClassStaticBlockDeclaration(node: Node): node is ClassStaticBlockDeclaration;
export declare function isConstructorDeclaration(node: Node): node is ConstructorDeclaration;
export declare function isGetAccessorDeclaration(node: Node): node is GetAccessorDeclaration;
export declare function isSetAccessorDeclaration(node: Node): node is SetAccessorDeclaration;
export declare function isCallSignatureDeclaration(node: Node): node is CallSignatureDeclaration;
export declare function isConstructSignatureDeclaration(node: Node): node is ConstructSignatureDeclaration;
export declare function isIndexSignatureDeclaration(node: Node): node is IndexSignatureDeclaration;
export declare function isTypePredicateNode(node: Node): node is TypePredicateNode;
export declare function isTypeReferenceNode(node: Node): node is TypeReferenceNode;
export declare function isFunctionTypeNode(node: Node): node is FunctionTypeNode;
export declare function isConstructorTypeNode(node: Node): node is ConstructorTypeNode;
export declare function isTypeQueryNode(node: Node): node is TypeQueryNode;
export declare function isTypeLiteralNode(node: Node): node is TypeLiteralNode;
export declare function isArrayTypeNode(node: Node): node is ArrayTypeNode;
export declare function isTupleTypeNode(node: Node): node is TupleTypeNode;
export declare function isNamedTupleMember(node: Node): node is NamedTupleMember;
export declare function isOptionalTypeNode(node: Node): node is OptionalTypeNode;
export declare function isRestTypeNode(node: Node): node is RestTypeNode;
export declare function isUnionTypeNode(node: Node): node is UnionTypeNode;
export declare function isIntersectionTypeNode(node: Node): node is IntersectionTypeNode;
export declare function isConditionalTypeNode(node: Node): node is ConditionalTypeNode;
export declare function isInferTypeNode(node: Node): node is InferTypeNode;
export declare function isParenthesizedTypeNode(node: Node): node is ParenthesizedTypeNode;
export declare function isThisTypeNode(node: Node): node is ThisTypeNode;
export declare function isTypeOperatorNode(node: Node): node is TypeOperatorNode;
export declare function isIndexedAccessTypeNode(node: Node): node is IndexedAccessTypeNode;
export declare function isMappedTypeNode(node: Node): node is MappedTypeNode;
export declare function isLiteralTypeNode(node: Node): node is LiteralTypeNode;
export declare function isImportTypeNode(node: Node): node is ImportTypeNode;
export declare function isTemplateLiteralTypeSpan(node: Node): node is TemplateLiteralTypeSpan;
export declare function isTemplateLiteralTypeNode(node: Node): node is TemplateLiteralTypeNode;
export declare function isObjectBindingPattern(node: Node): node is ObjectBindingPattern;
export declare function isArrayBindingPattern(node: Node): node is ArrayBindingPattern;
export declare function isBindingElement(node: Node): node is BindingElement;
export declare function isArrayLiteralExpression(node: Node): node is ArrayLiteralExpression;
export declare function isObjectLiteralExpression(node: Node): node is ObjectLiteralExpression;
export declare function isPropertyAccessExpression(node: Node): node is PropertyAccessExpression;
export declare function isElementAccessExpression(node: Node): node is ElementAccessExpression;
export declare function isCallExpression(node: Node): node is CallExpression;
export declare function isNewExpression(node: Node): node is NewExpression;
export declare function isTaggedTemplateExpression(node: Node): node is TaggedTemplateExpression;
export declare function isTypeAssertionExpression(node: Node): node is TypeAssertion;
export declare function isParenthesizedExpression(node: Node): node is ParenthesizedExpression;
export declare function isFunctionExpression(node: Node): node is FunctionExpression;
export declare function isArrowFunction(node: Node): node is ArrowFunction;
export declare function isDeleteExpression(node: Node): node is DeleteExpression;
export declare function isTypeOfExpression(node: Node): node is TypeOfExpression;
export declare function isVoidExpression(node: Node): node is VoidExpression;
export declare function isAwaitExpression(node: Node): node is AwaitExpression;
export declare function isPrefixUnaryExpression(node: Node): node is PrefixUnaryExpression;
export declare function isPostfixUnaryExpression(node: Node): node is PostfixUnaryExpression;
export declare function isBinaryExpression(node: Node): node is BinaryExpression;
export declare function isConditionalExpression(node: Node): node is ConditionalExpression;
export declare function isTemplateExpression(node: Node): node is TemplateExpression;
export declare function isYieldExpression(node: Node): node is YieldExpression;
export declare function isSpreadElement(node: Node): node is SpreadElement;
export declare function isClassExpression(node: Node): node is ClassExpression;
export declare function isOmittedExpression(node: Node): node is OmittedExpression;
export declare function isExpressionWithTypeArguments(node: Node): node is ExpressionWithTypeArguments;
export declare function isAsExpression(node: Node): node is AsExpression;
export declare function isSatisfiesExpression(node: Node): node is SatisfiesExpression;
export declare function isNonNullExpression(node: Node): node is NonNullExpression;
export declare function isMetaProperty(node: Node): node is MetaProperty;
export declare function isSyntheticExpression(node: Node): node is SyntheticExpression;
export declare function isPartiallyEmittedExpression(node: Node): node is PartiallyEmittedExpression;
export declare function isCommaListExpression(node: Node): node is CommaListExpression;
export declare function isTemplateSpan(node: Node): node is TemplateSpan;
export declare function isSemicolonClassElement(node: Node): node is SemicolonClassElement;
export declare function isBlock(node: Node): node is Block;
export declare function isVariableStatement(node: Node): node is VariableStatement;
export declare function isEmptyStatement(node: Node): node is EmptyStatement;
export declare function isExpressionStatement(node: Node): node is ExpressionStatement;
export declare function isIfStatement(node: Node): node is IfStatement;
export declare function isDoStatement(node: Node): node is DoStatement;
export declare function isWhileStatement(node: Node): node is WhileStatement;
export declare function isForStatement(node: Node): node is ForStatement;
export declare function isForInStatement(node: Node): node is ForInStatement;
export declare function isForOfStatement(node: Node): node is ForOfStatement;
export declare function isContinueStatement(node: Node): node is ContinueStatement;
export declare function isBreakStatement(node: Node): node is BreakStatement;
export declare function isReturnStatement(node: Node): node is ReturnStatement;
export declare function isWithStatement(node: Node): node is WithStatement;
export declare function isSwitchStatement(node: Node): node is SwitchStatement;
export declare function isLabeledStatement(node: Node): node is LabeledStatement;
export declare function isThrowStatement(node: Node): node is ThrowStatement;
export declare function isTryStatement(node: Node): node is TryStatement;
export declare function isDebuggerStatement(node: Node): node is DebuggerStatement;
export declare function isVariableDeclaration(node: Node): node is VariableDeclaration;
export declare function isVariableDeclarationList(node: Node): node is VariableDeclarationList;
export declare function isFunctionDeclaration(node: Node): node is FunctionDeclaration;
export declare function isClassDeclaration(node: Node): node is ClassDeclaration;
export declare function isInterfaceDeclaration(node: Node): node is InterfaceDeclaration;
export declare function isTypeAliasDeclaration(node: Node): node is TypeAliasDeclaration;
export declare function isEnumDeclaration(node: Node): node is EnumDeclaration;
export declare function isModuleDeclaration(node: Node): node is ModuleDeclaration;
export declare function isModuleBlock(node: Node): node is ModuleBlock;
export declare function isCaseBlock(node: Node): node is CaseBlock;
export declare function isNamespaceExportDeclaration(node: Node): node is NamespaceExportDeclaration;
export declare function isImportEqualsDeclaration(node: Node): node is ImportEqualsDeclaration;
export declare function isImportDeclaration(node: Node): node is ImportDeclaration;
export declare function isImportClause(node: Node): node is ImportClause;
export declare function isImportTypeAssertionContainer(node: Node): node is ImportTypeAssertionContainer;
export declare function isAssertClause(node: Node): node is AssertClause;
export declare function isAssertEntry(node: Node): node is AssertEntry;
export declare function isImportAttributes(node: Node): node is ImportAttributes;
export declare function isImportAttribute(node: Node): node is ImportAttribute;
export declare function isNamespaceImport(node: Node): node is NamespaceImport;
export declare function isNamespaceExport(node: Node): node is NamespaceExport;
export declare function isNamedImports(node: Node): node is NamedImports;
export declare function isImportSpecifier(node: Node): node is ImportSpecifier;
export declare function isExportAssignment(node: Node): node is ExportAssignment;
export declare function isExportDeclaration(node: Node): node is ExportDeclaration;
export declare function isNamedExports(node: Node): node is NamedExports;
export declare function isExportSpecifier(node: Node): node is ExportSpecifier;
export declare function isModuleExportName(node: Node): node is ModuleExportName;
export declare function isMissingDeclaration(node: Node): node is MissingDeclaration;
export declare function isNotEmittedStatement(node: Node): node is NotEmittedStatement;
export declare function isExternalModuleReference(node: Node): node is ExternalModuleReference;
export declare function isJsxElement(node: Node): node is JsxElement;
export declare function isJsxSelfClosingElement(node: Node): node is JsxSelfClosingElement;
export declare function isJsxOpeningElement(node: Node): node is JsxOpeningElement;
export declare function isJsxClosingElement(node: Node): node is JsxClosingElement;
export declare function isJsxFragment(node: Node): node is JsxFragment;
export declare function isJsxOpeningFragment(node: Node): node is JsxOpeningFragment;
export declare function isJsxClosingFragment(node: Node): node is JsxClosingFragment;
export declare function isJsxAttribute(node: Node): node is JsxAttribute;
export declare function isJsxAttributes(node: Node): node is JsxAttributes;
export declare function isJsxSpreadAttribute(node: Node): node is JsxSpreadAttribute;
export declare function isJsxExpression(node: Node): node is JsxExpression;
export declare function isJsxNamespacedName(node: Node): node is JsxNamespacedName;
export declare function isCaseClause(node: Node): node is CaseClause;
export declare function isDefaultClause(node: Node): node is DefaultClause;
export declare function isHeritageClause(node: Node): node is HeritageClause;
export declare function isCatchClause(node: Node): node is CatchClause;
export declare function isPropertyAssignment(node: Node): node is PropertyAssignment;
export declare function isShorthandPropertyAssignment(node: Node): node is ShorthandPropertyAssignment;
export declare function isSpreadAssignment(node: Node): node is SpreadAssignment;
export declare function isEnumMember(node: Node): node is EnumMember;
export declare function isSourceFile(node: Node): node is SourceFile;
export declare function isBundle(node: Node): node is Bundle;
export declare function isJSDocTypeExpression(node: Node): node is JSDocTypeExpression;
export declare function isJSDocNameReference(node: Node): node is JSDocNameReference;
export declare function isJSDocMemberName(node: Node): node is JSDocMemberName;
export declare function isJSDocLink(node: Node): node is JSDocLink;
export declare function isJSDocLinkCode(node: Node): node is JSDocLinkCode;
export declare function isJSDocLinkPlain(node: Node): node is JSDocLinkPlain;
export declare function isJSDocAllType(node: Node): node is JSDocAllType;
export declare function isJSDocUnknownType(node: Node): node is JSDocUnknownType;
export declare function isJSDocNullableType(node: Node): node is JSDocNullableType;
export declare function isJSDocNonNullableType(node: Node): node is JSDocNonNullableType;
export declare function isJSDocOptionalType(node: Node): node is JSDocOptionalType;
export declare function isJSDocFunctionType(node: Node): node is JSDocFunctionType;
export declare function isJSDocVariadicType(node: Node): node is JSDocVariadicType;
export declare function isJSDocNamepathType(node: Node): node is JSDocNamepathType;
export declare function isJSDoc(node: Node): node is JSDoc;
export declare function isJSDocTypeLiteral(node: Node): node is JSDocTypeLiteral;
export declare function isJSDocSignature(node: Node): node is JSDocSignature;
export declare function isJSDocAugmentsTag(node: Node): node is JSDocAugmentsTag;
export declare function isJSDocAuthorTag(node: Node): node is JSDocAuthorTag;
export declare function isJSDocClassTag(node: Node): node is JSDocClassTag;
export declare function isJSDocCallbackTag(node: Node): node is JSDocCallbackTag;
export declare function isJSDocPublicTag(node: Node): node is JSDocPublicTag;
export declare function isJSDocPrivateTag(node: Node): node is JSDocPrivateTag;
export declare function isJSDocProtectedTag(node: Node): node is JSDocProtectedTag;
export declare function isJSDocReadonlyTag(node: Node): node is JSDocReadonlyTag;
export declare function isJSDocOverrideTag(node: Node): node is JSDocOverrideTag;
export declare function isJSDocOverloadTag(node: Node): node is JSDocOverloadTag;
export declare function isJSDocDeprecatedTag(node: Node): node is JSDocDeprecatedTag;
export declare function isJSDocSeeTag(node: Node): node is JSDocSeeTag;
export declare function isJSDocEnumTag(node: Node): node is JSDocEnumTag;
export declare function isJSDocParameterTag(node: Node): node is JSDocParameterTag;
export declare function isJSDocReturnTag(node: Node): node is JSDocReturnTag;
export declare function isJSDocThisTag(node: Node): node is JSDocThisTag;
export declare function isJSDocTypeTag(node: Node): node is JSDocTypeTag;
export declare function isJSDocTemplateTag(node: Node): node is JSDocTemplateTag;
export declare function isJSDocTypedefTag(node: Node): node is JSDocTypedefTag;
export declare function isJSDocUnknownTag(node: Node): node is JSDocUnknownTag;
export declare function isJSDocPropertyTag(node: Node): node is JSDocPropertyTag;
export declare function isJSDocImplementsTag(node: Node): node is JSDocImplementsTag;
export declare function isJSDocSatisfiesTag(node: Node): node is JSDocSatisfiesTag;
export declare function isJSDocThrowsTag(node: Node): node is JSDocThrowsTag;
export declare function isJSDocImportTag(node: Node): node is JSDocImportTag;
export declare function isModuleName(node: Node): node is ModuleName;
export declare function isBinaryOperatorToken(node: Node): node is BinaryOperatorToken;
export declare function canHaveModifiers(node: Node): node is HasModifiers;
export declare function canHaveDecorators(node: Node): node is HasDecorators;
export declare function forEachChild(node: Node, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined;
export declare function createSourceFile(fileName: string, sourceText: string, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, setParentNodes?: boolean, scriptKind?: ScriptKind): SourceFile;
export type Node = ts.Node | tsAst.Node;
export type ParameterPropertyDeclaration = ts.ParameterPropertyDeclaration | tsAst.ParameterPropertyDeclaration;
export type BindingPattern = ts.BindingPattern | tsAst.BindingPattern;
export type MemberName = ts.MemberName | tsAst.MemberName;
export type PropertyAccessChain = ts.PropertyAccessChain | tsAst.PropertyAccessChain;
export type ElementAccessChain = ts.ElementAccessChain | tsAst.ElementAccessChain;
export type CallChain = ts.CallChain | tsAst.CallChain;
export type NonNullChain = ts.NonNullChain | tsAst.NonNullChain;
export type BreakOrContinueStatement = ts.BreakOrContinueStatement | tsAst.BreakOrContinueStatement;
export type NamedExportBindings = ts.NamedExportBindings | tsAst.NamedExportBindings;
export type JSDocPropertyLikeTag = ts.JSDocPropertyLikeTag | tsAst.JSDocPropertyLikeTag;
export type LiteralExpression = ts.LiteralExpression | tsAst.LiteralExpression;
export type TemplateLiteralToken = ts.TemplateLiteralToken | tsAst.TemplateLiteralToken;
export type TypeOnlyImportDeclaration = ts.TypeOnlyImportDeclaration | tsAst.TypeOnlyImportDeclaration;
export type TypeOnlyExportDeclaration = ts.TypeOnlyExportDeclaration | tsAst.TypeOnlyExportDeclaration;
export type TypeOnlyAliasDeclaration = ts.TypeOnlyAliasDeclaration | tsAst.TypeOnlyAliasDeclaration;
export type ImportAttributeName = ts.ImportAttributeName | tsAst.ImportAttributeName;
export type Modifier = ts.Modifier | tsAst.Modifier;
export type EntityName = ts.EntityName | tsAst.EntityName;
export type PropertyName = ts.PropertyName | tsAst.PropertyName;
export type BindingName = ts.BindingName | tsAst.BindingName;
export type SignatureDeclaration = ts.SignatureDeclaration | tsAst.SignatureDeclaration;
export type ClassElement = ts.ClassElement | tsAst.ClassElement;
export type ClassLikeDeclaration = ts.ClassLikeDeclaration | tsAst.ClassLikeDeclaration;
export type AccessorDeclaration = ts.AccessorDeclaration | tsAst.AccessorDeclaration;
export type AutoAccessorPropertyDeclaration = ts.AutoAccessorPropertyDeclaration | tsAst.AutoAccessorPropertyDeclaration;
export type ModifierLike = ts.ModifierLike | tsAst.ModifierLike;
export type TypeElement = ts.TypeElement | tsAst.TypeElement;
export type ObjectLiteralElementLike = ts.ObjectLiteralElementLike | tsAst.ObjectLiteralElementLike;
export type TypeNode = ts.TypeNode | tsAst.TypeNode;
export type ArrayBindingElement = ts.ArrayBindingElement | tsAst.ArrayBindingElement;
export type CallLikeExpression = ts.CallLikeExpression | tsAst.CallLikeExpression;
export type TemplateLiteral = ts.TemplateLiteral | tsAst.TemplateLiteral;
export type LeftHandSideExpression = ts.LeftHandSideExpression | tsAst.LeftHandSideExpression;
export type Expression = ts.Expression | tsAst.Expression;
export type AssertionExpression = ts.AssertionExpression | tsAst.AssertionExpression;
export type IterationStatement = ts.IterationStatement | tsAst.IterationStatement;
export type ConciseBody = ts.ConciseBody | tsAst.ConciseBody;
export type ForInitializer = ts.ForInitializer | tsAst.ForInitializer;
export type ModuleBody = ts.ModuleBody | tsAst.ModuleBody;
export type NamedImportBindings = ts.NamedImportBindings | tsAst.NamedImportBindings;
export type DeclarationStatement = ts.DeclarationStatement | tsAst.DeclarationStatement;
export type Statement = ts.Statement | tsAst.Statement;
export type ModuleReference = ts.ModuleReference | tsAst.ModuleReference;
export type JsxTagNameExpression = ts.JsxTagNameExpression | tsAst.JsxTagNameExpression;
export type JsxChild = ts.JsxChild | tsAst.JsxChild;
export type JsxAttributeLike = ts.JsxAttributeLike | tsAst.JsxAttributeLike;
export type JsxOpeningLikeElement = ts.JsxOpeningLikeElement | tsAst.JsxOpeningLikeElement;
export type JsxCallLike = ts.JsxCallLike | tsAst.JsxCallLike;
export type CaseOrDefaultClause = ts.CaseOrDefaultClause | tsAst.CaseOrDefaultClause;
export type SetAccessorDeclaration = ts.SetAccessorDeclaration | tsAst.SetAccessorDeclaration;
export type GetAccessorDeclaration = ts.GetAccessorDeclaration | tsAst.GetAccessorDeclaration;
export type HasExpressionInitializer = ts.HasExpressionInitializer | tsAst.HasExpressionInitializer;
export type ObjectLiteralElement = ts.ObjectLiteralElement | tsAst.ObjectLiteralElement;
export type StringLiteralLike = ts.StringLiteralLike | tsAst.StringLiteralLike;
export type NumericLiteral = ts.NumericLiteral | tsAst.NumericLiteral;
export type BigIntLiteral = ts.BigIntLiteral | tsAst.BigIntLiteral;
export type StringLiteral = ts.StringLiteral | tsAst.StringLiteral;
export type JsxText = ts.JsxText | tsAst.JsxText;
export type RegularExpressionLiteral = ts.RegularExpressionLiteral | tsAst.RegularExpressionLiteral;
export type NoSubstitutionTemplateLiteral = ts.NoSubstitutionTemplateLiteral | tsAst.NoSubstitutionTemplateLiteral;
export type TemplateHead = ts.TemplateHead | tsAst.TemplateHead;
export type TemplateMiddle = ts.TemplateMiddle | tsAst.TemplateMiddle;
export type TemplateTail = ts.TemplateTail | tsAst.TemplateTail;
export type DotDotDotToken = ts.DotDotDotToken | tsAst.DotDotDotToken;
export type PlusToken = ts.PlusToken | tsAst.PlusToken;
export type MinusToken = ts.MinusToken | tsAst.MinusToken;
export type AsteriskToken = ts.AsteriskToken | tsAst.AsteriskToken;
export type ExclamationToken = ts.ExclamationToken | tsAst.ExclamationToken;
export type QuestionToken = ts.QuestionToken | tsAst.QuestionToken;
export type ColonToken = ts.ColonToken | tsAst.ColonToken;
export type QuestionDotToken = ts.QuestionDotToken | tsAst.QuestionDotToken;
export type EqualsGreaterThanToken = ts.EqualsGreaterThanToken | tsAst.EqualsGreaterThanToken;
export type Identifier = ts.Identifier | tsAst.Identifier;
export type PrivateIdentifier = ts.PrivateIdentifier | tsAst.PrivateIdentifier;
export type AssertsKeyword = ts.AssertsKeyword | tsAst.AssertsKeyword;
export type AwaitKeyword = ts.AwaitKeyword | tsAst.AwaitKeyword;
export type QualifiedName = ts.QualifiedName | tsAst.QualifiedName;
export type ComputedPropertyName = ts.ComputedPropertyName | tsAst.ComputedPropertyName;
export type TypeParameterDeclaration = ts.TypeParameterDeclaration | tsAst.TypeParameterDeclaration;
export type ParameterDeclaration = ts.ParameterDeclaration | tsAst.ParameterDeclaration;
export type Decorator = ts.Decorator | tsAst.Decorator;
export type PropertySignature = ts.PropertySignature | tsAst.PropertySignature;
export type PropertyDeclaration = ts.PropertyDeclaration | tsAst.PropertyDeclaration;
export type MethodSignature = ts.MethodSignature | tsAst.MethodSignature;
export type MethodDeclaration = ts.MethodDeclaration | tsAst.MethodDeclaration;
export type ClassStaticBlockDeclaration = ts.ClassStaticBlockDeclaration | tsAst.ClassStaticBlockDeclaration;
export type ConstructorDeclaration = ts.ConstructorDeclaration | tsAst.ConstructorDeclaration;
export type CallSignatureDeclaration = ts.CallSignatureDeclaration | tsAst.CallSignatureDeclaration;
export type ConstructSignatureDeclaration = ts.ConstructSignatureDeclaration | tsAst.ConstructSignatureDeclaration;
export type IndexSignatureDeclaration = ts.IndexSignatureDeclaration | tsAst.IndexSignatureDeclaration;
export type TypePredicateNode = ts.TypePredicateNode | tsAst.TypePredicateNode;
export type TypeReferenceNode = ts.TypeReferenceNode | tsAst.TypeReferenceNode;
export type FunctionTypeNode = ts.FunctionTypeNode | tsAst.FunctionTypeNode;
export type ConstructorTypeNode = ts.ConstructorTypeNode | tsAst.ConstructorTypeNode;
export type TypeQueryNode = ts.TypeQueryNode | tsAst.TypeQueryNode;
export type TypeLiteralNode = ts.TypeLiteralNode | tsAst.TypeLiteralNode;
export type ArrayTypeNode = ts.ArrayTypeNode | tsAst.ArrayTypeNode;
export type TupleTypeNode = ts.TupleTypeNode | tsAst.TupleTypeNode;
export type NamedTupleMember = ts.NamedTupleMember | tsAst.NamedTupleMember;
export type OptionalTypeNode = ts.OptionalTypeNode | tsAst.OptionalTypeNode;
export type RestTypeNode = ts.RestTypeNode | tsAst.RestTypeNode;
export type UnionTypeNode = ts.UnionTypeNode | tsAst.UnionTypeNode;
export type IntersectionTypeNode = ts.IntersectionTypeNode | tsAst.IntersectionTypeNode;
export type ConditionalTypeNode = ts.ConditionalTypeNode | tsAst.ConditionalTypeNode;
export type InferTypeNode = ts.InferTypeNode | tsAst.InferTypeNode;
export type ParenthesizedTypeNode = ts.ParenthesizedTypeNode | tsAst.ParenthesizedTypeNode;
export type ThisTypeNode = ts.ThisTypeNode | tsAst.ThisTypeNode;
export type TypeOperatorNode = ts.TypeOperatorNode | tsAst.TypeOperatorNode;
export type IndexedAccessTypeNode = ts.IndexedAccessTypeNode | tsAst.IndexedAccessTypeNode;
export type MappedTypeNode = ts.MappedTypeNode | tsAst.MappedTypeNode;
export type LiteralTypeNode = ts.LiteralTypeNode | tsAst.LiteralTypeNode;
export type ImportTypeNode = ts.ImportTypeNode | tsAst.ImportTypeNode;
export type TemplateLiteralTypeSpan = ts.TemplateLiteralTypeSpan | tsAst.TemplateLiteralTypeSpan;
export type TemplateLiteralTypeNode = ts.TemplateLiteralTypeNode | tsAst.TemplateLiteralTypeNode;
export type ObjectBindingPattern = ts.ObjectBindingPattern | tsAst.ObjectBindingPattern;
export type ArrayBindingPattern = ts.ArrayBindingPattern | tsAst.ArrayBindingPattern;
export type BindingElement = ts.BindingElement | tsAst.BindingElement;
export type ArrayLiteralExpression = ts.ArrayLiteralExpression | tsAst.ArrayLiteralExpression;
export type ObjectLiteralExpression = ts.ObjectLiteralExpression | tsAst.ObjectLiteralExpression;
export type PropertyAccessExpression = ts.PropertyAccessExpression | tsAst.PropertyAccessExpression;
export type ElementAccessExpression = ts.ElementAccessExpression | tsAst.ElementAccessExpression;
export type CallExpression = ts.CallExpression | tsAst.CallExpression;
export type NewExpression = ts.NewExpression | tsAst.NewExpression;
export type TaggedTemplateExpression = ts.TaggedTemplateExpression | tsAst.TaggedTemplateExpression;
export type TypeAssertion = ts.TypeAssertion | tsAst.TypeAssertion;
export type ParenthesizedExpression = ts.ParenthesizedExpression | tsAst.ParenthesizedExpression;
export type FunctionExpression = ts.FunctionExpression | tsAst.FunctionExpression;
export type ArrowFunction = ts.ArrowFunction | tsAst.ArrowFunction;
export type DeleteExpression = ts.DeleteExpression | tsAst.DeleteExpression;
export type TypeOfExpression = ts.TypeOfExpression | tsAst.TypeOfExpression;
export type VoidExpression = ts.VoidExpression | tsAst.VoidExpression;
export type AwaitExpression = ts.AwaitExpression | tsAst.AwaitExpression;
export type PrefixUnaryExpression = ts.PrefixUnaryExpression | tsAst.PrefixUnaryExpression;
export type PostfixUnaryExpression = ts.PostfixUnaryExpression | tsAst.PostfixUnaryExpression;
export type BinaryExpression = ts.BinaryExpression | tsAst.BinaryExpression;
export type ConditionalExpression = ts.ConditionalExpression | tsAst.ConditionalExpression;
export type TemplateExpression = ts.TemplateExpression | tsAst.TemplateExpression;
export type YieldExpression = ts.YieldExpression | tsAst.YieldExpression;
export type SpreadElement = ts.SpreadElement | tsAst.SpreadElement;
export type ClassExpression = ts.ClassExpression | tsAst.ClassExpression;
export type OmittedExpression = ts.OmittedExpression | tsAst.OmittedExpression;
export type ExpressionWithTypeArguments = ts.ExpressionWithTypeArguments | tsAst.ExpressionWithTypeArguments;
export type AsExpression = ts.AsExpression | tsAst.AsExpression;
export type SatisfiesExpression = ts.SatisfiesExpression | tsAst.SatisfiesExpression;
export type NonNullExpression = ts.NonNullExpression | tsAst.NonNullExpression;
export type MetaProperty = ts.MetaProperty | tsAst.MetaProperty;
export type SyntheticExpression = ts.SyntheticExpression | tsAst.SyntheticExpression;
export type PartiallyEmittedExpression = ts.PartiallyEmittedExpression | tsAst.PartiallyEmittedExpression;
export type CommaListExpression = ts.CommaListExpression | tsAst.CommaListExpression;
export type TemplateSpan = ts.TemplateSpan | tsAst.TemplateSpan;
export type SemicolonClassElement = ts.SemicolonClassElement | tsAst.SemicolonClassElement;
export type Block = ts.Block | tsAst.Block;
export type VariableStatement = ts.VariableStatement | tsAst.VariableStatement;
export type EmptyStatement = ts.EmptyStatement | tsAst.EmptyStatement;
export type ExpressionStatement = ts.ExpressionStatement | tsAst.ExpressionStatement;
export type IfStatement = ts.IfStatement | tsAst.IfStatement;
export type DoStatement = ts.DoStatement | tsAst.DoStatement;
export type WhileStatement = ts.WhileStatement | tsAst.WhileStatement;
export type ForStatement = ts.ForStatement | tsAst.ForStatement;
export type ForInStatement = ts.ForInStatement | tsAst.ForInStatement;
export type ForOfStatement = ts.ForOfStatement | tsAst.ForOfStatement;
export type ContinueStatement = ts.ContinueStatement | tsAst.ContinueStatement;
export type BreakStatement = ts.BreakStatement | tsAst.BreakStatement;
export type ReturnStatement = ts.ReturnStatement | tsAst.ReturnStatement;
export type WithStatement = ts.WithStatement | tsAst.WithStatement;
export type SwitchStatement = ts.SwitchStatement | tsAst.SwitchStatement;
export type LabeledStatement = ts.LabeledStatement | tsAst.LabeledStatement;
export type ThrowStatement = ts.ThrowStatement | tsAst.ThrowStatement;
export type TryStatement = ts.TryStatement | tsAst.TryStatement;
export type DebuggerStatement = ts.DebuggerStatement | tsAst.DebuggerStatement;
export type VariableDeclaration = ts.VariableDeclaration | tsAst.VariableDeclaration;
export type VariableDeclarationList = ts.VariableDeclarationList | tsAst.VariableDeclarationList;
export type FunctionDeclaration = ts.FunctionDeclaration | tsAst.FunctionDeclaration;
export type ClassDeclaration = ts.ClassDeclaration | tsAst.ClassDeclaration;
export type InterfaceDeclaration = ts.InterfaceDeclaration | tsAst.InterfaceDeclaration;
export type TypeAliasDeclaration = ts.TypeAliasDeclaration | tsAst.TypeAliasDeclaration;
export type EnumDeclaration = ts.EnumDeclaration | tsAst.EnumDeclaration;
export type ModuleDeclaration = ts.ModuleDeclaration | tsAst.ModuleDeclaration;
export type ModuleBlock = ts.ModuleBlock | tsAst.ModuleBlock;
export type CaseBlock = ts.CaseBlock | tsAst.CaseBlock;
export type NamespaceExportDeclaration = ts.NamespaceExportDeclaration | tsAst.NamespaceExportDeclaration;
export type ImportEqualsDeclaration = ts.ImportEqualsDeclaration | tsAst.ImportEqualsDeclaration;
export type ImportDeclaration = ts.ImportDeclaration | tsAst.ImportDeclaration;
export type ImportClause = ts.ImportClause | tsAst.ImportClause;
export type ImportTypeAssertionContainer = ts.ImportTypeAssertionContainer | tsAst.ImportTypeAssertionContainer;
export type AssertClause = ts.AssertClause | tsAst.AssertClause;
export type AssertEntry = ts.AssertEntry | tsAst.AssertEntry;
export type ImportAttributes = ts.ImportAttributes | tsAst.ImportAttributes;
export type ImportAttribute = ts.ImportAttribute | tsAst.ImportAttribute;
export type NamespaceImport = ts.NamespaceImport | tsAst.NamespaceImport;
export type NamespaceExport = ts.NamespaceExport | tsAst.NamespaceExport;
export type NamedImports = ts.NamedImports | tsAst.NamedImports;
export type ImportSpecifier = ts.ImportSpecifier | tsAst.ImportSpecifier;
export type ExportAssignment = ts.ExportAssignment | tsAst.ExportAssignment;
export type ExportDeclaration = ts.ExportDeclaration | tsAst.ExportDeclaration;
export type NamedExports = ts.NamedExports | tsAst.NamedExports;
export type ExportSpecifier = ts.ExportSpecifier | tsAst.ExportSpecifier;
export type ModuleExportName = ts.ModuleExportName | tsAst.ModuleExportName;
export type MissingDeclaration = ts.MissingDeclaration | tsAst.MissingDeclaration;
export type NotEmittedStatement = ts.NotEmittedStatement | tsAst.NotEmittedStatement;
export type ExternalModuleReference = ts.ExternalModuleReference | tsAst.ExternalModuleReference;
export type JsxElement = ts.JsxElement | tsAst.JsxElement;
export type JsxSelfClosingElement = ts.JsxSelfClosingElement | tsAst.JsxSelfClosingElement;
export type JsxOpeningElement = ts.JsxOpeningElement | tsAst.JsxOpeningElement;
export type JsxClosingElement = ts.JsxClosingElement | tsAst.JsxClosingElement;
export type JsxFragment = ts.JsxFragment | tsAst.JsxFragment;
export type JsxOpeningFragment = ts.JsxOpeningFragment | tsAst.JsxOpeningFragment;
export type JsxClosingFragment = ts.JsxClosingFragment | tsAst.JsxClosingFragment;
export type JsxAttribute = ts.JsxAttribute | tsAst.JsxAttribute;
export type JsxAttributes = ts.JsxAttributes | tsAst.JsxAttributes;
export type JsxSpreadAttribute = ts.JsxSpreadAttribute | tsAst.JsxSpreadAttribute;
export type JsxExpression = ts.JsxExpression | tsAst.JsxExpression;
export type JsxNamespacedName = ts.JsxNamespacedName | tsAst.JsxNamespacedName;
export type CaseClause = ts.CaseClause | tsAst.CaseClause;
export type DefaultClause = ts.DefaultClause | tsAst.DefaultClause;
export type HeritageClause = ts.HeritageClause | tsAst.HeritageClause;
export type CatchClause = ts.CatchClause | tsAst.CatchClause;
export type PropertyAssignment = ts.PropertyAssignment | tsAst.PropertyAssignment;
export type ShorthandPropertyAssignment = ts.ShorthandPropertyAssignment | tsAst.ShorthandPropertyAssignment;
export type SpreadAssignment = ts.SpreadAssignment | tsAst.SpreadAssignment;
export type EnumMember = ts.EnumMember | tsAst.EnumMember;
export type SourceFile = ts.SourceFile | tsAst.SourceFile;
export type Bundle = ts.Bundle | tsAst.Bundle;
export type JSDocTypeExpression = ts.JSDocTypeExpression | tsAst.JSDocTypeExpression;
export type JSDocNameReference = ts.JSDocNameReference | tsAst.JSDocNameReference;
export type JSDocMemberName = ts.JSDocMemberName | tsAst.JSDocMemberName;
export type JSDocLink = ts.JSDocLink | tsAst.JSDocLink;
export type JSDocLinkCode = ts.JSDocLinkCode | tsAst.JSDocLinkCode;
export type JSDocLinkPlain = ts.JSDocLinkPlain | tsAst.JSDocLinkPlain;
export type JSDocAllType = ts.JSDocAllType | tsAst.JSDocAllType;
export type JSDocUnknownType = ts.JSDocUnknownType | tsAst.JSDocUnknownType;
export type JSDocNullableType = ts.JSDocNullableType | tsAst.JSDocNullableType;
export type JSDocNonNullableType = ts.JSDocNonNullableType | tsAst.JSDocNonNullableType;
export type JSDocOptionalType = ts.JSDocOptionalType | tsAst.JSDocOptionalType;
export type JSDocFunctionType = ts.JSDocFunctionType | tsAst.JSDocFunctionType;
export type JSDocVariadicType = ts.JSDocVariadicType | tsAst.JSDocVariadicType;
export type JSDocNamepathType = ts.JSDocNamepathType | tsAst.JSDocNamepathType;
export type JSDoc = ts.JSDoc | tsAst.JSDoc;
export type JSDocTypeLiteral = ts.JSDocTypeLiteral | tsAst.JSDocTypeLiteral;
export type JSDocSignature = ts.JSDocSignature | tsAst.JSDocSignature;
export type JSDocAugmentsTag = ts.JSDocAugmentsTag | tsAst.JSDocAugmentsTag;
export type JSDocAuthorTag = ts.JSDocAuthorTag | tsAst.JSDocAuthorTag;
export type JSDocClassTag = ts.JSDocClassTag | tsAst.JSDocClassTag;
export type JSDocCallbackTag = ts.JSDocCallbackTag | tsAst.JSDocCallbackTag;
export type JSDocPublicTag = ts.JSDocPublicTag | tsAst.JSDocPublicTag;
export type JSDocPrivateTag = ts.JSDocPrivateTag | tsAst.JSDocPrivateTag;
export type JSDocProtectedTag = ts.JSDocProtectedTag | tsAst.JSDocProtectedTag;
export type JSDocReadonlyTag = ts.JSDocReadonlyTag | tsAst.JSDocReadonlyTag;
export type JSDocOverrideTag = ts.JSDocOverrideTag | tsAst.JSDocOverrideTag;
export type JSDocOverloadTag = ts.JSDocOverloadTag | tsAst.JSDocOverloadTag;
export type JSDocDeprecatedTag = ts.JSDocDeprecatedTag | tsAst.JSDocDeprecatedTag;
export type JSDocSeeTag = ts.JSDocSeeTag | tsAst.JSDocSeeTag;
export type JSDocEnumTag = ts.JSDocEnumTag | tsAst.JSDocEnumTag;
export type JSDocParameterTag = ts.JSDocParameterTag | tsAst.JSDocParameterTag;
export type JSDocReturnTag = ts.JSDocReturnTag | tsAst.JSDocReturnTag;
export type JSDocThisTag = ts.JSDocThisTag | tsAst.JSDocThisTag;
export type JSDocTypeTag = ts.JSDocTypeTag | tsAst.JSDocTypeTag;
export type JSDocTemplateTag = ts.JSDocTemplateTag | tsAst.JSDocTemplateTag;
export type JSDocTypedefTag = ts.JSDocTypedefTag | tsAst.JSDocTypedefTag;
export type JSDocUnknownTag = ts.JSDocUnknownTag | tsAst.JSDocUnknownTag;
export type JSDocPropertyTag = ts.JSDocPropertyTag | tsAst.JSDocPropertyTag;
export type JSDocImplementsTag = ts.JSDocImplementsTag | tsAst.JSDocImplementsTag;
export type JSDocSatisfiesTag = ts.JSDocSatisfiesTag | tsAst.JSDocSatisfiesTag;
export type JSDocThrowsTag = ts.JSDocThrowsTag | tsAst.JSDocThrowsTag;
export type JSDocImportTag = ts.JSDocImportTag | tsAst.JSDocImportTag;
export type ModuleName = ts.ModuleName | tsAst.ModuleName;
export type BinaryOperatorToken = ts.BinaryOperatorToken | tsAst.BinaryOperatorToken;
export type HasModifiers = ts.HasModifiers | tsAst.HasModifiers;
export type HasDecorators = ts.HasDecorators | tsAst.HasDecorators;
