/* 对于整个项目接口的管理 */
import request from './request.js'

export default{
	/* home页面请求 */
	//获取表格数据
	getMockTableData(parmas){return request({url:'/home/tableData',	method:'get',data:parmas,mock:true})},
	//获取订单信息数据
	getCountData(){return request({url:"/home/countData",method:"get",mock:true})},
	//获取Echarts表数据
	getEchartsData(){return request({url:'/home/EchartsData',method:"get",mock:true})},
	//获取user列表信息
	getUserData(params){return request({url:'/user/getUserData',method:"get",mock:true,data:params})},
  //新增user用户信息
	addUserData(params){ return request({url:"/user/addUserData",method:'post',mock:true,data:params}) },
  //修改用户信息
	updateUserData(params){return request({url:"/user/updateUserData",method:'post',mock:true,data:params})},
	//删除用户信息
	deleteUserData(params){return request({url:"/user/deleteUserData",method:'get',mock:true,data:params})},
  //登录验证显示菜单栏
  getMenuData(params){return request({url:"/permission/getMenu",method:"post",mock:true,data:params})}
}