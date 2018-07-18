import axios from 'axios'
import qs from 'qs'
import * as apis from './apis'
const qsFn = params => qs.stringify(params, {
  allowDots: true,
  encode: false
})

// axios实例
var instance = axios.create({
  baseURL: '/efence-service/',
  transformRequest: qsFn,
  paramsSerializer: qsFn,
  timeout: 10000,
  validateStatus: status => status >= 200
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  if (typeof response.data == 'string') {
    console.log('未登录')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

// 接口行为配置项
const apiCfg1 = {
  code: 200,
  load: false,
  codeErr: null,
  reject: null
}

export default (apiKey, params, apiCfg3 = {}, axiosCfg = {}) => new Promise((resolve, reject) => {
  const [method, url, apiCfg2 = {}] = apis[apiKey]
  const apiCfg = Object.assign({}, apiCfg1, apiCfg2, apiCfg3)
  if (apiCfg.load) console.log('loading...')
  instance({
    url,
    ...(method == 'get' ? { params } : { data: params, method }),
    ...axiosCfg
  }).then(({ data }) => {
    if (apiCfg.load) console.log('close-loading...')
    if (apiCfg.code) {
      if (data.code == apiCfg.code) {
        resolve(data)
      } else {
        if (apiCfg.load && data.msg) console.log(data.msg)
        if (apiCfg.codeErr) apiCfg.codeErr(data)
      }
    } else {
      resolve(data)
    }
  }).catch(err => {
    if (apiCfg.load) console.log('close-loading...')
    reject(err)
    if (apiCfg.reject) apiCfg.reject(err)
  })
})