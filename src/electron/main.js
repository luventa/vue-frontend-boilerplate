import path from 'path'
import { initializeElectron, windows } from 'electron-suites'

initializeElectron({
  /** @see https://github.com/luventa/electron-suites/blob/master/README_CN.md#env */
  env: {
    root: __dirname,
    mode: process.env.NODE_ENV,
    port: process.env.DEV_PORT,
    cache: path.resolve(__dirname, '../../cache')
  },
  /** @see https://github.com/luventa/electron-suites/blob/master/README_CN.md#app */
  app: {
    devTool: 'VUEJS_DEVTOOLS',
    events: {
      activate: (event, hasVisibleWindows) => {
        global.$logger.info('event', event)
        global.$logger.info('hasVisibleWindows', hasVisibleWindows)
      }
    }
  },
  /** @see https://github.com/luventa/electron-suites/blob/master/README_CN.md#ipcevents */
  ipcEvents: {
    'task-saved': (event, task) => {
      global.$logger.info('Task saved:', task)
      // Now tell main window to refresh list.
      windows.main.webContents.send('refresh-task-list', 'haha')
    }
  },
  /** @see https://github.com/luventa/electron-suites/blob/master/README_CN.md#updater */
  updater: {
    feedUrl: process.env.APP_UPDATER,
    resources: {
      app: 'http://localhost:8018/app/app.asar',
      pms: {
        name: 'pms',
        url: 'http://localhost:8018/pms/PeopleManageSystem.asar',
        auto: true,
        force: true
      },
      ucs: 'http://localhost:8018/ucs/uniqueClientSystem.asar'
    }
  }
})
