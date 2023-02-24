<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select v-model="q.cate_id" placeholder="请选择分类" size="small">
              <el-option v-for="item in cateList" :label="item.cate_name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px;">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button type="primary" size="small" class="btn-pub" @click="showPubDialogFn">发表文章</el-button>
        <!-- 发表文章的 Dialog 对话框 -->
        <el-dialog title="发表文章" :visible.sync="pubDialogVisible" fullscreen :before-close="handleClose" @closed="onClosedFn">
          <!-- 发表文章的表单 -->
          <el-form :model="pubForm" :rules="pubFormRules" ref="pubFormRef" label-width="100px">
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="pubForm.title" placeholder="请输入文章标题"></el-input>
            </el-form-item>
            <el-form-item label="文章分类" prop="cate_id">
              <el-select v-model="pubForm.cate_id" placeholder="请选择文章分类" style="width:100%">
                <el-option v-for="item in cateList" :label="item.cate_name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
              <!-- 富文本编辑器 -->
              <!-- 使用 v-model 进行双向的数据绑定 -->
              <quill-editor v-model="pubForm.content"></quill-editor>
            </el-form-item>
            <el-form-item label="文章封面" prop="cover_img">
              <!-- 用来显示封面的图片 -->
              <img src="@/assets/images/cover.jpg" alt="" class="cover-img" ref="imgRef" />
              <!-- 文件选择框，默认被隐藏 -->
              <input type="file" style="display: none" accept="image/*" ref="iptFileRef" @change="getCover" />
              <!-- 选择封面的按钮 -->
              <el-button type="text" @click="chooseCover">+ 选择封面</el-button>
            </el-form-item>
            <el-form-itme>
              <el-button type="info" @click="pubFn('草稿')">存为草稿</el-button>
              <el-button type="primary" @click="pubFn('已发布')">发布</el-button>
            </el-form-itme>
          </el-form>
        </el-dialog>
      </div>

      <!-- 文章表格区域 -->

      <!-- 分页区域 -->
    </el-card>
  </div>
</template>
<script>
import { getArticleCateAPI, pubArticleAPI } from '@/api'
import defaultImage from '@/assets/images/cover.jpg'
export default {
  name: 'art-list',
  data () {
    return {
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      // 文章分类
      cateList: [],
      // 发表文章数组
      pubForm: {
        // 文章标题
        title: '',
        // 文章分类id
        cate_id: '',
        // 文章内容
        content: '',
        // 文章封面
        cover_img: null,
        // 文章的发布状态，可选值有两个：草稿、已发布
        state: ''
      },
      pubFormRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题的长度为1-30个字符', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择文章分类', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '文章内容不能为空', trigger: 'blur' }
        ],
        cover_img: [
          { required: true, message: '请设置文章封面', trigger: 'blur' }
        ]
      },
      pubDialogVisible: false
    }
  },
  methods: {
    // 发表文章按钮->点击事件->让添加文章对话框出现
    showPubDialogFn () {
      this.pubDialogVisible = true
    },
    async initCateListFn () {
      const { data: res } = await getArticleCateAPI()
      if (res.code === 0) {
        this.cateList = res.data
      }
    },
    // 对话框关闭前的回调
    async handleClose (done) {
      // 询问用户是否关闭对话框
      const confirm = await this.$confirm('文章尚未保存！是否继续？', '提示', {
        type: 'warning'
      }).catch(err => err)
      // 取消了关闭-阻止住, 什么都不干
      if (confirm === 'cancel') return
      // 确认关闭
      done()
    },
    // 选择封面
    chooseCover () {
      this.$refs.iptFileRef.click()
    },
    // 获取文章封面
    getCover (e) {
      // 获取用户选择的文件列表（伪数组）
      const files = e.target.files
      if (files.length === 0) {
        // 用户未选择图片
        this.pubForm.cover_img = null
        this.$refs.imgRef.setAttribute('src', defaultImage)
      } else {
        // 选择了图片
        // 接口需要 file 类型
        // const fr = new FileReader()
        // fr.readAsDataURL(files[0])
        // fr.onload = e => {
        //   this.pubForm.cover_img = e.target.result
        // }
        this.pubForm.cover_img = files[0]
        const url = URL.createObjectURL(files[0])
        this.$refs.imgRef.setAttribute('src', url)
      }
    },
    // 发布
    pubFn (state) {
      // 设置发布状态
      this.pubForm.state = state
      // 表单预校验
      this.$refs.pubFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请完善文章信息')
        // 判断是否提供了文章封面
        if (!this.pubForm.cover_img) return this.$message.error('请设置文章封面')
        console.log(this.pubForm)
        // 创建 FormData 对象
        const fd = new FormData()
        // 向 FormData 中追加数据
        Object.keys(this.pubForm).forEach((key) => {
          fd.append(key, this.pubForm[key])
        })
        // 上传表单数据
        const { data: res } = await pubArticleAPI(fd)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        // 关闭对话框
        this.pubDialogVisible = false
      })
    },
    // 关闭对话框后的处理函数
    onClosedFn () {
      // 清除关键数据
      this.$refs.pubFormRef.resetFields()
      // 清除文章内容
      this.pubForm.content = ''
      // 恢复封面为默认图片
      this.$refs.imgRef.setAttribute('src', defaultImage)
    }
  },
  created () {
    this.initCateListFn()
  }
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
  // 设置富文本编辑器的默认最小高度
// ::v-deep作用: 穿透选择, 正常style上加了scope的话, 会给.ql-editor[data-v-hash]属性, 只能选择当前页面标签或者组件的根标签
// 如果想要选择组件内的标签(那些标签没有data-v-hash值)所以正常选择选不中, 加了::v-deep空格前置的话, 选择器就会变成如下形式
// [data-v-hash] .ql-editor 这样就能选中组件内的标签的class类名了
::v-deep .ql-editor {
  min-height: 300px;
}
}
</style>
