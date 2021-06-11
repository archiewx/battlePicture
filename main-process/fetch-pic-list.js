const { ipcMain, net } = require('electron');
const qs = require('querystring');

ipcMain.handle('fetchPicList', fetchPicList);

function fetchPicList(e, query = { start: 0, w: '哈哈哈', size: 100 }) {
  return new Promise((resolve, reject) => {
    const url = 'http://www.dbbqb.com/api/search/json?' + qs.stringify(query);
    const req = net.request({ method: 'GET', url });
    console.log('url ==>>', url);

    req.on('response', (resp) => {
      let buf = Buffer.from([]);
      resp.on('data', (chunk) => {
        buf = Buffer.concat([buf, chunk]);
      });

      resp.on('end', () => {
        const data = JSON.parse(buf);
        resolve(data);
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
