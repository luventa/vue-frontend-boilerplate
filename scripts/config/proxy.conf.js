/**
 * Proxy table for module http-proxy-middleware
 * @see https://www.npmjs.com/package/http-proxy-middleware
 */
module.exports = {
  /** Proxy websocket to local server */
  '/app-websocket': {
    target: 'http://localhost:8818',
    ws: true
  },
  /** Proxy http request start with /api to local server */
  '/api': {
    target: 'http://localhost:8818',
    changeOrigin: true,
    cookieDomainRewrite: {
      '*': ''
    },
    pathRewrite: {
      '^/api': '/'
    }
  }
}
