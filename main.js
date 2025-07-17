const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let currentZoom = 1.0;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 700,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  mainWindow.loadFile('index.html');
});

ipcMain.on('window:minimize', () => {
  mainWindow.minimize();
});

ipcMain.on('window:toggle-maximize', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on('window:toggle-fullscreen', () => {
  mainWindow.setFullScreen(!mainWindow.isFullScreen());
});

ipcMain.on('zoom-in', () => {
  currentZoom = Math.min(currentZoom + 0.1, 2);
  mainWindow.webContents.setZoomFactor(currentZoom);
});

ipcMain.on('zoom-out', () => {
  currentZoom = Math.max(currentZoom - 0.1, 0.5);
  mainWindow.webContents.setZoomFactor(currentZoom);
});

ipcMain.on('window:close', () => {
  mainWindow.close();
});

