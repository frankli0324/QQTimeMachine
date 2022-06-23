'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import https from 'https';
import os from 'os';
import path from 'path';
import fs from 'fs';
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  protocol.registerFileProtocol('qimg', async (req, cb) => {
    let pattern = /(?<source>group|user)\/(?<sender>[0-9]*)\/(?<md5>[a-zA-Z0-9]{32})\/(?<filename>[^/]*)\/(?<fileid>[0-9]*)?/gm;
    let request = pattern.exec(req.url.substring(7));
    if (request === null) return;
    let { source, sender, md5, filename } = request.groups;
    md5 = md5.toUpperCase();
    const base = path.join(os.homedir(), 'Library/Containers/com.tencent.qq/Data');
    const md5cache = path.join(base, 'Library/Caches/Images');
    if (filename.startsWith('{')) {
      filename = `${md5}.${filename.split('.').pop()}`;
    }
    const location = path.join(md5cache, filename); // guessed
    if (!fs.existsSync(location)) {
      console.log(location);
      let req = await https.get((function () {
        switch (source) {
          case 'group': return {
            hostname: 'gchat.qpic.cn',
            //                            ⬇️ this seems to be consistent for each gruop
            path: `/gchatpic_new/${sender}/0-${request.groups['fileid']}-${md5}/0`,
            timeout: 3000,
          }
          case 'user': return {
            hostname: 'c2cpicdw.qpic.cn',
            path: `/offpic_new/${sender}/${sender}-0-${md5}`,
            timeout: 3000,
          }
        }
      })(), async function (res) {
        if (res.statusCode === 200) {
          const file = fs.createWriteStream(location);
          res.pipe(file);
          res.on('error', (err) => {
            fs.unlink(location);
          });
          file.on('finish', () => {
            file.close();
            cb(location);
          });
        } else { cb({ statusCode: 404 }); }
      });
      req.on('error', (err) => {
        cb({ statusCode: 404 });
      });
    } else {
      cb(location);
    }
  })
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
