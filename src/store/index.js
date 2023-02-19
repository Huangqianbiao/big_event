import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 1. 保存 token 字符串
    token: ''
  },
  getters: {
  },
  mutations: {
    // 2. 更新 token 的 mutation 函数
    updateToken (state, val) {
      state.token = val
    }
  },
  actions: {
  },
  modules: {
  },
  // 3. 配置为 vuex 的插件
  plugins: [createPersistedState()]
})

// vuex 默认保存在内存中，刷新会初始化所有值（无法做到持久化存储）
