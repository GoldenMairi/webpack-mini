import axios from 'axios'
import qs from 'qs'
import * as apis from './apis'
import { DEAL_LOAD_NUM, LOGIN_OUT } from '../store/types'
import { default as router, LOGIN_ROUTER } from '../router'

const qsFn = params => qs.stringify(params, {
  allowDots: true,
  encode: false
})

let store
export const getStore = s => {
  store = s
  return s
}

// axios实例
var instance = axios.create({
  baseURL: '/efence-service/',
  transformRequest: qsFn,
  paramsSerializer: qsFn,
  timeout: 10000,
  validateStatus: status => status >= 200
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  if (typeof response.data == 'string') {
    store.dispatch(LOGIN_OUT)
    router.replace(LOGIN_ROUTER)
  }
  return response
}, error => Promise.reject(error.response.data))

// 接口行为配置项
const apiCfg1 = {
  code: 200,
  load: false,
  codeErr: null,
  reject: null,
  param: null
}

export default (apiKey, params, apiCfg3 = {}, axiosCfg = {}) => new Promise((resolve, reject) => {
  const crt = store.state.crt
  const [method, url, apiCfg2 = {}] = apis[apiKey]
  const apiCfg = Object.assign({}, apiCfg1, apiCfg2, apiCfg3)
  if (apiCfg.load) store.commit(DEAL_LOAD_NUM, {data: 1})
  if (apiCfg.param) {
    params = {...Object.entries(apiCfg.param).reduce((obj, [key, fn]) => {
      obj[key] = fn(store.state)
      return obj
    }, {}),
    ...params}
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
  }).catch(err => {
    if (apiCfg.load) store.commit(DEAL_LOAD_NUM, {data: -1, crt})
    reject(err)
    if (apiCfg.reject) apiCfg.reject(err)
  })
})
