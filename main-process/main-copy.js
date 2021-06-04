const { ipcMain } = require('electron');

ipcMain.handle('copyRemoteIMG', copyRemoteIMG);

function copyRemoteIMG(e, item) {
  return new Promise((resolve, reject) => {
    const { net, clipboard, nativeImage } = require('electron');
    const req = net.request(item.thumbUrl);
    req.on('response', (resp) => {
      let buf = Buffer.of();
      resp.on('data', (chunk) => {
        buf = Buffer.concat([buf, chunk]);
      });

      resp.on('end', () => {
        const image = nativeImage.createFromBuffer(buf);
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
