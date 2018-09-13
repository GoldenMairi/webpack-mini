import Vue from 'vue'
import Vuex from 'vuex'
import * as tps from './types'
import { getStore } from '../axios'
Vue.use(Vuex)

export default getStore(new Vuex.Store({
  state: {
    // 用户登录信息
    userInf: null,
    // 其他共享数据
    other: {
      user: {
        author: '名字',
        area: '地区'
      }
    },
    // 当前正在loading的请求数
    loadNum: 0,
    // 当前路由
    crt: null
  },
  mutations: {
    [tps.SET_USER_INF] (state, data) {
      state.userInf = data
    },
    [tps.DEAL_LOAD_NUM] (state, { data, crt }) {
      if (data === 0) {
        state.loadNum = 0
      } else {
        state.loadNum += data === 1 ? 1 : crt === state.crt ? -1 : 0
      }
    },
    [tps.SET_CRT] (state, data) {
      state.crt = data
    }
  },
  actions: {
    async [tps.LOGIN] ({ commit }, data) {
      return new Promise(async (resolve, reject) => {
        try {
          // 真实项目是需要以 await 开头调用登录接口的
          localStorage.userInf = JSON.stringify({ token: data })
          commit(tps.SET_USER_INF, { token: data })
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    [tps.LOGIN_OUT] ({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          // 真实项目是需要以 await 开头调用退出接口的
          localStorage.removeItem('userInf')
          commit(tps.SET_USER_INF, null)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}))
