import electron from 'electron'

const app = {
  install (Vue) {
    if (this.installed) return

    this.installed = true

    Object.defineProperties(Vue.prototype, {
      $app: {
        get () {
          return electron
        }
      }
    })
  }
}

export default Vue => {
  Vue.use(app)

  Object.defineProperties(Vue.prototype, {
    _isElectron: {
      get () {
        return true
      }
    }
  })
}
