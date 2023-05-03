import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pinia from './store'
import '@/Mock/index.js'
import api from '@/api'
import {useGetMenu} from '@/store/Store.js'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$api = api
app.use(pinia)
const  getMenu = useGetMenu()
//动态添加路由
getMenu.AddMenu(router)
const Checkpath = ((path)=>{
  /* 获取当前全部的动态路由进行遍历，item.path == path 代表有权限返回true */
  const flag = router.getRoutes().filter((item)=>item.path == path ).length > 0 ? true : false
  // console.log( path,getMenu.menu,router.getRoutes().filter((item)=>item.path == path),router.getRoutes(),router ) 
  return flag
})

//路由守卫
router.beforeEach((to,from,next)=>{
  getMenu.getCookies()
 const token = getMenu.token
if(to.path !== '/login' && !token){//如果没有token且去的不是登录页
    next({name:"login"})
	}else  if(!Checkpath(to.path) && token){//有token但去的是没有权限的页面
      next('/home')
  }
  else{
    next()
  }
})
app.use(router)
app.mount('#app')

