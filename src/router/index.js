import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // { // 重定向到登录界面
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    path: '/reg',
    component: () => import('@/views/regitster')
    // webpack 提供 import 函数来路由懒加载导入组件
    // 什么是懒加载？
    // 当页面路由路径切换到 /reg，才去加载对应组件代码
    // 好处：让首页加载文件体积更新，打开更快
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/home')
  }
]

const router = new VueRouter({
  routes
})

export default router
