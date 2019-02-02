import c2k from 'koa2-connect'
import { dev } from '../config'
import webpackDevMiddleware from 'webpack-dev-middleware'

export default compiler => {
  return c2k(webpackDevMiddleware(compiler, {
    publicPath: dev.assetsPublicPath,
    logLevel: 'silent',
    watchOptions: {
      aggregateTimeout: 300,
      poll: false
    }
  }))
}
