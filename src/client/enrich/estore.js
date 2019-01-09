import Store from 'electron-store'

export const store = new Store()

export default {
  install (Vue, options) {
    if (this.installed) return

    this.installed = true

    Object.defineProperties(Vue.prototype, {
      $estore: {
        get () {
          return store
        }
      }
    })
  }
}
