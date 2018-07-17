import Vue from 'vue'
import App from './App'
import router from './router'
{{#vuex}}
import store from './store'
{{/vuex}}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  {{#vuex}}
  store,
  {{/vuex}}
  components: { App },
  template: '<App/>'
})
