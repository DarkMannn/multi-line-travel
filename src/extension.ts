// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as MultiLine from './multi-line';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "multi-line-travel" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const travelUp = vscode.commands.registerCommand('multiLineTravel.travelUp', () => {
		// The code you place here will be executed every time your command is executed
        MultiLine.multiLineTravelUp(vscode.window.activeTextEditor);
	});
	const travelDown = vscode.commands.registerCommand('multiLineTravel.travelDown', () => {
		// The code you place here will be executed every time your command is executed
        MultiLine.multiLineTravelDown(vscode.window.activeTextEditor);
	});

	context.subscriptions.push(travelUp, travelDown);
}
