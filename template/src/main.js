import Vue from 'vue'
import router from './router'
import store from './store'
import hView from '../frameworks/hView'
import {SET_USER_INF} from './store/types'
import App from './App'

import './styles/index.scss'

Vue.use(hView)
Vue.config.productionTip = false

const userInf = localStorage.userInf
if (userInf) {
  store.commit(SET_USER_INF, JSON.parse(userInf))
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
