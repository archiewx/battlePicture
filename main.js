require('update-electron-app')({
  repo: 'zsirfs/battlePicture',
  updateInterval: '1 hour',
})
require('./main-process');
const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');
const fse = require('fs-extra');
const os = require('os');
const createGetWindowInstance = require('./main-process/win');

const getWindowInstance = createGetWindowInstance();

app.on('window-all-closed', (e) => {
  e.preventDefault();
});

app.on('will-quit', (e) => {
  e.preventDefault();
});

app.on('quit', (e) => {
  e.preventDefault();
});

const menu = Menu.buildFromTemplate([
  {
    label: app.name,
    submenu: [{ role: 'about' }, { role: 'toggleDevTools' }, { role: 'quit' }],
  },
]);
Menu.setApplicationMenu(menu);
app.setName('DouTu');

if (process.env.NODE_ENV === 'development') {
  const devRenderBuilder = require('./scripts/start');
  devRenderBuilder().then((url) => {
    ready(url);
  });
} else {
  ready();
}

function ready(url) {
  app
    .whenReady()
    .then(() => {
      if (!fse.existsSync(os.homedir() + '/.dou')) {
        fse.mkdirSync(os.homedir() + '/.dou');
      }
      // if (process.platform === 'darwin') {
      //   app.dock.setMenu(dockMenu);
      // }
      getWindowInstance(url);

      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) getWindowInstance(url);
      });
    })
    .then(trayReady);
}

let tray = null;
function trayReady() {
  const img = nativeImage.createFromPath(__dirname + '/assets/tray.png');
  tray = new Tray(img);
  tray.setToolTip('click to show win ~');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      type: 'normal',
      click() {
        app.exit();
      },
    },
  ]);
  tray.on('right-click', () => {
    tray.setContextMenu(contextMenu);
  });

  tray.on('click', (_, pos) => {
    tray.setContextMenu(null);
    const x = pos.x - 300;
    const y = pos.y - pos.height;
    const win = getWindowInstance();

    if (win.isVisible() && win.isClosable()) return;

    if (!win.isVisible()) {
      win.setPosition(x, y);
      win.show();
    } else {
      win.hide();
    }
  });
}
