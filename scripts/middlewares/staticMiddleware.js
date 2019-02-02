import koaStatic from 'koa-static'
import koaMount from 'koa-mount'

export default staticPath => {
  return koaMount('/static', koaStatic(staticPath))
}
