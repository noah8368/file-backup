"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function backup() {
    // Load the workspace file path.
    if (vscode.workspace.workspaceFolders == undefined) {
        console.log("ERROR: Workspace undefined.");
        return;
    }
    else if (vscode.workspace.workspaceFolders.length != 1) {
        console.log("ERROR: This extension requies ONE defined workspace.");
        return;
    }
    const workspace_path = vscode.workspace.workspaceFolders[0].uri.path;
    // Execute a python script that copies files over to the remote host.
    const { exec } = require('child_process');
    vscode.window.showInformationMessage('Attempting file transfer with rysnc');
    exec(`rsync -a ${workspace_path}/ ~/test_file_backup`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        else if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        else {
            console.log(stdout);
        }
    });
}
function activate(context) {
    console.log('The "file-backup" extension is now active');
    let disposable = vscode.commands.registerCommand('file-backup.backup', backup);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map