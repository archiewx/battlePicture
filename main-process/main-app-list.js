const { ipcMain } = require('electron');
const os = require('os');
const fse = require('fs-extra');

ipcMain.handle('getAppIMAGEList', getAppIMAGEList);

function getAppIMAGEList() {
  const imgPath = os.homedir() + '/.dou/images';
  const images = fse.readFileSync(imgPath).toString();
  return Promise.resolve(images.split('\n').filter(Boolean).reverse())
}
