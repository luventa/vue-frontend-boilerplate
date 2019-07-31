import { initializeApp } from './app'
import { initializeIpc } from './ipc'

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')({ showDevTools: false }) // hide devtools for development by default
} else {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

initializeApp()
initializeIpc()
