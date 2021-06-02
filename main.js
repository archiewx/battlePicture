const { app, BrowserWindow, Menu } = require('electron');

function createWindow(url) {
  const win = new BrowserWindow({
    width: 800,
    height: 500,
    titleBarStyle: 'hidden',
    webPreferences: {
      devTools: true,
    }
  });
  // win.loadFile('index.html');
  win.loadURL(url);
}

const dockMenu = Menu.buildFromTemplate([
  {
    label: 'New Window',
    click() {
      console.log('New Window');
    },
  },
  {
    label: 'New Window with Settings',
    submenu: [{ label: 'Basic' }, { label: 'Pro' }],
  },
  { label: 'New Command...' },
]);

const devRenderBuilder = require('./scripts/start');
devRenderBuilder().then((url) => {
  app.whenReady().then(() => {
    if (process.platform === 'darwin') {
      app.dock.setMenu(dockMenu)
    }
    createWindow(url);

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow(url);
    });
  });
});
