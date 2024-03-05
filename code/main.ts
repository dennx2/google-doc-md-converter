function main() {
  /* Reading a doc file */
  const file = findfileByName("Setting Up Git Submodules");
  if (!file) {
    Logger.log("File not found.");
    return;
  }

  // This won't work cuz the file is not opened
  // var text = file.getBlob().getDataAsString();

  // Need to open the file before reading the text inside
  const doc = DocumentApp.openById(file.getId());
  if (!doc) {
    Logger.log("Unable to open document.");
    return;
  }

  const text = doc.getBody().getText();

  /* Creating a new folder */
  const newFolder = getFolder("MarkdownGen", true);
  if (!newFolder) {
    Logger.log("Unable to create folder MarkdownGen.");
    return;
  }

  const folderNames = getFolderNames(newFolder);

  const subFolder = getFolder(`Output-${getTimeStamp()}`, true, newFolder);
  if (!subFolder) {
    Logger.log("Unable to create subfolder.");
    return;
  }

  /* Creating a new file */
  const newDoc = subFolder.createFile("markdown-test.md", text);
  if (!newDoc) {
    Logger.log("Unable to create file in subfolder.");
    return;
  }

  Logger.log(text);
}
