import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { DEAL_LOAD_NUM, SET_CRT } from '../store/types'

// 目录组件
const Dir = {
  template: '<router-view />'
}

// 懒加载方式引入组件
const HelloWorld = () => import('@/components/HelloWorld')
const Youke = () => import('@/components/Youke')
const Logined = () => import('@/components/Logined')
const Admin = () => import('@/components/Admin')
const Buttons = () => import('@/components/uiKit/buttons.vue')
const Icons = () => import('@/components/uiKit/icons.vue')
const TableStatic = () => import('@/components/uiKit/table/tableStatic.vue')
const DataTable = () => import('@/components/uiKit/table/dataTable.vue')

Vue.use(Router)

// 设置登陆页、首页路由名称
export const LOGIN_ROUTER = '/HelloWorld'
export const DEFAULT_ROUTER = '/Youke'

const router = new Router({
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
        icon: 'ic-rest text-success',
        name: '游客'
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
        badge: {
          state: 'icons',
          theme: 'success'
        },
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
  const replace = from.path === LOGIN_ROUTER
  const routersWithCheck = to.matched.filter(r => r.meta.loginCheck)
  // 校验通过=>跳转
  if (routersWithCheck.length === 0 || routersWithCheck.every(r => r.meta.loginCheck(store.state.userInf))) { return next({ replace }) }
  // 需要登录=>登录（跳转的页面只能是非登陆页，所以登录后要重定向）
  if (!store.state.userInf) {
    return next({
      replace,
      path: LOGIN_ROUTER,
      query: { redirect: to.fullPath }
    })
  }
  // 重复登录=>跳转到登录URL后的重定向页或首页
  if (to.path == LOGIN_ROUTER) return next({ replace, path: to.query.redirect || '/' })
  // 权限不够=>原先有页面则不跳，否则跳首页
  next({ replace, path: from.path == '/' ? '/' : false })
})
router.afterEach(to => {
  store.commit(DEAL_LOAD_NUM, { data: 0 })
  store.commit(SET_CRT, to.path)
})

export default router
