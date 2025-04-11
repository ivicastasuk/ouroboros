const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    saveEmailTemplate: (html) => ipcRenderer.send('save-template', html),
    loadEmailTemplate: () => ipcRenderer.invoke('load-template')
});