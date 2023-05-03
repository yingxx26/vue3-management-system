<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="message"
               ref="login"
               label-width="0px"
               class="ms-content">
        <el-form-item prop="username">
          <el-input type="input"
					         v-model="message.username"
                    placeholder="username">
            <template #prepend>
              <el-button>账号</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
					v-model="message.password"
                    placeholder="password">
            <template #prepend>
              <el-button>密码</el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="getMenu">登录</el-button>
        </div>
        <p class="login-tips">Tips : 默认是管理者的身份登录</p>
      </el-form>
    </div>
  </div>
</template>

<script>

import { defineComponent, getCurrentInstance, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {useGetMenu} from '@/store/Store.js'
export default defineComponent({
	setup() {
		const message = reactive({
			username:"admin",
			password:"admin"
		})
    const router = useRouter()
    const useMenu = useGetMenu()
    const {proxy} = getCurrentInstance()
    const getMenu = (async()=>{
     let res =  await proxy.$api.getMenuData(message)
     /* 将获取的菜单栏信息存入pinia中 */
    //  console.log(res)
     useMenu.GetMenu(res.menu)
     useMenu.setCookies(res.token)
    /* 动态引入路由 */
     useMenu.AddMenu(router)
     router.push({name:'home'})
    })
    
		return{
			message,
      getMenu
		}
	},
})
</script>

  

<style scoped lang="less">
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/login.jpg);
  background-size: 100%;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .ms-content {
    padding: 30px 30px;
    .login-btn {
      text-align: center;
      button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
      }
    }
    .login-tips {
      font-size: 12px;
      line-height: 30px;
      color: #fff;
    }
  }
}
</style>