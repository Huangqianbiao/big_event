<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="@/assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu
        :default-active="$route.path"
        router
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img :src="user_pic||'@/assets/images/avatar.jpg'" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item v-for="item in menus[2].children" :key="item" :index="item.indexPath" >
            <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="2"><i class="el-icon-switch-button"></i>
          <el-button type="text"  @click="quitFn"><span>退出</span></el-button>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 左侧边栏 --- 用户信息 -->
    <el-aside width="200px">
    <div class="user-box">
        <img :src="user_pic" alt="" v-if="user_pic" />
        <img src="@/assets/images/avatar.jpg" alt="" v-else />
        <span>{{ nickname || username }}，欢迎你</span>
    </div>
    <!-- 左侧边栏 --- 菜单 -->
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      unique-opened
      router
      background-color="#23262E"
      text-color="#fff"
      active-text-color="#409EFF">
      <!-- template 不会被渲染，配合 vue 使用 -->
      <template v-for="item in menus">
        <el-menu-item :key="item.indexPath" :index="item.indexPath" v-if="!item.children">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
      </el-menu-item>
      <el-submenu :key="item.indexPath1" :index="item.indexPath" v-else>
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item :key="subItem.indexPath" v-for="subItem in item.children" :index="subItem.indexPath" >
          <i :class="subItem.icon"></i>
          <span>{{ subItem.title }}</span>
        </el-menu-item>
      </el-submenu>
      </template>
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
import { getMenusListAPI } from '@/api'
// ！！！在组件标签上绑定的所有事件(包括原生事件的名字 click, input 等等)，都是自定义事件，都需要组件内$emit来触发
// 若组件不支持这个原生事件名字，则可用 @事件名.native = "methods 里的方法名"
export default {
  name: 'my-layout',
  data () {
    return {
      menus: [] // 侧边栏数据
    }
  },
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
    },
    async getMenusListFn () {
      const res = await getMenusListAPI()
      // console.log(res)
      this.menus = res.data.data
    }

  },
  created () {
    this.getMenusListFn()
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
