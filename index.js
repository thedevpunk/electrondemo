const resultIndex = document.getElementById('result-index');
const appVersionElem = document.getElementById('app-version');
const notification01 = document.getElementById('notification-01');
const notification02 = document.getElementById('notification-02');
const notificationCloseButton01 = document.getElementById('notification-close-button-01');
const notificationCloseButton02 = document.getElementById('notification-close-button-02');
const notificationRestartButton = document.getElementById('notification-restart-button');

//#region Event Listener
window.addEventListener('DOMContentLoaded', () => {
   
   communicationHub.getAppVersion();
});

document.getElementById('main-button').addEventListener('click', () => {
   
   communicationHub.showMessageBox();
});

document.getElementById('notification-close-button-01').addEventListener('click', () => {

   notification01.classList.remove('show');
});

document.getElementById('notification-close-button-02').addEventListener('click', () => {

   notification02.classList.remove('show');
});

document.getElementById('notification-restart-button').addEventListener('click', () => {

   communicationHub.restartApp();
});

document.getElementById('check-updates').addEventListener('click', () => {

   communicationHub.checkForUpdates();
});
//#endregion
   
//#region HUB
communicationHub.showMessageBoxResult((resultButtonIndex) => {

   resultIndex.innerText = resultButtonIndex === '0' ? 'Cancel' : 'Ok';
});

communicationHub.getAppVersionResult((appVersion) => {

   appVersionElem.innerText = appVersion.version;
});

// communicationHub.checkForUpdatesResult((result) => {

//    console.log(result);
// });

communicationHub.updateAvailable(() => {

   notification01.classList.add('show');
});

communicationHub.updateDownloaded(() => {

   notification02.classList.add('show');
});
//#endregion
