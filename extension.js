const vscode = require('vscode');
const MultiLine = require('./multi-line.js');

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "MultiLineTravel" is now active!');

	// The commands has been defined in the package.json file
	// The commandId parameter must match the command field in package.json
	const travelUp = vscode.commands.registerCommand('multiLineTravel.travelUp', function () {

        MultiLine.multiLineTravelUp(vscode.window.activeTextEditor);
	});
	const travelDown = vscode.commands.registerCommand('multiLineTravel.travelDown', function () {

        MultiLine.multiLineTravelDown(vscode.window.activeTextEditor);
	});

	context.subscriptions.push(travelUp, travelDown);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
