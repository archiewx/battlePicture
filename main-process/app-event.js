const { app } = require('electron');

app.on('window-all-closed', (e) => {
  e.preventDefault();
});

app.on('will-quit', (e) => {
  e.preventDefault();
});

app.on('quit', (e) => {
  e.preventDefault();
});
