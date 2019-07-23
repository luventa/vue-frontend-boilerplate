import { globalShortcut } from 'electron'
import cache from '../window/cache'

let { mainWindow } = cache

export const registerDebugShortcuts = () => {
  // Register debug shortcut 'F12' to bring up dev tools
  globalShortcut.register('F12', () => {
    if (mainWindow) {
      mainWindow.webContents.openDevTools()
    }
  })
}
