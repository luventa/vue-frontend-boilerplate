import store from '../store'
import windows, { closeAllWindow, clearCache } from './cache'

/**
 * Register common handlers for window.
 * @param { BrowserWindow } instance
 */
export const registerCommonHandlers = instance => {
  instance.once('ready-to-show', () => {
    instance.show()
  })

  instance.on('focus', () => {
    windows.current = instance
  })

  instance.on('closed', () => {
    clearCache(instance._name)
    if (instance._name === 'main') {
      closeAllWindow()
    }
  })

  instance.on('resize', () => {
    let { width, height } = instance.getBounds()
    let storeKey = instance._category ? `windows.${instance._category}` : `windows.${instance._name}`
    console.log('Window', instance._name, 'with rect', width, height)
    store.set(storeKey, { width, height })
    console.log(store.get(storeKey), 'stored')
  })

  instance.on('move', () => {
    let { x, y } = instance.getBounds()
    console.log('Window', instance._name, 'with location', x, y)
    store.set(`windows.${instance._name}`, { x, y })
    console.log(store.get(`windows.${instance._name}`), 'stored')
  })
}
