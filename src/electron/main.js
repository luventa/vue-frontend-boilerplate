import { initialize } from './app'

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')({ showDevTools: true })
} else {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

initialize()
