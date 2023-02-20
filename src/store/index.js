import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', // 1. 保存 token 字符串
    userInfo: {} // 保存用户信息
  },
  getters: {
    // 写法一
    // nickname(state) {
    //   return state.userInfo.nickname
    // }
    // 写法二
    // nickname: (state) => {
    //   return state.userInfo.nickname
    // }
    // 写法三
    nickname: state => state.userInfo.nickname,
    username: state => state.userInfo.username,
    user_pic: state => state.userInfo.user_pic
  },
  mutations: {
    // 2. 更新 token 的 mutation 函数
    updateToken (state, val) {
      state.token = val
    },
    updateUserInfo (state, val) {
      state.userInfo = val
    }
  },
  actions: {
    // 请求 -> 用户信息
    async getUserInfoActions (store) {
      const res = await getUserInfoAPI()
      console.log(res)
      store.commit('updateUserInfo', res.data.data)
    }
  },
  modules: {
  },
  // 3. 配置 vuex 的插件
  plugins: [createPersistedState()]
})

// vuex 默认保存在内存中，刷新会初始化所有值（无法做到持久化存储）
