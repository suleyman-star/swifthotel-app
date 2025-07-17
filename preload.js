const { contextBridge, ipcRenderer, webFrame } = require('electron');


// Zoom faktörünü başlangıçta 1 yap (normal)
webFrame.setZoomFactor(1);

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window:minimize'),
  toggleMaximize: () => ipcRenderer.send('window:toggle-maximize'),
  toggleFullscreen: () => ipcRenderer.send('window:toggle-fullscreen'),
  zoomIn: () => ipcRenderer.send('zoom-in'),
  zoomOut: () => ipcRenderer.send('zoom-out'),
  close: () => ipcRenderer.send('window:close')
});
