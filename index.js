const { app, BrowserWindow, dialog, globalShortcut } = require('electron');
const path = require('path');

createWindow = () => {
  var mainWindow = new BrowserWindow({
    width: 500,
    height: 300,
    title: 'google',
    backgroundColor: 'black',
    frame: false,
    // transparent: true,
    reSizeable: false,
    // opacity: 0.2,
    // alwaysOnTop: true,
    show: false,
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  //   mainWindow.loadURL('https://google.com');

  mainWindow.webContents.on('did-finish-load', () => {
    // dialog
    //   .showOpenDialog(mainWindow, {
    //     buttonLabel: 'select Item',
    //     defaultPath: app.getPath('desktop'),
    //     title: 'select new item',
    //     properties: ['createDirectory', 'multiSelections'],
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });
    // dialog
    //   .showMessageBox({
    //     title: 'title is here',
    //     message: 'massage is here',
    //     detail: 'this is detail',
    //     buttons: ['yes', 'no', 'hi'],
    //   })
    //   .then((res) => console.log(res));
  });

  globalShortcut.register('commandOrControl +  F', () => {
    console.log('useer press F');
    // globalShortcut.unregister('commandOrControl +  F');
    console.log(globalShortcut.isRegistered('commandOrControl +  F'));
  });

  // mainWindow.webContents.openDevTools();

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
};

app.on('ready', createWindow);
