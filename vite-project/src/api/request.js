import axios from 'axios'
import config from '@/config'
import {ElMessage} from 'element-plus'
const NETWORK_ERROR =  '网络错误,请您稍后重试...'
const requests = axios.create({
	baseURL:config.baseApi
})
//设置请求拦截器
requests.interceptors.request.use((req)=>{
//可以自定义header，jwt-token认证时
 return req
})
//设置相应拦截器
requests.interceptors.response.use((res)=>{
	const{code,data,msg} =  res.data
	if(code == 200){
		return data
	}else{
		ElMessage.error(msg || NETWORK_ERROR)
		return Promise.reject(msg || NETWORK_ERROR)
	}
})
//封装核心函数
function request(options){
	//请求类型
	options.method = options.method || 'get'
	if(options.method.toLowerCase() == 'get'){
		options.params = options.data
	}
	//对mock处理，如果单个请求isMock为true则开启mock环境
	let isMock = config.isMock
  if(typeof options.mock !== 'undefined'){
		isMock = options.mock
	}
	//判断当前环境是否为线上环境，修改baseURL
	if(config.env == 'prod'){
		requests.defaults.baseURL = config.baseApi // 线上环境不能访问到mock
	}else{
		requests.defaults.baseURL = isMock ? config.mockApi : config.baseApi
	}
	return requests(options)
}
export default request