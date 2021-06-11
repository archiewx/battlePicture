const { ipcMain, Notification } = require('electron');
const fs = require('fs');
const os = require('os');
const { notice } = require('./notification');

ipcMain.handle('copyRemoteIMG', copyRemoteIMG);

function copyRemoteIMG(e, url, isNotice = true) {
  return new Promise((resolve, reject) => {
    const { net, clipboard, nativeImage } = require('electron');
    const req = net.request(url);
    req.on('response', (resp) => {
      let buf = Buffer.of();
      resp.on('data', (chunk) => {
        buf = Buffer.concat([buf, chunk]);
      });

      resp.on('end', () => {
        const image = nativeImage.createFromBuffer(buf);

        const cacheFile = os.homedir() + '/.dou/images';
        if (!fs.existsSync(cacheFile)) {
          fs.writeFileSync(cacheFile, ``);
        }
        const rows = fs.readFileSync(cacheFile).toString();
        if (!rows.includes(cacheFile)) {
          fs.appendFileSync(cacheFile, `${url}\n`);
        }
        clipboard.writeImage(image);
        if (Notification.isSupported() && isNotice) {
          notice(image, '复制成功~');
        }
        resolve();
      });

      resp.on('error', (err) => {
        reject(err);
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}
