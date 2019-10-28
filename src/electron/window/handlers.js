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
    const storeKey = instance._category ? `windows.${instance._category}` : `windows.${instance._name}`
    store.set(storeKey, instance.getBounds())
    console.log(store.get(storeKey), 'stored')
  })

  instance.on('move', () => {
    store.set(`windows.${instance._name}`, instance.getBounds())
    console.log(store.get(`windows.${instance._name}`), 'stored')
  })
}
