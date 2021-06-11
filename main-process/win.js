const { BrowserWindow, nativeImage, app } = require('electron');
const path = require('path');

const createGetWindowInstance = () => {
  let win = null;
  return function getWindowInstance(url) {
    if (win) return win;

    const img = nativeImage.createFromPath(
      path.resolve(__dirname, '..', 'assets/icons.png')
    );

    win = new BrowserWindow({
      width: 700,
      height: 420,
      resizable: false,
      maximizable: false,
      minimizable: false,
      fullscreenable: false,
      title: '斗图辅助',
      titleBarStyle: 'hidden',
      icon: img,
      opacity: 0.99,
      webPreferences: {
        devTools: true,
        nodeIntegration: true,
        preload: path.resolve(__dirname, '..', 'preload/inject.js'),
      },
    });
    if (process.env.NODE_ENV !== 'development') {
      win.loadFile(path.resolve(__dirname, '..', 'build/index.html'));
    } else {
      win.loadURL(url);
    }

    let isClose = false;
    win.on('close', (e) => {
      isClose = true;
      e.preventDefault();
      win.setAlwaysOnTop(true);
      win.hide();
      win.setClosable(false);
      app.dock.hide();
    });

    win.on('blur', () => {
      if (!isClose) return;

      win.hide();
      if (app.dock.isVisible()) {
        app.dock.hide();
      }
    });

    return win;
  };
};

module.exports = createGetWindowInstance;
