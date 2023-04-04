import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

import App from './App.vue'
import routes from './modules/routes.js'
import store from './modules/store.js'

import './assets/css/tailwind.css'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const router = new VueRouter({ mode: 'history', routes: routes })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
