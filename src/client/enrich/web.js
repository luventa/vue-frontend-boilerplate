import { emptyFunction } from '../utils/shared'

/**
 * Simulate client window and related API for electron BrowserWindow.
 * @returns {Object} Fake instance of [BrowserWindow].
 */
const simulateClientWindow = () => {
  const clientWindow = Object.create(null)

  // windows api list of BrowserWindow
  const apiList = [
    'unmaximize', 'maximize', 'minimize', 'close',
    'setMinimumSize', 'setSize', 'getSize',
    'setResizablle', 'setMaximizable', 'center'
  ]
  apiList.forEach(api => {
    clientWindow[api] = emptyFunction
  })

  // return the client rect of app node.
  clientWindow.getSize = () => {
    const rect = document.getElementById('app').getBoundingClientRect()
    return [rect.height, rect.height]
  }

  return clientWindow
}

/**
 * Simulate ipcRenderer of electron by using localStorage.
 * @returns {Object} Simulation of ipcRenderer.
 */
const simulateIpcRenderer = () => {
  const on = (channel, listener) => {
    if (!(listener instanceof Function)) {
      return
    }

    if (!(window._ipcHandlers instanceof Array)) {
      window._ipcHandlers = []
    }

    const handler = e => {
      if (e.newValue) {
        listener(channel, JSON.parse(e.newValue))
      }
    }

    window.addEventListener('storage', handler)
    window._ipcHandlers.push(handler)

    return handler
  }

  const send = (channel, args) => {
    if (localStorage.getItem(channel)) {
      localStorage.removeItem(channel)
    }
    localStorage.setItem(channel, JSON.stringify(args))
  }

  const removeListeners = (channel, listener) => {
    window.removeEventListener('storage', listener)
  }

  const removeAllListeners = () => {
    if (!(window._ipcHandlers instanceof Array)) {
      window._ipcHandlers = []
    }

    window._ipcHandlers.forEach(handler => removeListeners(null, handler))
    window._ipcHandlers.length = 0
  }

  return { on, send, removeListeners, removeAllListeners }
}

/**
 * Simulate electron store
 * @returns {Object} Simulation of electron-store.
 */
const simulateElectronStore = () => {
  const estore = Object.create(null)
  const apiList = [
    'set', 'get', 'has', 'delete', 'clear',
    'onDidChange', 'onDidAnyChange', 'openInEditor'
  ]

  apiList.forEach(api => {
    estore[api] = emptyFunction
  })

  estore.size = 0
  estore.path = ''
  estore.store = Object.create(null)

  return estore
}

export const estore = simulateElectronStore()

/**
 * Simulate electron instance.
 * @returns {Object} Simulation of electron app.
 */
const SimulateElectronApp = () => (
  {
    remote: { getCurrentWindow: () => simulateClientWindow() },
    ipcRenderer: simulateIpcRenderer(),
    store: estore,
    shell: {
      openExternal: url => window.open(url)
    }
  }
)

const app = {
  install (Vue) {
    if (this.installed) return

    this.installed = true
    const electron = SimulateElectronApp()

    Object.defineProperties(Vue.prototype, {
      $app: {
        get () {
          return electron
        }
      },
      _isElectron: {
        get () {
          return false
        }
      },
      $ipc: {
        get () {
          return app.ipcRenderer
        }
      }
    })
  }
}

export default Vue => {
  Vue.use(app)
}
