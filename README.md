# file-backup 

A VS Code extension that allows users to back-up the files in their workspace
to a remote machine.

## Requirements

You must have [Rsync](https://linux.die.net/man/1/rsync) installed on your local machine. This extension was
developed to run on GNU/Linux machins.

## Extension Settings

`file-backup.destination`: `username@remote_host:destination_directory`
* `username` is the username of the remote host
* `remote_host` is the IP address of the remote host discoverable on the local
  machine.
* `destination_directory` is the absolute file path where the workspace folder
  is backed up to. **NOTE**: All contents are saved in a folder (with the same
  name as the current workspace), which will be created at the destination.

