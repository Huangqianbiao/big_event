// 封装的是具体的接口请求方法
// 注意: 每个方法只负责请求一个 URL 地址
import request from '@/utils/request'

// 导出接口方法，为了在逻辑页面引入后调用
export const registerAPI = (data) => {
  // Promise 对象（内部包含原生 ajax 请求）
  // 返回该 Promise 对象，到逻辑页面进行处理
  return request({
    url: '/api/reg',
    method: 'POST',
    data: data
  })
}
