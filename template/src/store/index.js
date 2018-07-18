import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lastime: new Date
  },
  mutations: {
    [types.UPTIME](state, data) {
      state.lastime = data
    }
  }
})