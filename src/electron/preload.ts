import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getSettings: () => ipcRenderer.invoke('get-settings'),
  updateUsername: (username: string) => ipcRenderer.invoke('update-username', username),
  updateProfilePicture: (path: string) => ipcRenderer.invoke('update-profile-picture', path),
  incrementSession: () => ipcRenderer.invoke('increment-session'),
  resetSettings: () => ipcRenderer.invoke('reset-settings')
});
