const {
  contextBridge,
  nativeImage,
  clipboard,
  ipcRenderer,
} = require('electron');

contextBridge.exposeInMainWorld('$api', {
  nativeImage,
  clipboard,
  copyRemoteIMG: (url) => ipcRenderer.invoke('copyRemoteIMG', url),
  getAppIMAGEList: () => ipcRenderer.invoke('getAppIMAGEList')
});
