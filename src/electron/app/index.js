import { app } from 'electron'
import { onReady, onAllClosed, onActivated } from './handlers'

export const initialize = () => {
  app.on('ready', onReady)
  app.on('window-all-closed', onAllClosed)
  app.on('activate', onActivated)
}
