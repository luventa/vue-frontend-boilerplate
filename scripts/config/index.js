const path = require('path')

// Project compile config is here. Profile config is seperated in env.js
module.exports = {
  project: 'my-web-app',
  env: {
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    node_env: process.env.NODE_ENV,
    target: process.env.TARGET && process.env.TARGET.replace('electron', 'electron-renderer'),
    is_web: process.env.TARGET === 'web',
    is_dev: process.env.NODE_ENV === 'development',
    is_prod: process.env.NODE_ENV === 'production'
  },
  build: {
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    includeModules: true,
    productionSourceMap: true,
    productionGzip: true,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    port: 2333,
    autoOpen: true,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    nodeServerEnabled: false,
    logLevel: 'debug'
  },
  source: {
    root: path.resolve('src'),
    client: path.resolve('src/client'),
    electron: path.resolve('src/electron'),
    styleResources: path.resolve('src/client/style/global.scss'),
    server: path.resolve('src/server'),
    static: path.resolve('src/static')
  },
  output: {
    root: path.resolve('dist'),
    asar: path.resolve('dist/asar'),
    web: path.resolve('dist/web'),
    electron: path.resolve('dist/electron'),
    static: path.resolve('dist/static')
  }
}
