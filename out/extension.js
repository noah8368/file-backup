"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function backup(root_dir) {
    const { exec } = require('child_process');
    const workspace_folders = vscode.workspace.workspaceFolders;
    if (workspace_folders == undefined) {
        console.log("ERROR: workspace folder undefined");
    }
    else {
        console.log(workspace_folders.length);
    }
    exec('python3 src/backup.py ' + "TEST", (error, stdout, stderr) => {
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
    vscode.window.showInformationMessage('File transfer successful');
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