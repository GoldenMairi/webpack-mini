import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { DEAL_LOAD_NUM, SET_CRT } from '../store/types'

const Dir = {
  template: '<router-view />'
}
const HelloWorld = () => import('@/components/HelloWorld')
const Youke = () => import('@/components/Youke')
const Logined = () => import('@/components/Logined')
const Admin = () => import('@/components/Admin')
const Buttons = () => import('@/components/uiKit/buttons.vue')
const Icons = () => import('@/components/uiKit/icons.vue')
const TableStatic = () => import('@/components/uiKit/table/tableStatic.vue')
const DataTable = () => import('@/components/uiKit/table/dataTable.vue')

Vue.use(Router)

export const LOGIN_ROUTER = '/HelloWorld'
export const DEFAULT_ROUTER = '/Youke'

let router = new Router({
  routes: [
    {
      path: LOGIN_ROUTER,
      component: HelloWorld,
      meta: {
        loginCheck: inf => !inf,
        tag: 'login'
      }
    },
    {
      path: DEFAULT_ROUTER,
      component: Youke,
      meta: {
        icon: 'ic-rest text-success'
      }
    },
    {
      path: '/Logined',
      component: Logined,
      meta: {
        icon: 'ic-computer text-warning',
        badge: {
          state: 'icons',
          theme: 'success'
        },
        loginCheck: inf => !!inf
      }
    },
    {
      path: '/Admin',
      component: Admin,
      meta: {
        icon: 'ic-sitting text-primary',
        loginCheck: inf => !!inf
      }
    }, {
      path: '/UiKit',
      redirect: '/UiKit/Buttons',
      component: Dir,
      meta: {
        icon: 'ic-favor'
      },
      children: [{
        path: 'Buttons',
        component: Buttons
      }, {
        path: 'Icons',
        component: Icons,
        meta: {
          badge: {
            state: 'icons',
            theme: 'primary'
          }
        }
      }, {
        path: 'Table',
        redirect: 'Table/TableStatic',
        component: Dir,
        children: [{
          path: 'TableStatic',
          component: TableStatic
        }, {
          path: 'DataTable',
          component: DataTable
        }]
      }]
    }, {
      path: '/*',
      redirect: DEFAULT_ROUTER
    }
  ]
})
router.beforeEach((to, from, next) => {
  const replace = from.path == LOGIN_ROUTER
  const routersWithCheck = to.matched.filter(r => r.meta.loginCheck)
  if (routersWithCheck.length > 0) {
    if (routersWithCheck.every(r => r.meta.loginCheck(store.state.userInf))) {
      next({ replace })
    } else if (!store.state.userInf) { // 没登录
      next({
        replace,
        path: LOGIN_ROUTER,
        query: { redirect: to.fullPath }
      })
    } else if (to.path == LOGIN_ROUTER) { // 去登录页
      next({ replace, path: to.query.redirect || '/' })
    } else { // 无or有历史页
      next({ replace, path: from.path == '/' ? '/' : false })
    }
  } else {
    next({ replace })
  }
})
router.afterEach(to => {
  store.commit(DEAL_LOAD_NUM, { data: 0 })
  store.commit(SET_CRT, to.path)
})

export default router
