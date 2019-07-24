import { globalShortcut } from 'electron'
import windows from '../window/cache'

export const registerDebugShortcuts = () => {
  // Register debug shortcut 'F12' to bring up dev tools
  globalShortcut.register('CommandOrControl+O', () => {
    if (!windows.current) {
      return
    }

    if (windows.current.webContents.isDevToolsOpened()) {
      windows.current.webContents.closeDevTools()
    } else {
      windows.current.webContents.openDevTools()
    }
  })
}
