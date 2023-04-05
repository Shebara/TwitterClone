import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMoment from 'vue-moment'

import App from './App.vue'
import store from './modules/store.js'
import router from './modules/router.js'

import './assets/css/tailwind.css'

Vue.use(VueAxios, axios)
Vue.use(VueMoment)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
