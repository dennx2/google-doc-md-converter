function findfileByName(name: string) {
  const files = DriveApp.getFilesByName(name);
  if (files.hasNext()) {
    return files.next();
  }

  return null;
}

function getTimeStamp() {
  return Math.round(new Date().getTime() / 1000);
}

function getFolder(
  name: string,
  toCreate: boolean,
  root?: GoogleAppsScript.Drive.Folder
) {
  // If user root folder is not provided, use the Drive root folder
  if (!root) {
    root = DriveApp.getRootFolder();
  }

  // Find the folder by its name
  const folderIter = root.getFoldersByName(name);
  if (folderIter.hasNext()) {
    // If the folder already exists, return the folder
    return folderIter.next();
  }

  // If the folder doesn't exist, check if use opted to create one
  if (toCreate) {
    return root.createFolder(name);
  }

  Logger.log(`Folder "${name}" does not exist and user opted not to create.`);
}

function getFolderNames(root: GoogleAppsScript.Drive.Folder) {
  const folderIter = root.getFolders();
  let folderNames: string[] = [];

  while (folderIter.hasNext()) {
    folderNames.push(folderIter.next().getName());
  }

  return folderNames;
}
