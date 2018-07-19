import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import axios from '../axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInf: null,
    wantPath: null
  },
  mutations: {
    [types.SET_USER_INF] (state, data) {
      state.userInf = data
    },
    [types.SET_WANT_PATH] (state, data) {
      state.wantPath = data
    }
  },
  actions: {
    async [types.LOGIN] ({ commit }, data) {
      return new Promise(async (resolve, reject) => {
        try {
          const { token } = (await axios('LOGIN', data))
          const { user } = await axios('USER_INF', { token })
          commit(types.SET_USER_INF, { token, user })
          localStorage.userInf = JSON.stringify({ token, user })
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    [types.LOGIN_OUT] ({ commit }) {
      localStorage.removeItem('userInf')
      commit(types.SET_USER_INF, null)
    }
  }
})
