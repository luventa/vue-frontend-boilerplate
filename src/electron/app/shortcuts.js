import { globalShortcut } from 'electron'
import windows from '../window/cache'

export const registerDebugShortcuts = () => {
  // Register debug shortcut 'F12' to bring up dev tools
  globalShortcut.register('CommandOrControl+O', () => {
    if (!windows.main) {
      return
    }

    if (windows.main.webContents.isDevToolsOpened()) {
      windows.main.webContents.closeDevTools()
    } else {
      windows.main.webContents.openDevTools()
    }
  })
}
