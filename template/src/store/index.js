import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import {default as axios, getStore} from '../axios'
Vue.use(Vuex)

export default getStore(new Vuex.Store({
  state: {
    userInf: null,
    wantPath: null,
    loadNum: 0
  },
  mutations: {
    [types.SET_USER_INF] (state, data) {
      state.userInf = data
    },
    [types.SET_WANT_PATH] (state, data) {
      state.wantPath = data
    },
    [types.DEAL_LOAD_NUM] (state, data) {
      state.loadNum = data === 0 ? 0 : (state.loadNum + data)
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
}))
