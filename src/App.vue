<template>
    <router-view></router-view>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
  // ...mapActions(['getUserInfoActions']),
  created () {
    // 调用 vuex 中 action 的方法
    this.$store.dispatch('getUserInfoActions')
  }
}
</script>

<style scoped>
</style>
