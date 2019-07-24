import { emptyFunction } from '../utils/shared'

const mockApp = () => {
  let clientWindow = Object.create(null)
  let windowApiList = [
    'unmaximize', 'maximize', 'minimize', 'close',
    'setMinimumSize', 'setSize', 'getSize',
    'setResizablle', 'setMaximizable', 'center'
  ]
  windowApiList.forEach(api => {
    clientWindow[api] = emptyFunction
  })

  clientWindow.getSize = () => {
    let rect = document.getElementById('app').getBoundingClientRect()
    return [ rect.height, rect.height ]
  }

  return {
    remote: { getCurrentWindow: () => clientWindow },
    ipcRenderer: {
      on: (channel, listener) => {
        if (!(listener instanceof Function)) {
          return null
        }
        const handler = e => listener(e.key, e.newValue)
        window.addEventListener('storage', handler)
        return handler
      },
      send: emptyFunction,
      removeAllListeners: emptyFunction
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
    let app = mockApp()

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
      }
    })
  }
}

export default Vue => {
  Vue.use(app)
}
