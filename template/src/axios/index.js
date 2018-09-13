import axios from 'axios'
import qs from 'qs'
import * as apis from './apis'
import { DEAL_LOAD_NUM, LOGIN_OUT } from '../store/types'
import { default as router, LOGIN_ROUTER } from '../router'

// 处理入参格式
const qsFn = params => qs.stringify(params, {
  allowDots: true,
  encode: false
})

// 解决相互引用问题
let store
export const getStore = s => {
  store = s
  return s
}

// axios定制实例
const instance = axios.create({
  baseURL: 'https://api.github.com',
  transformRequest: qsFn,
  paramsSerializer: qsFn,
  timeout: 10000
})

// http request 拦截器
instance.interceptors.request.use(config => {
  if (store.state.userInf.token) {
    config.headers.Authorization = `token ${store.state.userInf.token}`
  }
  return config
}, error => Promise.reject(error))

// http response 拦截器
instance.interceptors.response.use(response => response, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 401 清除token信息并跳转到登录页面
        store.dispatch(LOGIN_OUT)
        // 只有在当前路由不是登录页面才跳转
        router.currentRoute.path !== LOGIN_ROUTER &&
          router.replace({
            path: LOGIN_ROUTER,
            query: { redirect: router.currentRoute.path }
          })
    }
  }
  return Promise.reject(error.response.data)
})

// 接口行为配置项
const apiCfg1 = {
  code: null,
  load: false,
  codeErr: null,
  reject: null,
  param: null
}

export default (apiKey, params, apiCfg3, axiosCfg) => new Promise((resolve, reject) => {
  const crt = store.state.crt
  const [method, url, apiCfg2] = apis[apiKey]
  const apiCfg = {...apiCfg1, ...apiCfg2, ...apiCfg3}
  if (apiCfg.load) store.commit(DEAL_LOAD_NUM, {data: 1})
  if (apiCfg.param) {
    params = {...Object.entries(apiCfg.param).reduce((obj, [key, fn]) => ({...obj, [key]: fn(store.state)}), {}), ...params}
  }
  instance({
    url,
    ...(method == 'get' ? { params } : { data: params, method }),
    ...axiosCfg
  }).then(({ data }) => {
    if (apiCfg.load) store.commit(DEAL_LOAD_NUM, {data: -1, crt})
    if (apiCfg.code) {
      if (data.code == apiCfg.code) {
        resolve(data)
      } else {
        if (apiCfg.load && data.msg) console.warn(data.msg)
        reject(data)
        if (apiCfg.codeErr) apiCfg.codeErr(data)
      }
    } else {
      resolve(data)
    }
  }).catch(error => {
    if (apiCfg.load) store.commit(DEAL_LOAD_NUM, {data: -1, crt})
    reject(error)
    if (apiCfg.reject) apiCfg.reject(error)
  })
})
