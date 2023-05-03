<template>
  <el-aside :width="status ? '64px':'180px'">
    <el-menu class="el-menu-vertical-demo"
             background-color="#545c64"
             text-color="#fff"
             :collapse="status"
             :collapse-transition="false">
      <h3 v-show="!status">后台管理</h3>
      <h3 v-show="status">后台</h3>
      <!--   children是个方法记得执行children() -->
      <el-menu-item :index="item.path  + ''"
                    v-for=" item in notChildren()"
                    :key="item.path"
                    @click="pushRouter(item)">
        <component :is="item.icon"
                   class="icons"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu :index="item.path+ ''"
                   v-for=" item in hasChildren()"
                   :key="item.path">
        <template #title>
          <component :is="item.icon"
                     class="icons"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="subItem.path + ''"
                        v-for="(subItem,subIndex) in item.children"
                        :key="subIndex"
                        @click="pushRouter(subItem)">
            <component :is="subItem.icon"
                       class="icons"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import { useShrinkMenu, useSelectMenu,useGetMenu } from '../store/Store.js'
import { computed } from 'vue'
import { useRouter, } from 'vue-router'
export default {
  setup () {
/*     const list = [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      },
      {
        path: '/mall',
        name: 'mall',
        label: '商品管理',
        icon: 'video-play',
        url: 'MallManage/MallManage'
      },
      {
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'user',
        url: 'UserManage/UserManage'
      },
      {
        label: '其他',
        icon: 'location',
        path: "other",
        children: [
          {
            path: '/page1',
            name: 'page1',
            label: '页面1',
            icon: 'setting',
            url: 'Other/PageOne'
          },
          {
            path: '/page2',
            name: 'page2',
            label: '页面2',
            icon: 'setting',
            url: 'Other/PageTwo'
          }
        ]
      }
    ] */
    const useMenu =useGetMenu() 
    /* 动态获取菜单栏数据进行渲染 */
    const notChildren = () => {
      return useMenu.menu.filter((item) => !item.children)
    }
    const hasChildren = () => {
      return  useMenu.menu.filter((item) => item.children)
    }
    //向action中useShrinkMenu函数派发请求
    const change = useShrinkMenu()
    //计算属性获取state里面的shrink
    const status = computed(() => change.shrink)
  
    //定义跳转路由
    const router = useRouter()
    //面包屑
    const breadMenu =useSelectMenu()
    const pushRouter = (item) => {
      router.push({ path:item.path })
      breadMenu.SelectMenu(item)
      // console.log( breadMenu.tabList)
    }

    return {
      notChildren,
      hasChildren,
      status,
      pushRouter
    }
  }
}
</script>

<style lang="less" scoped>
.icons {
  height: 18px;
  width: 18px;
}
.el-menu {
  border-right: none;
  h3 {
    line-height: 64px;
    text-align: center;
    color: #fff;
  }
}
</style>