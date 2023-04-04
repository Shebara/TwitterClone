import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    posts: []
}

export default new Vuex.Store({
    state
})