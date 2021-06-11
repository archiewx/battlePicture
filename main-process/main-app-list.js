const { ipcMain } = require('electron');
const os = require('os');
const fs = require('fs');

ipcMain.handle('getAppIMAGEList', getAppIMAGEList);

function getAppIMAGEList() {
  const imgPath = os.homedir() + '/.dou/images';
  const images = fs.readFileSync(imgPath).toString();
  return Promise.resolve(images.split('\n').filter(Boolean).reverse())
}
