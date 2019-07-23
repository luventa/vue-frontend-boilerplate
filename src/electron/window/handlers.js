import store from '../store'

export const registerEventHandlers = instance => {
  instance.once('ready-to-show', () => {
    instance.show()
  })

  instance.on('closed', () => {
    instance = null
  })

  instance.on('resize', () => {
    let { width, height } = instance.getBounds()
    store.set('windowBounds', { width, height })
  })
}
