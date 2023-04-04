import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

import App from './App.vue'
import PostList from './pages/PostList.vue';

import './assets/css/tailwind.css'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueAxios, axios);

const routes = [
  {
  name: 'PostList',
  path: '/',
  component: PostList
  }
];

const router = new VueRouter({ mode: 'history', routes: routes });

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
