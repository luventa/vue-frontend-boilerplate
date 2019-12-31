import koaStatic from 'koa-static'
import koaMount from 'koa-mount'

export default (prefix, staticPath) => {
  return koaMount(prefix, koaStatic(staticPath))
}
