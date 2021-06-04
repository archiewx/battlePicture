require('./main-process');
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 420,
    resizable: false,
    title: '斗图辅助',
    titleBarStyle: 'hidden',
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      preload: __dirname + '/preload/inject.js',
    },
  });
  win.setIcon(__dirname + '/assets/icons.png');
  win.setAlwaysOnTop(true);
  win.loadFile(__dirname + '/build/index.html');
  // win.loadURL(url);
}

// const dockMenu = Menu.buildFromTemplate([
//   {
//     label: 'New Window',
//     click() {
//       console.log('New Window');
//     },
//   },
//   {
//     label: 'New Window with Settings',
//     submenu: [{ label: 'Basic' }, { label: 'Pro' }],
//   },
//   { label: 'New Command...' },
// ]);

if (false) {
  const devRenderBuilder = require('./scripts/start');
  devRenderBuilder().then((url) => {
    app.whenReady().then(() => {
      // if (process.platform === 'darwin') {
      //   app.dock.setMenu(dockMenu);
      // }
      createWindow(url);

      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow(url);
      });
    });
  });
} else {
  app.whenReady().then(() => {
    // if (process.platform === 'darwin') {
    //   app.dock.setMenu(dockMenu);
    // }
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
}
