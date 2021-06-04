const {
  contextBridge,
  nativeImage,
  clipboard,
  ipcRenderer,
} = require('electron');

contextBridge.exposeInMainWorld('$api', {
  nativeImage,
  clipboard,
  copyRemoteIMG: (item) => ipcRenderer.invoke('copyRemoteIMG', item),
});
