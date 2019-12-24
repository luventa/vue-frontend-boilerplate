import { initializeElectron, windows } from 'electron-suites'

initializeElectron({
  env: {
    root: __dirname,
    mode: process.env.NODE_ENV,
    port: process.env.DEV_PORT
  },
  app: {
    devTool: 'VUEJS_DEVTOOLS',
    events: {
      activate: (event, hasVisibleWindows) => {
        global.$logger.info('event', event)
        global.$logger.info('hasVisibleWindows', hasVisibleWindows)
      }
    }
  },
  ipcEvents: {
    'task-saved': (event, task) => {
      global.$logger.info('Task saved:', task)
      // Now tell main window to refresh list.
      windows.main.webContents.send('refresh-task-list', 'haha')
    }
  },
  updater: {
    feedUrl: process.env.APP_UPDATER,
    resources: {
      product: 'http://localhost:2333/product.asar'
    }
  }
})
