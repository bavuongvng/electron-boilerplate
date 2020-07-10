const { app, BrowserWindow } = require("electron");
const path = require("path");
const {
  REACT_DEVELOPER_TOOLS,
  MOBX_DEVTOOLS,
  default: installExtension,
} = require("electron-devtools-installer");

let mainWindow;

function addExtensions() {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));
  installExtension(MOBX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 550,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const startUrl = process.env.ELECTRON_START_URL;
  console.log({ startUrl });

  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  addExtensions();

  mainWindow.on("close", function () {
    mainWindow = null;
  });
}

app.enableSandbox();
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
