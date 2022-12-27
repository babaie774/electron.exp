const { app, BrowserWindow, dialog } = require('electron');
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
    opacity: 0.2,
    // alwaysOnTop: true,
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
    dialog
      .showMessageBox({
        title: 'title is here',
        message: 'massage is here',
        detail: 'this is detail',
        buttons: ['yes', 'no', "hi"],
      })
      .then((res) => console.log(res));
  });

  // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);
