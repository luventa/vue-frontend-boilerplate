import c2k from 'koa2-connect'
import webpackHotMiddleware from 'webpack-hot-middleware'

export default compiler => {
  return c2k(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 5 * 1000
  }))
}