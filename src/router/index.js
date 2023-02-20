import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

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

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token && !store.state.userInfo.username) {
    // 当本地 token 值存在，才请求用户信息；并且没有用户信息，为了防止登录成功后跳转路由重复请求
    store.dispatch('getUserInfoActions')
  }
  next()
})

export default router

// 退出登录或重新登录，只走相关组件代码（异步 dom 切换，不会导致所有代码重新执行，App.vue不重新加载）
// 解决方法：
// 1. 可以在登录页面，登录成功后，再发请求拿到用户信息
// 2. 可以在前置路由守卫中，写（路由跳转的时候，判断+获取）
