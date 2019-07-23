import { app } from 'electron'
import { restoreWindows } from '../window'
import { registerDebugShortcuts } from './shortcuts'
import windows from '../window/cache'

/**
 * Handler for event of eletron has finished initializing.
 * @see https://electronjs.org/docs/api/app#event-ready
 * 1. Install install devtools for development mode.
 * 2. register shortcust for debugging under development & testing mode.
 * 3. restore all windows user opended last time.
 */
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
  restoreWindows()
}

/**
 * Handler for event of all windows are closed.
 * @see https://electronjs.org/docs/api/app#event-window-all-closed
 */
export const onAllClosed = () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

/**
 * Handler for event of application is activated
 * @kind macOs
 * @see https://electronjs.org/docs/api/app#event-activate-macos
 */
export const onActivated = () => {
  if (windows.main === null) {
    restoreWindows()
  }
}
