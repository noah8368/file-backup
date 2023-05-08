import * as vscode from 'vscode';

function backup(root_dir: string) {
	const { exec } = require('child_process')

	const workspace_folders = vscode.workspace.workspaceFolders;

	if (workspace_folders == undefined) {
		console.log("ERROR: workspace folder undefined")
	} else {
		console.log(workspace_folders.length);
	}

	exec('python3 src/backup.py ' + "TEST",
		(error: any, stdout: any, stderr: any) => {
			if (error) {
				console.log(`error: ${error.message}`);
			}
			else if (stderr) {
				console.log(`stderr: ${stderr}`);
			}
			else {
				console.log(stdout);
			}
		})

	vscode.window.showInformationMessage('File transfer successful');
}

export function activate(context: vscode.ExtensionContext) {
	console.log('The "file-backup" extension is now active');

	let disposable = vscode.commands.registerCommand(
		'file-backup.backup', backup
	);

	context.subscriptions.push(disposable);
}

export function deactivate() { }
