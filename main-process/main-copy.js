const { ipcMain } = require('electron');
const fse = require('fs-extra');
const os = require('os');

ipcMain.handle('copyRemoteIMG', copyRemoteIMG);

function copyRemoteIMG(e, url) {
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
        if (!fse.existsSync(cacheFile)) {
          fse.writeFileSync(cacheFile, ``);
        }
        const rows = fse.readFileSync(cacheFile).toString();
        if (!rows.includes(cacheFile)) {
          fse.appendFile(cacheFile, `${url}\n`);
        }
        clipboard.writeImage(image);
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
