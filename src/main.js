const {
  app,
  BrowserWindow,
  dialog,
  globalShortcut,
  Menu,
  MenuItem,
  Tray,
  powerMonitor,
  session,
  desktopCapturer,
  screen,
} = require('electron');
const { ipcMain } = require('electron/main');
const path = require('path');

///////////////////////////////////////////////////.*.Menu.*.//////////////////////////////////////

let appTray, mainWindow;

// const mainMenu = new Menu();
// const mainMenuItem = new MenuItem({
//   label: 'Electron',
//   submenu: [
//     {
//       label: 'item1',
//     },
//     {
//       label: 'item2',
//     },
//     {
//       label: 'item3',
//     },
//   ],
// });
// mainMenu.append(mainMenuItem);

const mainMenu = Menu.buildFromTemplate([
  {
    label: 'Electron',
    submenu: [
      {
        label: 'item1',
        enabled: false,
      },
      {
        label: 'item2',
        click: () => {
          console.log('item2 clicked');
        },
      },
      {
        label: 'item3',
        accelerator: 'shift +  F',
        click: () => {
          console.log('item3 clicked');
        },
      },
      {
        label: 'item4',
        role: 'togglefullscreen',
      },
    ],
  },
  {
    label: 'Info',
    submenu: [
      {
        label: 'item1',
      },
      {
        label: 'item2',
      },
      {
        label: 'item3',
      },
    ],
  },
]);

const trayMenu = Menu.buildFromTemplate([
  {
    label: 'item1',
  },
  {
    label: 'item2',
  },
  {
    label: 'item3',
  },
]);

///////////////////////////////////////////////////.*.Menu.*.//////////////////////////////////////////////
///////////////////////////////////////////////////.*.Tray.*.//////////////////////////////////////////////

const CreateAppTray = () => {
  const imagePath = path.join('assets', 'images.png');
  appTray = new Tray(imagePath);
  appTray.setToolTip('my Application');
  appTray.setContextMenu(trayMenu);
  appTray.on('click', (e) => {
    if (e.shiftKey) {
      app.quit();
    } else {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });
};

///////////////////////////////////////////////////.*.Tray.*.//////////////////////////////////////////////
///////////////////////////////////////////////////.*.createWindow.*.//////////////////////////////////////
createWindow = () => {
  ///////////////////////////////////////////////////.*.screen.*.//////////////////////////////////////
  // console.log(screen.getAllDisplays());
  var primaryDisplay = screen.getPrimaryDisplay();
  console.log(primaryDisplay);

  ///////////////////////////////////////////////////.*.screen.*.//////////////////////////////////////
  mainWindow = new BrowserWindow({
    height: primaryDisplay.size.height,
    width: primaryDisplay.size.width / 2,
    title: 'google',
    backgroundColor: 'black',
    // frame: false,
    // transparent: true,
    reSizeable: false,
    // opacity: 0.2,
    // alwaysOnTop: true,
    show: false,
    webPreferences: {
      nodeIntegration: true, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, 'preload.js'), // use a preload script
    },
    x: 0,
    y: 0,
  });

  ///////////////////////////////////////////////////.*.createWindow.*.//////////////////////////////////////

  CreateAppTray();

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

  ///////////////////////////////////////////////////.*.powerMonitor.*.//////////////////////////////////////
  //if pc go to sleep
  powerMonitor.on('suspend', (e) => {
    console.log('This is Suspend event');
  });

  //if pc go to run again
  powerMonitor.on('resume', (e) => {
    if (mainWindow === null) {
      createWindow();
      console.log('This is resume event');
    }
  });

  ///////////////////////////////////////////////////.*.powerMonitor.*.//////////////////////////////////////
  ///////////////////////////////////////////////////.*.shortCut.*./////////////////////////////////////////
  globalShortcut.register('commandOrControl +  F', () => {
    console.log('useer press F');
    // globalShortcut.unregister('commandOrControl +  F');
    console.log(globalShortcut.isRegistered('commandOrControl +  F'));
  });

  ///////////////////////////////////////////////////.*.shortCut.*.//////////////////////////////////////
  ///////////////////////////////////////////////////.*.cookie.*.//////////////////////////////////////
  session.defaultSession.cookies
    .set({
      url: 'https://google.com/',
      name: 'fllName',
      value: 'Ali Rezai',
    })
    .then((res) => {
      session.defaultSession.cookies.get({ url: 'yahoo.com' }).then((data) => {
        console.log(data);
      });
    })
    .catch((err) => console.log(err));

  // session.defaultSession.cookies
  //   .get({ url: 'https://google.com/' })
  //   .then((data) => {
  //     console.log(data);
  //   });

  ///////////////////////////////////////////////////.*.cookie.*.//////////////////////////////////////
  mainWindow.setMenu(mainMenu);
  mainWindow.webContents.openDevTools();
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    setTimeout(() => {
      TakeScreenshot();
    }, 2000);
  });
};
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

///////////////////////////////////////////////////.*.desktop.capturer.*.//////////////////////////////////////
function TakeScreenshot() {
  desktopCapturer
    .getSources({
      types: ['window'],
      thumbnailSize: { width: 800, height: 600 },
    })
    .then((res) => {
      mainWindow.webContents.send(
        'screenshot-channel',
        res[0].thumbnail.toDataURL(),
      );
    });
}
///////////////////////////////////////////////////.*.desktop.capturer.*.//////////////////////////////////////
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//////////////////////////////////////////////////*.ipc.*//////////////////////////////////////////
ipcMain.on('test-channel1', (e, args) => {
  console.log(args);
  e.sender.send('test-channel-res', 'data received');
});

/////////////////////////////////////////////////*.ipc.*//////////////////////////////////////////
