<template>
  <div>
    <el-button>123</el-button>
  </div>
</template>

<script>
import { registerAPI } from '@/api/channel'
export default {
  async created () {
    const res = await registerAPI()
    console.log(res)
  }
}
</script>

<style scoped>
</style>
