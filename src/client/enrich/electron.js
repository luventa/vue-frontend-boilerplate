import electron from 'electron'
import ElectronStore from 'electron-store'

export const estore = new ElectronStore()

const { ipcRenderer } = electron

/**
 * Get the stored password with keytar for the given service and account
 * @param {String} service The string service name.
 * @param {String} account The string account name.
 * @returns The string password or null.
 */
const getPassword = (service, account) => (
  new Promise((resolve, reject) => {
    ipcRenderer.send('keytar-get', { service, account })
    ipcRenderer.once('keytar-get', (event, password) => resolve(password))
  })
)

/**
 * Store the password with keytar for the given service and account
 * @param {String} service The string service name.
 * @param {String} account The string account name.
 * @param {String} password The string password.
 */
const setPassword = (service, account, password) => (
  new Promise((resolve, reject) => {
    ipcRenderer.send('keytar-set', { service, account, password })
    ipcRenderer.once('keytar-set', () => resolve())
  })
)

/**
 * Remove the stored password with keytar for the given service and account
 * @param {String} service The string service name.
 * @param {String} account The string account name.
 */
const deletePassword = (service, account) => (
  new Promise((resolve, reject) => {
    ipcRenderer.send('keytar-delete', { service, account })
    ipcRenderer.once('keytar-delete', () => resolve())
  })
)

/**
 * Register keytar methods
 * @see https://www.npmjs.com./package/keytar
 */
Object.assign(estore, { getPassword, setPassword, deletePassword })

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
