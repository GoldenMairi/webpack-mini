import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import { default as axios, getStore } from '../axios'
Vue.use(Vuex)

export default getStore(new Vuex.Store({
  state: {
    userInf: null,
    loadNum: 0,
    crt: null
  },
  mutations: {
    [types.SET_USER_INF] (state, data) {
      state.userInf = data
    },
    [types.DEAL_LOAD_NUM] (state, { data, crt }) {
      if (data === 0) {
        state.loadNum = 0
      } else {
        state.loadNum += data === 1 ? 1 : crt === state.crt ? -1 : 0
      }
    },
    [types.SET_CRT] (state, data) {
      state.crt = data
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
      return new Promise(async (resolve, reject) => {
        try {
          localStorage.removeItem('userInf')
          commit(types.SET_USER_INF, null)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}))
