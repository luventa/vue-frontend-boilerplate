import { app } from 'electron'
import { createMainWindow } from '../window'
import { registerDebugShortcuts } from './shortcuts'
import cache from '../window/cache'

let { mainWindow } = cache

export const onReady = () => {
  if (process.env.NODE_ENV === 'development') {
    let installExtension = require('electron-devtools-installer')
    installExtension.default(installExtension.VUEJS_DEVTOOLS).then(() => {
      console.log('Vue devtool is ready')
    }).catch(e => {
      console.log('Unable to install vue-devtools: \n', e)
    })
  }
  if (process.env.NODE_ENV !== 'production') {
    registerDebugShortcuts()
  }
  createMainWindow()
}

export const onAllClosed = () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

export const onActivated = () => {
  if (mainWindow === null) {
    createMainWindow()
  }
}
