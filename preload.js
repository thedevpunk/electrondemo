const { ipcRenderer, contextBridge } = require("electron");


contextBridge.exposeInMainWorld('communicationHub', {

   showMessageBox() {
      
      ipcRenderer.send('showMessageBox');
   },
   showMessageBoxResult(callback) {

      ipcRenderer.on('showMessageBoxResult', (event, buttonIndex) => {

         callback(buttonIndex);
      });
   },
   getAppVersion() {

      ipcRenderer.send('getAppVersion');
   },
   getAppVersionResult(callback) {

      ipcRenderer.on('getAppVersionResult', (event, appVersion) => {

         callback(appVersion);
      });
   },
   checkForUpdates() {
      ipcRenderer.send('checkForUpdates');
   },
   // checkForUpdatesResult(callback) {
   //    ipcRenderer.on('checkForUpdatesResult', (result) => {

   //       callback(result);
   //    });
   // },
   updateAvailable(callback) {

      ipcRenderer.on('updateAvailable', () => {

         ipcRenderer.removeAllListeners('updateAvailable');

         callback();
      });
   },
   updateDownloaded(callback) {

      ipcRenderer.on('updateDownloaded', () => {

         ipcRenderer.removeAllListeners('updateDownloaded');
      
         callback();
      });
   },
   restartApp() {

      ipcRenderer.send('restart-app');
   }
});
