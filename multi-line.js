var vscode = require('vscode')
const LINE_COUNT = 10;

/**
 * Get the line that is LINE_COUNT below the cursor, or the last line in the file.
 * @param {TextEditor} editor The active text editor
 * @returns {TextLine}
 */
function _validLineBelow(editor) {

    const document = editor.document;

    let currentLine = editor.selection.active.line;
    let lastLine = document.lineCount - 1;
    let wantedLine = currentLine + LINE_COUNT;

    while (currentLine < lastLine && currentLine < wantedLine) {
        currentLine = currentLine + 1;
    }

    return document.lineAt(currentLine);
}

/**
 * Get the line that is LINE_COUNT above the cursor, or the first line in the file.
 * @param {TextEditor} editor The active text editor
 * @returns {TextLine}
 */
function _validLineAbove(editor) {

    const document = editor.document;

    let currentLine = editor.selection.active.line;
    let firstLine = 0;
    let wantedLine = currentLine - LINE_COUNT;

    while (currentLine > firstLine && currentLine > wantedLine) {
        currentLine = currentLine - 1;
    }

    return document.lineAt(currentLine);
}

/**
 * Move the cursor to a new position, unselecting selected text.
 * @param {TextEditor} editor The active text editor
 * @param {Position} newPosn The new position
 */
function changeActive(editor, newPosn) {

    var newSelection = new vscode.Selection(newPosn, newPosn);
    editor.selection = newSelection;
    editor.revealRange(new vscode.Range(newPosn, newPosn));
}

/**
 * Move the cursor up
 * @param {TextEditor} editor The active text editor
 */
function multiLineTravelUp(editor) {

    const line = _validLineAbove(editor);
    const newPosn = new vscode.Position(line.lineNumber, 0); // Beginning of line, in case is first line
    changeActive(editor, newPosn);
}

/**
 * Move the cursor down
 * @param {TextEditor} editor The active text editor
 */
function multiLineTravelDown(editor) {
    const line = _validLineBelow(editor)
    const newPosn = new vscode.Position(line.lineNumber, line.text.length); // End of line, in case is last line
    changeActive(editor, newPosn);
}

module.exports = {
    multiLineTravelUp,
    multiLineTravelDown
};
