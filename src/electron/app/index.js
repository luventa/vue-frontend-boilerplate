import { app } from 'electron'
import { onReady, onAllClosed, onActivated } from './handlers'

export const initializeApp = () => {
  app.on('ready', onReady)
  app.on('window-all-closed', onAllClosed)
  app.on('activate', onActivated)
}
