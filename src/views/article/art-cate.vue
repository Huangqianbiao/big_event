<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCateBtnFn">添加分类</el-button>
        <el-dialog :title="isEdit?'修改文章分类':'添加文章分类'" :visible.sync="dialogVisible" :before-close="handleClose" width="35%" @close="onAddCloseFn" :close-on-click-modal="false">
          <el-form :model="addForm" :rules="addRules" ref="addFormRef" label-width="80px">
            <el-form-item label="分类名称" prop="cate_name">
              <el-input v-model="addForm.cate_name" minlength="1" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="分类别名" prop="cate_alias">
              <el-input v-model="addForm.cate_alias" minlength="1" maxlength="15"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="choose" >{{ isEdit ? '修改' : '添加' }}</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 分类数据表格 -->
      <!-- .sync作用实现双向数据绑定
            会在运行时给所在标签绑定 @update:属性名的事件, 把接收到子组件内传来的值赋予给右侧Vue变量
            组件内$emit('update:visible', true)
            这个update: 是固定的
      -->
      <el-table :data="cateList" style="width: 100%" border stripe>
        <!-- type 是 table-column 内置属性，你告诉他用 index，意思就是第一个单元格用索引值 -->
        <el-table-column type="index" label="序号" width="100px"></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="updateBtnFn(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="delFn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getArticleCateAPI, addArticleCateAPI, updateArticleCateAPI, deleteArticleAPI } from '@/api'
export default {
  name: 'art-cate',
  data () {
    return {
      // 文章分类数组
      cateList: [],
      // 控制‘添加分类’对话框是否显示
      dialogVisible: false,
      addForm: { // 添加表单的数据对象
        cate_name: '',
        cate_alias: ''
      },
      addRules: { // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      },
      editId: '',
      isEdit: false
    }
  },
  created () {
    this.initCateFn()
  },
  methods: {
    // 初始化文章分类列表
    async initCateFn () {
      const { data: res } = await getArticleCateAPI()
      this.cateList = res.data
    },
    // 判断为修改还是添加分类
    choose () {
      this.isEdit ? this.updateFn() : this.addFn()
    },
    // 添加文章分类
    addFn () {
      // 校验表单
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return false
        // 调用接口
        const { data: res } = await addArticleCateAPI(this.addForm)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success('添加成功！')
        // 添加完毕后自动更新文章分类
        this.initCateFn()
        // 隐藏对话框
        this.dialogVisible = false
      })
    },
    // 修改文章分类
    updateFn () {
      // 校验表单
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return false
        // 调用接口
        const { data: res } = await updateArticleCateAPI(this.editId, this.addForm)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success('修改成功！')
        // 修改完毕后自动更新文章分类
        this.initCateFn()
        // 隐藏对话框
        this.dialogVisible = false
      })
    },
    // 删除文章分类
    async delFn (obj) {
      // 调用接口
      const { data: res } = await deleteArticleAPI(obj.id)
      if (res.code !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      // 删除成功后自动更新文章分类
      this.initCateFn()
    },
    // 关闭对话框确认
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 重置表单内容
    onAddCloseFn () {
      this.$refs.addFormRef.resetFields()
    },
    // 修改-按钮点击事件
    updateBtnFn (obj) {
      this.editId = obj.id // 保存要编辑的文章分类ID
      this.isEdit = true // 设置编辑状态
      this.dialogVisible = true // 让对话框显示
      // 设置数据回显
      this.$nextTick(() => {
        // 先让对话框出现, 它绑定空值的对象, 才能resetFields清空用初始空值
        this.addForm.cate_name = obj.cate_name
        this.addForm.cate_alias = obj.cate_alias
      })
    },
    addCateBtnFn () {
      this.dialogVisible = true // 让对话框出现
      this.editId = '' // 编辑的文章分类id设置无
      this.isEdit = false // 编辑的状态关闭
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
