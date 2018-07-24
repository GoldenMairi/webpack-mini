import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { DEAL_LOAD_NUM, SET_CRT } from '../store/types'

const HelloWorld = () => import('@/components/HelloWorld')
const Youke = () => import('@/components/Youke')
const Logined = () => import('@/components/Logined')
const Admin = () => import('@/components/Admin')

Vue.use(Router)

export const LOGIN_ROUTER = '/HelloWorld'
export const DEFAULT_ROUTER = '/Youke'

let router = new Router({
  routes: [
    {
      path: LOGIN_ROUTER,
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        loginCheck: inf => !inf
      }
    },
    {
      path: DEFAULT_ROUTER,
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
    }, {
      path: '/*',
      redirect: DEFAULT_ROUTER
    }
  ]
})
router.beforeEach((to, from, next) => { // every
  const replace = from.path == LOGIN_ROUTER
  const routersWithCheck = to.matched.filter(r => r.meta.loginCheck)
  if (routersWithCheck.length > 0) {
    if (routersWithCheck.every(r => r.meta.loginCheck(store.state.userInf))) {
      next({replace})
    } else if (!store.state.userInf) { // 没登录
      next({
        replace,
        path: LOGIN_ROUTER,
        query: {redirect: to.fullPath}
      })
    } else if (to.path == LOGIN_ROUTER) { // 去登录页
      next({replace, path: to.query.redirect || '/'})
    } else { // 无or有历史页
      next({replace, path: from.path == '/' ? '/' : false})
    }
  } else {
    next({replace})
  }
})
router.afterEach(to => {
  store.commit(DEAL_LOAD_NUM, 0)
  store.commit(SET_CRT, to.path)
})

export default router
