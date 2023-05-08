import * as vscode from 'vscode';

function backup() {
	// Load the workspace file path.
	if (vscode.workspace.workspaceFolders == undefined) {
		console.log("ERROR: Workspace undefined.");
		return;
	} else if (vscode.workspace.workspaceFolders.length != 1) {
		console.log("ERROR: This extension requies ONE defined workspace.");
		return;
	}
	const workspace_path = vscode.workspace.workspaceFolders[0].uri.path;

	// Execute a python script that copies files over to the remote host.
	const { exec } = require('child_process')
	vscode.window.showInformationMessage('Initiating file transfer');
	const backup_destination = vscode.workspace.getConfiguration('file-backup');
	exec(`rsync -av ${workspace_path} ${backup_destination}`,
		(error: any, stdout: any, stderr: any) => {
			if (error) {
				console.log(`error: ${error.message}`);
			}
			else if (stderr) {
				console.log(`stderr: ${stderr}`);
			}
			else {
				console.log(stdout)
			}
		})
}

export function activate(context: vscode.ExtensionContext) {
	console.log('The "file-backup" extension is now active');

	let disposable = vscode.commands.registerCommand(
		'file-backup.backup', backup
	);

	context.subscriptions.push(disposable);
}

export function deactivate() { }
