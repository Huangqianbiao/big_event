<!-- <template>
<el-container>
  <el-header>
    <img src="@/assets/images/logo.png" alt="">
    <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-submenu index="1">
    <template slot="title">
      <img src="@/assets/images/avatar.jpg" alt="">
      <span>个人中心</span>
    </template>
    <el-menu-item index="2-1">基本资料</el-menu-item>
    <el-menu-item index="2-2">更换头像</el-menu-item>
    <el-menu-item index="2-3">重置密码</el-menu-item>
  </el-submenu>
</el-menu>
</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'my-home'
}
</script>

<style>
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
.el-container {
    margin-bottom: 40px;
  }
</style> -->
<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="@/assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img src="@/assets/images/avatar.jpg" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-camera"></i>更换头像</el-menu-item>
          <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
        </el-submenu>
        <el-menu-item index="2"><i class="el-icon-switch-button"></i>
          <el-button type="text"  @click="quitFn">退出</el-button>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 左侧边栏 --- 用户信息 -->
    <el-aside width="200px">
    <div class="user-box">
        <img :src="user_pic" alt="" v-if="user_pic" />
        <img src="@/assets/images/avatar.jpg" alt="" v-else />
        <span>欢迎 {{ nickname || username }}</span>
    </div>
    <!-- 左侧边栏 --- 菜单 -->
    <el-menu
      default-active="/home"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      unique-opened
      background-color="#23262E"
      text-color="#fff"
      active-text-color="#409EFF">
      <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
      </el-menu-item>
      <el-submenu index="/article">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item index="/classification">
          <i class="el-icon-s-data"></i>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/list">
          <i class="el-icon-document-copy"></i>
          <span>文章列表</span>
        </el-menu-item>
        <!-- <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group> -->
      </el-submenu>
      <el-submenu index="/user">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>个人中心</span>
        </template>
        <el-menu-item index="/user1">
          <i class="el-icon-s-operation"></i>
          <span>基本资料</span>
        </el-menu-item>
        <el-menu-item index="/user2">
          <i class="el-icon-camera"></i>
          <span>更换头像</span>
        </el-menu-item>
        <el-menu-item index="/user3">
          <i class="el-icon-key"></i>
          <span>重置密码</span>
        </el-menu-item>
        <!-- <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group> -->
      </el-submenu>
    </el-menu>
    </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
// ！！！在组件标签上绑定的所有事件(包括原生事件的名字 click, input 等等)，都是自定义事件，都需要组件内$emit来触发
// 若组件不支持这个原生事件名字，则可用 @事件名.native = "methods 里的方法名"
export default {
  name: 'my-home',
  methods: {
    // 退出登录 -> 点击事件
    quitFn () {
      // 为了防止用户误触，增加了确认框
      this.$confirm('此操作将退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认
        // 清除 vuex
        this.$store.commit('updateToken', '')
        this.$store.commit('updateUserInfo', {})
        // 强制跳转登录
        this.$router.push('/login')
      }).catch(() => {
        // 取消
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
    // 获取用户资料 -> 点击事件
  },
  computed: {
    ...mapGetters(['nickname', 'username', 'user_pic'])
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #F2F2F2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
</style>
