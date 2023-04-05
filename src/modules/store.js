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
            commit('logout')
            router.push('/login')
        }
    },
    confirmLogin({commit}) {
        commit('loginRequest')

        const storage = localStorage.getItem('user')
        const user = JSON.parse(storage)

        if (user && user.token) {
            commit('loginSuccess', user)
        } else {
            commit('logout')
        }
    },
    logout({commit}) {
        commit('logout')
    }
}

const mutations = {
    resetState(state) {
        state.isLogin = false
        state.token = false
        state.user = false
    },
    loginRequest(state) {
        state.isLogin = true
        state.token = false
        state.user = false
    },
    loginSuccess(state, result) {
        state.isLogin = true
        state.token = result.token
        state.user = result.user
    },
    logout(state) {
        localStorage.removeItem('user')

        state.isLogin = false
        state.token = false
        state.user = false
    },
}

const getters = {
    getUserId() {
        const user = state.user;

        if (! user) {
            return false;
        }

        return user.id;
    },
    getUserName() {
        const user = state.user;

        if (! user) {
            return false;
        }

        return user.name;
    },
    getUserDisplayName() {
        const user = state.user;

        if (! user) {
            return false;
        }

        return user.displayName;
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
