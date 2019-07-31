import { emptyFunction } from '../utils/shared'

const mockApp = () => {
  const clientWindow = Object.create(null)
  const windowApiList = [
    'unmaximize', 'maximize', 'minimize', 'close',
    'setMinimumSize', 'setSize', 'getSize',
    'setResizablle', 'setMaximizable', 'center'
  ]
  windowApiList.forEach(api => {
    clientWindow[api] = emptyFunction
  })

  clientWindow.getSize = () => {
    const rect = document.getElementById('app').getBoundingClientRect()
    return [rect.height, rect.height]
  }

  return {
    remote: { getCurrentWindow: () => clientWindow },
    ipcRenderer: {
      on: (channel, listener) => {
        if (!(listener instanceof Function)) {
          return null
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
      },
      send: (channel, args) => {
        if (localStorage.getItem(channel)) {
          localStorage.removeItem(channel)
        }
        localStorage.setItem(channel, JSON.stringify(args))
      },
      removeListener: (channel, listener) => {
        window.removeEventListener('storage', listener)
      },
      removeAllListeners: () => {
        if (!(window._ipcHandlers instanceof Array)) {
          window._ipcHandlers = []
          return
        }

        window._ipcHandlers.forEach(handler => {
          window.removeEventListener('storage', handler)
        })

        window._ipcHandlers.length = 0
      }
    },
    shell: {
      openExternal: url => window.open(url)
    }
  }
}

const app = {
  install (Vue) {
    if (this.installed) return

    this.installed = true
    const app = mockApp()

    Object.defineProperties(Vue.prototype, {
      $app: {
        get () {
          return app
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
