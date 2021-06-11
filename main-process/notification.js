const { Notification } = require('electron');


exports.notice = function notice(img, message = '成功~') {
  const n = new Notification({
    title: '通知',
    body: message,
    silent: true,
    icon: img,
  });
  n.show();
};
