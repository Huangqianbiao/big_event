import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '' // 保存 token 字符串
  },
  getters: {
  },
  mutations: {
    // 保存 token
    updateToken (state, val) {
      state.token = val
    }
  },
  actions: {
  },
  modules: {
  }
})
