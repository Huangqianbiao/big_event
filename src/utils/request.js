// 基于 axios 封装，网络请求函数
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

export const baseURL = 'http://big-event-vue-api-t.itheima.net'

// axios.create() 创建一个带配置项的自定义 axios 函数
// myaxios 请求的时候，地址 baseURL + url, 然后去请求后台
const myAxios = axios.create({
  baseURL
})

// 白名单: 不需要携带token的api地址
const whiteAPIList = ['/api/reg', '/api/login']

// 定义请求拦截器
myAxios.interceptors.request.use(function (config) {
  // 若白名单内不包含 config 中的接口地址，则为请求头挂载 Authorization 字段
  if (!whiteAPIList.includes(config.url)) {
    config.headers.Authorization = store.state.token
  }
  // console.log(config)
  // 在请求前会触发一次
  // 返回 axios 内源码，config 配置对象（要请求后台的参数都在这个对象上）
  return config
}, function (error) {
  // 请求发起前的代码，如果异常保存，会直接进入这里
  // 返回一个拒绝状态的 Promise 对象（axios 留在原地的 Promise 对象状态就为失败结果为 error 变量值）
  // 此函数类似于 catch 函数里的 return
  // 1. return 非 Promise 对象，会作为成功的结果，返回给下一个 Promise 对象（axios 留在原地）
  // 2. return Promise 对象，这个 Promise 对象状态（失败），返回给下一个 Promise 对象
  return Promise.reject(error)
  /**
   * 等价于
   * return new Promise((resolve, reject) => {
   *  reject(error)
   * })
   */
})

// 定义响应拦截器
myAxios.interceptors.response.use(function (response) {
  // 响应状态码为 2xx 或 3xx 时触发成功的回调，形参中的 response 是“成功的结果”
  return response
}, function (error) {
  // console.log(error.response.status)
  // 响应状态码不是 2xx 时触发失败的回调，形参中的 error 是“失败的结果”
  if (error.response.status === 401) {
    // token 过期，清除 vuex 中的一切信息
    Message.error('身份信息过期，请重新登录！')
    store.commit('updateToken', '')
    store.commit('updateUserInfo', {})
    // 跳转登录界面
    router.push('/login')
  }
  return Promise.reject(error)
}
)

// 导出 axios 自定义函数
export default myAxios
