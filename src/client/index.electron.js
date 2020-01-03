import Vue from 'vue'
import { sync } from 'vuex-router-sync'
// import { cookie } from 'js-cookie'
import App from './App'
import router from './router'
import store from './store'
import enrich from './enrich'
import enrichElectron from './enrich/electron'

enrich(Vue)
enrichElectron(Vue)

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
