<template>
  <div class="login-container">
  <!-- 登录盒子 -->
  <div class="login-box">
      <!-- 标题盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
        <el-form ref="loginForm" :model="form" :rules="rulesObj">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-login" type="primary" @click="loginFn">登录</el-button>
            <el-link type="info" @click="$router.push('/reg')">注册</el-link>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  name: 'my-login',
  data () {
    return {
      form: { // 登录表单的数据对象
        username: '', // 用户名
        password: '' // 密码
      },
      rulesObj: { // 登录表单的验证规则对象
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10位的大小写字母数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['updateToken']),
    // 登录 -> 点击事件
    loginFn () {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return false
        // 1. 调用登录接口
        // 解构赋值
        const { data: res } = await loginAPI(this.form)
        // console.log(res)
        // 2. 登录失败，提示用户
        if (res.code !== 0) return this.$message.error('请检查用户名或者密码是否正确！')
        // 3. 登录成功，提示用户
        this.$message.success('登录成功，正在跳转界面……')
        // 提交给 mutations 把 token 保存到 vuex 中
        this.updateToken(res.token)
        // this.$store.commit('updateToken', res.token)
        // 4. 进入后台管理系统
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .login-box {
    width: 400px;
    height: 275px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') center no-repeat;
    }

    .btn-login {
      width: 100%;
    }
  }
}
</style>
