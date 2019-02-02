if (!('fetch' in window) || !('assign' in Object)) {
  require('./polyfill')
}

import Vue from 'vue'
import { sync } from 'vuex-router-sync'
// import { cookie } from 'js-cookie'
import App from './App'
import router from './router'
import store from './store'
import enrich from './enrich'
import enrichWeb from './enrich/web'

enrich(Vue)
enrichWeb(Vue)

Vue.config.devtools = process.env.NODE_ENV !== 'production'
Vue.config.productionTip = false

sync(store, router)
const { dispatch } = store

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to) => {
  dispatch('setCurrentTrace', to.path)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
