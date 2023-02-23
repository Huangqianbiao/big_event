<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 用来展示用户的头像 -->
      <div class="preview">
        <img class="user_img" v-if="!avatar" src="@/assets/images/avatar.jpg" alt="">
        <img class="user_img" v-else :src="this.avatar" alt="">
      </div>
      <!-- 按钮区域 -->
      <div class="btn-box">
        <!-- 从本地选择图片 -->
        <input type="file" style="display:none" ref="upImg" accept="image/*" @change="getImg">
        <el-button type="primary" class="el-icon-plus" @click="chooseImg">选择图片</el-button>
        <el-button type="success" class="el-icon-upload" :disabled="avatar===''" @click="updateImg">上传头像</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { updateAvatarAPI } from '@/api'
export default {
  name: 'user-avatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    // 选择图片->点击事件->让选择框出现
    chooseImg () {
      // 模拟文件上传的点击事件
      this.$refs.upImg.click()
    },
    getImg (e) {
      // 获取用户选择的文件列表（伪数组）
      const files = e.target.files
      if (files.length === 0) {
        // 没有选择图片
        this.avatar = ''
      } else {
        // 选择了图片
        // 方法一：base64（字符串类型）
        // 1. 创建 FileReader 对象
        const fr = new FileReader()
        // 2. 使用 readAsDataURL 方法读取文件内容
        fr.readAsDataURL(files[0])
        // 3. 监听 fr 的 onload 事件
        fr.onload = e => {
          // console.log(e.target.result)
          // 4. 通过 e.target.result 获取到读取的结果，值是字符串（base64 格式的字符串）
          this.avatar = e.target.result
        }
        // 方法二：使用URL.createObjURL()来转换文件变成图片地址(blob类型)
        // this.avatar = URL.createObjectURL(files[0])
      }
    },
    // 上传头像
    async updateImg () {
      //  调用接口, 传递给后台并根据返回结果给用户提示
      const { data: res } = await updateAvatarAPI(this.avatar)
      if (res.code !== 0) {
        this.$message.success('上传失败！')
      } else {
        this.$message.success(res.message)
        this.$store.dispatch('getUserInfoActions')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
.user_img{
    width: 350px;
    height: 350px;
}
</style>
