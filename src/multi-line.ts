import * as vscode from 'vscode';

const EXTENSION_NAME = 'multi-line-travel';
const _getLineSkipNumberConfig = () => vscode.workspace.getConfiguration(EXTENSION_NAME).get('lineSkipNumber') as number;
let lineSkipNumber = _getLineSkipNumberConfig();

vscode.workspace.onDidChangeConfiguration((configurationEvent) => {
    if (configurationEvent.affectsConfiguration(EXTENSION_NAME)) {
        lineSkipNumber = _getLineSkipNumberConfig();
    }
});

function _getValidLineBelow(editor: vscode.TextEditor) {

    const document = editor.document;

    let currentLine = editor.selection.active.line;
    let lastLine = document.lineCount - 1;
    let wantedLine = currentLine + lineSkipNumber;

    while (currentLine < lastLine && currentLine < wantedLine) {
        currentLine = currentLine + 1;
    }

    return document.lineAt(currentLine);
}

function _getValidLineAbove(editor: vscode.TextEditor) {

    const document = editor.document;

    let currentLine = editor.selection.active.line;
    let firstLine = 0;
    let wantedLine = currentLine - lineSkipNumber;

    while (currentLine > firstLine && currentLine > wantedLine) {
        currentLine = currentLine - 1;
    }

    return document.lineAt(currentLine);
}

function _changePosition(editor: vscode.TextEditor, newPosn: vscode.Position) {

    var newSelection = new vscode.Selection(newPosn, newPosn); // hack to actually don't select anything
    editor.selection = newSelection;
    editor.revealRange(new vscode.Range(newPosn, newPosn));
}

export function multiLineTravelUp(editor?: vscode.TextEditor) {

    if (!editor) {
        return;
    };
    
    const line = _getValidLineAbove(editor);
    const newPosition = new vscode.Position(line.lineNumber, 0); // Beginning of line, in case is first line
    _changePosition(editor, newPosition);
}

export function multiLineTravelDown(editor?: vscode.TextEditor) {

    if (!editor) {
        return;
    };

    const line = _getValidLineBelow(editor);
    const newPosition = new vscode.Position(line.lineNumber, line.text.length); // End of line, in case is last line
    _changePosition(editor, newPosition);
}
