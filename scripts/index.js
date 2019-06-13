'use strict'

require('core-js/stable')
require('regenerator-runtime/runtime')
require('@babel/register')({
  presets: [
    ['@babel/preset-env', {
      targets: { node: 'current' }
    }]
  ]
})

if (process.env.MODE === 'dev') {
  require('./dev-server')
} else if (process.env.MODE === 'build' ||
  process.env.MODE === 'analyze') {
  require('./build')
} else {
  require('./utils/help')
}
