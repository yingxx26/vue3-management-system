<template>
  <div class="user-header">
    <el-button type="primary"
               @click="handleAdd">新增+</el-button>
    <el-dialog v-model="dialogVisible"
               :title="title==='add'?'新增用户':'编辑用户'"
               width="35%"
               :before-close="handleClose">
      <el-form :inline="true"
               ref="userDataFrom"
               :model="formInline">
        <el-row>
          <el-col :span=12>
            <el-form-item label="姓名"
                          prop="name"
                          :rules="[{required :true,message:'姓名是必填选项'}]">
              <el-input v-model="formInline.name"
                        placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="年龄"
                          prop="age"
                          :rules="[{required :true,message:'年龄是必填选项'},
                          {type:'number',message:'年龄必须是数字格式'}]">
              <el-input v-model.number="formInline.age"
                        placeholder="请输入年龄" />
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="性别"
                          prop="sex">
              <el-select v-model="formInline.sex"
                         placeholder="请输入性别">
                <el-option label="男"
                           value="1" />
                <el-option label="女"
                           value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="出生日期"
                          :rules="[{required :true,message:'出生日期是必填选项'}]"
                          prop="birth">
              <!-- 添加value-format属性进行日期格式化 -->
              <el-date-picker v-model="formInline.birth"
                              type="date"
                              label="出生日期"
                              placeholder="请选择日期"
                              style="width:100%"
                              value-format="YYYY-MM-DD" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="地址"
                      prop="addr"
                      :rules="[{required :true,message:'地址是必填选项'}]">
          <el-input v-model="formInline.addr"
                    placeholder="请输入地址" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary"
                     @click="onsubmit(formInline)">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-form :inline="true"
             :model="formInline"
             @keyup.enter="handleSearch">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword"
                  placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="list"
              style="width: 100%"
              height="500px">
      <el-table-column fixed
                       v-for="(table) in Tablelist"
                       :key=table.prop
                       :prop="table.prop"
                       :label="table.label"
                       :width="table.width ? table.width : 125" />
      <el-table-column fixed="right"
                       label="操作"
                       min-width="180">
        <template #default='scope'>
          <el-button type="primary"
                     @click="handleEdit(scope.row)"
                     size="small">编辑</el-button>
          <el-button size="small"
                     type="danger"
                     @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination small
                   background
                   layout="prev, pager, next"
                   :total="config.total"
                   class="mt-4 pager"
                   @current-change=changeCurPage />
  </div>
</template>

<script>

import { getCurrentInstance, onMounted, reactive, ref } from 'vue'

export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const list = ref([])
    const config = reactive({
      total: 1,
      page: 1,
      name: ""
    })
    //表头信息
    const Tablelist = reactive([
      {
        prop: 'name',
        label: "姓名"
      },
      {
        prop: 'age',
        label: "年龄"
      },
      {
        prop: 'sexLabel',
        label: "性别"
      }, {
        prop: 'name',
        label: "姓名"
      }, {
        prop: 'birth',
        label: "出生日期",
        width: 200
      },
      {
        prop: 'addr',
        label: "地址",
        width: 320
      },
    ])
    //获取用户信息
    const UserData = async (config) => {
      let res = await proxy.$api.getUserData(config)
      config.total = res.count
      // console.log(res, config.total)
      list.value = res.list.map((item) => {
        item.sexLabel = item.sex == 1 ? '男' : '女'//相当于给服务器原始数据新加了属性sexLabel
        return item
      })
    }
    //获取当前页码数
    const changeCurPage = (page) => {
      config.page = page
      UserData(config)
    }
    /* 定义新增用户弹窗参数 */
    const formInline = reactive({
      keyword: "",//用户搜索输入的关键字
      name: "",//新增用户姓名
      age: "",//新增用户年龄
      birth: '',//新增用户出生日期
      addr: "",//新增用户的地址
      sex: "",//新增用户性别
    })
    //将用户搜索的名称，存储在config中，发送给后端返回结果
    const handleSearch = () => {
      config.name = formInline.keyword
      UserData(config)
    }
    //控制弹窗的显示与关闭
    const dialogVisible = ref(false)
    const title = ref('add')
    /* 点击新增按钮 */
    const handleAdd = () => {
      title.value = 'add'
      dialogVisible.value = true
    }
    /* 关闭弹窗 */
    const handleClose = (done) => {
      ElMessageBox.confirm('你确定要关闭这个弹窗吗')
        .then(() => {
          proxy.$refs.userDataFrom.resetFields()
          done()
        })
        .catch(() => {
          // catch error
        })
    }
    /* 提交用户的信息 */
    const onsubmit = (formInline) => {
      proxy.$refs.userDataFrom.validate(async (validate) => {//点击提交前进行表单验证，通过后再提交数据
        if (validate) {
          if (title.value == 'add') {//代表是新增用户提交
            let res = await proxy.$api.addUserData(formInline)
            if (res) {
              proxy.$refs.userDataFrom.resetFields() //重置表单内容
              dialogVisible.value = false //关闭弹窗
              UserData(config) //重新获用户信息
            }
          } else {//代表是修改用户提交
            formInline.sex == '女' ? formInline.sex = '0' : formInline.sex ='1'
            let res = await proxy.$api.updateUserData(formInline)
            if (res) {
              proxy.$refs.userDataFrom.resetFields()
              dialogVisible.value = false
              UserData(config)
            }
          }
        } else { //验证失败给予提示
          ElMessage({
            ShowClose: true,
            type: "error",
            message: "请输入正确信息"
          })
        }

      })
    }
    /* 取消提交 */
    const handleCancel = () => {
        proxy.$refs.userDataFrom.resetFields()
      dialogVisible.value = false
    }
    /* scope.row能获取当前行的数据 */
    const handleEdit = (row) => {
      // console.log(row)
      title.value = 'Edit'
      dialogVisible.value = true
      row.sex == 1 ? row.sex = '男' : row.sex = '女'
      /* nextTick等待DOM渲染完后再进行赋值，否则此时再点击新增用户表单仍然会保留上一次的值 */
      /* 这里目前不理解为什么会影响 */
      proxy.$nextTick(() => {
        Object.assign(formInline, row)
      })
    }
    /* 删除用户 */
    const handleDelete = (row) => {
      ElMessageBox.confirm('你确定要删除吗')
        .then(async () => {
          console.log(row.id)
          let res = await proxy.$api.deleteUserData(row)
          ElMessage({
            ShowClose: true,
            type: "success",
            message: "删除成功"
          })
          UserData(config)
          done()
        })
        .catch(() => {
          // catch error
        })

    }
    onMounted(() => {
      UserData(config)
    })
    return {
      list,
      Tablelist,
      config,
      changeCurPage,
      handleSearch,
      formInline,
      dialogVisible,
      handleClose,
      onsubmit,
      handleCancel,
      handleEdit,
      handleAdd,
      title,
      handleDelete
    }
  }
}
</script>

<style lang = 'less' scoped>
.table {
  position: relative;
  height: 520px;
  .pager {
    position: absolute;
    bottom: -20px;
    right: 0;
  }
}
.user-header {
  display: flex;
  justify-content: space-between;
}
</style>