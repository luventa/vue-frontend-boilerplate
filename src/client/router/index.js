import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/views/index'
// import Home from '@/views/Home'
import NotFound from '@/views/404'
import RouteTab from '@/views/RouteTab'

Vue.use(Router)

const lazyLoad = (name, index = false) => () => import(`@view/${name}${index ? '/index' : ''}.vue`)
export default new Router({
  base: process.env.TARGET !== 'web' ? process.env.ROUTE_BASE : '/',
  mode: process.env.TARGET !== 'web' ? 'history' : process.env.ROUTE_MODE,
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/httpDemo',
      name: 'HttpDemo',
      component: lazyLoad('HttpDemo')
    },
    {
      path: '/task/routeTab',
      name: 'routeTab',
      component: RouteTab,
      meta: { title: '展示页面' }
    },
    {
      path: '/task/list',
      name: 'TaskList',
      component: lazyLoad('TaskList'),
      meta: { title: 'taskList' }
    },
    {
      path: '/task/detail/:id',
      name: 'TaskDetail',
      component: lazyLoad('TaskDetail')
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    }
    // {
    //   path: '*',
    //   redirect: '/home'
    // }
  ]
})
