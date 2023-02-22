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
    path: '/', // 默认打开直接看到布局页
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
    // 侧边栏导航，点击切换路由地址，路由地址靠数据请求回来铺设上去
    // 所以路由规则要配合保持一致
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'art-cate',
        component: () => import('@/views/article/art-cate')
      },
      {
        path: 'art-list',
        component: () => import('@/views/article/art-list')
      },
      {
        path: 'user-info',
        component: () => import('@/views/user/user-info')
      },
      {
        path: 'user-avatar',
        component: () => import('@/views/user/user-avatar')
      },
      {
        path: 'user-pwd',
        component: () => import('@/views/user/user-pwd')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 定义白名单
const whiteList = ['/login', '/reg']

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  // console.log(`to.path:${to.path},from.path:${from.path},next:${next}}`)
  const token = store.state.token
  if (token) {
    // 如果有 token，证明已登录
    if (!store.state.userInfo.username) {
      // 有token但是没有用户信息, 才去请求用户信息保存到vuex里
      // 调用actions里方法请求数据
      store.dispatch('getUserInfoActions')
    }
    // 下次切换页面vuex里有用户信息数据就不会重复请求用户信息
    next()
  } else {
    // 如果跳转页面不在白名单内，则强制跳转登录界面
    if (!whiteList.includes(to.path)) {
      next('/login')
    } else { // 否则放行
      next()
    }
  }
})

// 防止未登录直接进入后台管理系统
// router.beforeEach((to, from, next) => {
//   const token = store.state.token
//   if (!token) {
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router

// 退出登录或重新登录，只走相关组件代码（异步 dom 切换，不会导致所有代码重新执行，App.vue不重新加载）
// 解决方法：
// 1. 可以在登录页面，登录成功后，再发请求拿到用户信息
// 2. 可以在前置路由守卫中，写（路由跳转的时候，判断+获取）
