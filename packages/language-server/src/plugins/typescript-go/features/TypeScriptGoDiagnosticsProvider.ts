import { Diagnostic } from 'vscode-languageserver-types';
import { Document } from '../../../lib/documents';
import { DiagnosticsProvider } from '../../interfaces';
import { TsApiService } from '../service';

export class TypeScriptGoDiagnosticsProvider implements DiagnosticsProvider {
    private readonly projectService: TsApiService;

    constructor(projectService: TsApiService) {
        this.projectService = projectService;
    }

    getDiagnostics(document: Document): Promise<Diagnostic[]> {
        const project = this.projectService.getOrCreateProject(document.uri);
    }
}