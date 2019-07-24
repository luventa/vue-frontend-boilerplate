import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Home from '@/views/Home'
import NotFound from '@/views/404'

Vue.use(Router)

const lazyLoad = (name, index = false) => () => import(`@view/${name}${index ? '/index' : ''}.vue`)

export default new Router({
  base: process.env.ROUTE_BASE,
  mode: process.env.TARGET !== 'web' ? 'hash' : process.env.ROUTE_MODE,
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/home',
      component: Index,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        },
        {
          path: '/httpDemo',
          name: 'HttpDemo',
          component: lazyLoad('HttpDemo')
        },
        {
          path: '/task/list',
          name: 'TaskList',
          component: lazyLoad('TaskList')
        }
      ]
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
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
