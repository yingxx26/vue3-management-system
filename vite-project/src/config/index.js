/* 环境部署文件
一般在企业项目中会有三个环境
开发环境
测试环境
线上环境
*/
//当前环境(默认为线上环境)
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
	development:{
		baseApi:'',
		mockApi:'/mock'
	},
	test:{
		baseApi:'//test.future.com/api',
		mockApi:'/mock'
	},
	prod:{
		baseApi:'',
		mockApi:'/mock'
}

}
export default{
	env,
	mock:true,//控制整个项目的mock开关
	...EnvConfig[env]
}