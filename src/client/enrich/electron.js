import electron from 'electron'
import ElectronStore from 'electron-store'

export const estore = new ElectronStore()

const app = {
  install (Vue) {
    if (this.installed) return

    this.installed = true

    // register electron store.
    electron.store = estore

    Object.defineProperties(Vue.prototype, {
      $app: {
        get () {
          return electron
        }
      },
      _isElectron: {
        get () {
          return true
        }
      },
      $ipc: {
        get () {
          return electron.ipcRenderer
        }
      }
    })
  }
}

export default Vue => {
  Vue.use(app)
}
