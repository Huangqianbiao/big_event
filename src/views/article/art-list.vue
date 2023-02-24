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
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
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
        <el-dialog title="发表文章" :visible.sync="pubDialogVisible" fullscreen :before-close="handleClose">
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
          </el-form>
        </el-dialog>
      </div>

      <!-- 文章表格区域 -->

      <!-- 分页区域 -->
    </el-card>
  </div>
</template>
<script>
import { getArticleCateAPI } from '@/api'
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
        title: '',
        cate_id: ''
      },
      pubFormRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题的长度为1-30个字符', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择文章分类', trigger: 'blur' }
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
      console.log(res.data)
      if (res.code === 0) {
        this.cateList = res.data
      }
    },
    // 对话框关闭前的回调
    async handleClose (done) {
      // 询问用户是否关闭对话框
      const confirm = await this.$confirm('此操作可能会丢失重要内容！是否继续？', '提示', {
        type: 'warning'
      }).catch(err => err)
      // 取消了关闭-阻止住, 什么都不干
      if (confirm === 'cancel') return
      // 确认关闭
      done()
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
}
</style>
