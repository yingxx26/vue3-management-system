import  Mock from 'mockjs'
import  homeData from './home.js'
import  Echarts from './MockEcharts.js'
import userData from './user.js'
import permission from './permission.js'
Mock.mock('/mock/home/tableData',{code:200,data:homeData.tableData})
Mock.mock('/mock/home/countData',{code:200,data:homeData.countData})
Mock.mock('/mock/home/EchartsData',{code:200,data:Echarts})
Mock.mock(/mock\/user\/getUserData/,'get',userData.getUserList)
Mock.mock(/mock\/user\/addUserData/,'post',userData.createUser)
Mock.mock(/mock\/user\/updateUserData/,'post',userData.updateUser)
Mock.mock(/mock\/user\/deleteUserData/,'get',userData.deleteUser)
Mock.mock('/mock/permission/getMenu','post',permission.getMenu)