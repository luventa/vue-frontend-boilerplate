import { BrowserWindow } from 'electron'
import url from './url'
import store from '../store'
import cache from './cache'
import { registerEventHandlers } from './handlers'

let { mainWindow } = cache

// Default options for creating new window
const DEFAULT_OPTIONS = {
  minHeight: 768,
  minWidth: 1024,
  webPreferences: {
    nodeIntegration: true
  }
}

export const createMainWindow = () => {
  let { width, height } = store.get('windowBounds')
  let options = Object.assign({ width, height }, DEFAULT_OPTIONS)

  mainWindow = new BrowserWindow(options)

  mainWindow.loadURL(url)
  registerEventHandlers(mainWindow)

  return mainWindow
}
