import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { SET_WANT_PATH } from '../store/types'

import HelloWorld from '@/components/HelloWorld'
import Youke from '@/components/Youke'
import Logined from '@/components/Logined'
import Admin from '@/components/Admin'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter: (to, from, next) => store.state.userInf ? next('/Youke') : next()
    },
    {
      path: '/Youke',
      name: 'Youke',
      component: Youke
    },
    {
      path: '/Logined',
      name: 'Logined',
      component: Logined,
      meta: {
        loginCheck: inf => !!inf
      }
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
      meta: {
        loginCheck: inf => !!inf && inf.user.account.userName == 'admin'
      }
    },
    {
      path: '/*',
      redirect: '/Youke'
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.loginCheck) {
    if (to.meta.loginCheck(store.state.userInf)) {
      next()
    } else if (!store.state.userInf) {
      store.commit(SET_WANT_PATH, to.path)
      next('/HelloWorld')
    } else if (from.path == '/') {
      next('/')
    } else {
      next(false)
    }
  } else {
    store.commit(SET_WANT_PATH, null)
    next()
  }
})

export default router
