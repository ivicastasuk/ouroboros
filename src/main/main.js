const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 920,
        webPreferences: {
            preload: path.join(__dirname, '../preload.js'),
            contextIsolation: true
        }
    });

    win.loadFile(path.join(__dirname, '../renderer/index.html'));
}

app.whenReady().then(createWindow);

const { loadConfig } = require('./config');
const config = loadConfig();

const { ipcMain, dialog } = require('electron');
const fs = require('fs');

ipcMain.on('save-template', async (event, htmlContent) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
        title: 'Sačuvaj HTML šablon',
        defaultPath: 'template.html',
        filters: [ { name: 'HTML Files', extensions: [ 'html' ] } ]
    });

    if (!canceled && filePath) {
        fs.writeFileSync(filePath, htmlContent, 'utf-8');
    }
});

ipcMain.handle('load-template', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        title: 'Učitaj HTML šablon',
        filters: [ { name: 'HTML Files', extensions: [ 'html' ] } ],
        properties: [ 'openFile' ]
    });

    if (!canceled && filePaths.length > 0) {
        return fs.readFileSync(filePaths[ 0 ], 'utf-8');
    }

    return null;
});