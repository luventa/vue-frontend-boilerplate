import c2k from 'koa2-connect'
import chafMiddleware from 'connect-history-api-fallback'

export default c2k(chafMiddleware())
