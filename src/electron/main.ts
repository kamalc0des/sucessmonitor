import { app, BrowserWindow, ipcMain } from 'electron';
import * as url from 'url';
import * as path from 'path';
import { storeInstance } from './store-instance';

type UserSettings = {
  username: string;
  profilePicture: string;
  sessionCount: number;
};

// IPC handlers
ipcMain.handle('get-settings', () => storeInstance.getSettings());
ipcMain.handle('update-username', (_, username: string) => storeInstance.updateUsername(username));
ipcMain.handle('update-profile-picture', (_, picPath: string) => storeInstance.updateProfilePicture(picPath));
ipcMain.handle('increment-session', () => storeInstance.incrementSessionCount());
ipcMain.handle('reset-settings', () => storeInstance.reset());

let mainWindow: BrowserWindow | null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '../../dist/successmonitor/browser/index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
