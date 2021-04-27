const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');

  // mainWindow.once('ready-to-show', () => {

  //   autoUpdater.checkForUpdatesAndNotify();
  // });
}

app.whenReady().then(() => {
  createWindow();


  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// AutoUpdater
autoUpdater.on('update-available', () => {

  mainWindow.webContents.send('updateAvailable');
});

autoUpdater.on('update-downloaded', () => {

  mainWindow.webContents.send('updateDownloaded');
});


// IPC
ipcMain.on('checkForUpdates', (event) => {

  autoUpdater.checkForUpdatesAndNotify();
  // .then((result) => {

  //   mainWindow.webContents.send('checkForUpdatesResult', result);
  // });
});

ipcMain.on('getAppVersion', (event) => {
  event.sender.send('getAppVersionResult', { version: app.getVersion() });
});

ipcMain.on('showMessageBox', (event) => {

  const resultButtonIndex = dialog.showMessageBoxSync(mainWindow, {
    message: 'simple message in dialog',
    type: 'warning',
    title: 'Super extreme dialog',
    buttons: [
      'cancel',
      'ok'
    ]
  });

  event.sender.send('showMessageBoxResult', resultButtonIndex.toString());
});

ipcMain.on('restart-app', (event) => {

  autoUpdater.quitAndInstall();
});
