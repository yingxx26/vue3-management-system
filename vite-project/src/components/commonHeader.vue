<template>
  <el-header>
    <div class='l-content'>
      <el-button @click="changeShark">
        <el-icon size="size"
                 color="color">
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/"
                     class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="cur.path"
                            v-if="cur.path  ">{{ cur.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='r-content'>
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="header"
               :src="getImgUrl('header')">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="outLogin">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { computed, reactive } from 'vue'
import { useShrinkMenu, useSelectMenu, useGetMenu } from '../store/Store.js'
import { useRouter } from 'vue-router'
export default {

  setup () {
    const getImgUrl = (user) => {
      /* 动态引入图片 import.meta.url为当前组件的路径 */
      /* 返回的是http://127.0.0.1:5173/src/assets/images/header.jpg */
      return new URL(`../assets/images/${user}.jpg`, import.meta.url).href
    }
    const change = useShrinkMenu()
    /* 菜单栏的显示与收缩 */
    const changeShark = () => {
      change.changeShrink()
    }
    const SelectMenu = useSelectMenu()

    // console.log(SelectMenu.currentPath)
    const cur = computed(() => SelectMenu.currentPath)
    const router = useRouter()
    const removeMenu = useGetMenu()
    const outLogin = () => {
      removeMenu.outLogin()//发送退出登录的请求，清除本地存储
      router.push('/login')
    }

    return {
      getImgUrl,
      changeShark,
      cur,
      outLogin
    }
  }
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
}
.r-content {
  .header {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  h3 {
    color: #fff;
  }
}
.bread :deep(span) {
  color: #fff !important;
  cursor: pointer;
}
</style>