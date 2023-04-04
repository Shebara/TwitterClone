import Vue from 'vue'
import Vuex from 'vuex'
import router from './router.js'

Vue.use(Vuex)

const state = {
    isUser: false,
    token: false,
    user: false,
}

const actions = {
    login({commit}, {user}) {
        commit('loginRequest')

        if (user.token) {
            commit('loginSuccess', user)
            console.log('Logged in!')
            router.push('/')
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
