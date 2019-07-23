import { BrowserWindow } from 'electron'
import url from './url'
import store from '../store'
import windows from './cache'
import { registerEventHandlers } from './handlers'

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
  let window = windows.main = new BrowserWindow(options)

  window.loadURL(url)
  registerEventHandlers(window)

  return window
}

/**
 * Restore all window instances
 */
export const initializeWindows = () => {
  createMainWindow()
}
