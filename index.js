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
} = require('electron');
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
  mainWindow = new BrowserWindow({
    width: 500,
    height: 300,
    title: 'google',
    backgroundColor: 'black',
    // frame: false,
    // transparent: true,
    reSizeable: false,
    // opacity: 0.2,
    // alwaysOnTop: true,
    show: false,
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

  mainWindow.setMenu(mainMenu);

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

  mainWindow.webContents.openDevTools();
  ///////////////////////////////////////////////////.*.shortCut.*.//////////////////////////////////////
  ///////////////////////////////////////////////////.*.cookie.*.//////////////////////////////////////
  session.defaultSession.cookies
    .set({
      url: 'https://google.com/',
      name: 'fllName',
      value: 'Ali Rezai',
    })
    .then((res) => {
      session.defaultSession.cookies.get({url: 'yahoo.com'}).then((data) => {
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

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
};

app.on('ready', createWindow);
