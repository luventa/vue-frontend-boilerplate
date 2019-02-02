import Store from 'electron-store'

const store = new Store({
  defaults: {
    windowBounds: { width: 340, height: 550 },
    user: {
      name: null,
      title: null,
      token: 'dev-license-token'
    }
  }
})

export default store
