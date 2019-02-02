import { app, BrowserWindow } from 'electron'
import store from './store'

let mainWindow
const isDev = process.env.NODE_ENV === 'development'
const winURL = isDev
  ? `http://localhost:${process.env.DEV_PORT}`
  : `file://${__dirname}/index.html`

const createWindow = () => {
  let { width, height } = store.get('windowBounds')
  mainWindow = new BrowserWindow({
    height: height,
    width: width,
    minHeight: 768,
    minWidth: 1024,
    frame: isDev
  })

  mainWindow.loadURL(winURL)
  if (process.env.NODE_ENV === 'testing') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('resize', () => {
    let { width, height } = mainWindow.getBounds()
    store.set('windowBounds', { width, height })
  })
}

// const sendMessage = msg => {
//   if (mainWindow && mainWindow.webContents) {
//     mainWindow.webContents.send('message', msg)
//   }
// }

if (isDev) {
  require('electron-debug')({ showDevTools: true })
  app.on('ready', () => {
    let installExtension = require('electron-devtools-installer')
    installExtension.default(installExtension.VUEJS_DEVTOOLS).then(() => {
      console.log('Vue devtool is ready')
    }).catch(e => {
      console.log('Unable to install vue-devtools: \n', e)
    })
  })
} else {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// Single electron instance

app.on('ready', () => {
  createWindow()
  if (!isDev && process.env.APP_UPDATER) {
    // const { autoUpdater } = require('electron-updater')
    // autoUpdater
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
