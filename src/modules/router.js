import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({ mode: 'history', routes: routes })

router.beforeEach((to, from, next) => {
    const authRequired = ! ['/login', '/register'].includes(to.path)
    const loggedIn = localStorage.getItem('user')

    if (authRequired && ! loggedIn) {
      return next('/login')
    }

    next()
})

export default router;
