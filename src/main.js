import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/elementUI/index' // 让 elementUI 注册的代码参与打包，才能在页面上运行并注册组件
import '@/assets/global.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
