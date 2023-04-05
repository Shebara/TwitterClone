import Vue from 'vue'
import Vuex from 'vuex'
import router from './router.js'

Vue.use(Vuex)

const state = {
    isLogin: false,
    token: false,
    user: false,
}

const actions = {
    login({commit}, user) {
        commit('loginRequest')

        if (user.token) {
            commit('loginSuccess', user)
            localStorage.setItem('user', JSON.stringify(user))
            router.push('/')
        } else {
            commit('loginFailure')
        }
    },
    confirmLogin({commit}, user) {
        commit('loginRequest')

        if (user.token) {
            commit('loginSuccess', user)
        } else {
            commit('loginFailure')
        }
    },
    logout({commit}) {
        commit('resetState')
        router.push('/')
    }
}

const mutations = {
    resetState(state) {
        state.isLogin = false;
        state.token = false;
        state.user = false;
    },
    loginRequest(state) {
        state.isLogin = true;
        state.token = false;
        state.user = false;
    },
    loginSuccess(state, result) {
        state.isLogin = true;
        state.token = result.token;
        state.user = result.user;
    },
    loginFailure(state) {
        state.isLogin = false;
    },
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})
