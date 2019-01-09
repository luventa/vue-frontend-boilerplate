import c2k from 'koa2-connect'
import proxyMiddleware from 'http-proxy-middleware'
import proxyTable from '../config/proxy.conf'

const proxyMiddlewares = []

Object.keys(proxyTable).forEach(ctx => {
  let options = proxyTable[ctx]
  if (typeof options === 'string') {
    options = { target: options }
  }
  proxyMiddlewares.push(c2k(proxyMiddleware(options.filter || ctx, options)))
})

export default proxyMiddlewares
