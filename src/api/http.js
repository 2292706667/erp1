/**
 * vue项目对axios的全局配置
 */
import axios from 'axios'
import qs from 'qs'

//引入action模块，并添加至axios的类属性urls上
import action from '@/api/action'
axios.urls = action

// axios默认配置
axios.defaults.timeout = 1000000; // 超时时间
// axios.defaults.baseURL = 'http://localhost:8080/j2ee15'; // 默认地址
axios.defaults.baseURL = action.SERVER;

//整理数据
// 只适用于 POST,PUT,PATCH，transformRequest` 允许在向服务器发送前，修改请求数据
axios.defaults.transformRequest = function(data) {
	data = qs.stringify(data);
	return data;
};


// 请求拦截器
axios.interceptors.request.use(function(config) {
	 //权限验证
//   //获取请求URL
//   let url=config.url;
// 	
//   let user=window.vm.$store.getters.getuser;
// //   //权限和用户信息
//   let modules=user.list2;
//   let flag=false;
//   //循环比对
//   for(let mod of modules){
//     //判断当前url与用户的权限是否匹配
//     if(mod.url==url){
//       flag=true;
//     }
//   }
// 	if(url=='/moduleAction_login.action' || url=='/roleAction_userrole1.action' || url=='/dictAction_queryDict.action' || url=='/chanceAction_load.action' || url=='/planAction_list2.action' || url=='/chanceAction_edit5.action' ||url=='/serviceAction_load.action'  ){
// 		flag=true;
// 	}
//   
//   if(flag){
//   //从vuex中获取jwt
//   let jwt=window.vm.$store.getters.getjwt;
//   if(null!=jwt){
//     config.headers['jwt']=jwt;
//   }
  return config;
//   }
//   else{
// 	window.vm.$message({
// 		showClose: true,
// 		message: '权限原因无法访问',
// 		type:  'error'
// 	});
//     return;
//   }
}, function(error) {
  return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function(response) {
// 	let jwt2=response.headers.jwt;
// 	window.vm.$store.commit('setjwt',{jwt:jwt2});
	return response;
}, function(error) {
	return Promise.reject(error);
});

// // 路由请求拦截
// // http request 拦截器
// axios.interceptors.request.use(
// 	config => {
// 		//config.data = JSON.stringify(config.data);  
// 		//config.headers['Content-Type'] = 'application/json;charset=UTF-8';
// 		//config.headers['Token'] = 'abcxyz';
// 		//判断是否存在ticket，如果存在的话，则每个http header都加上ticket
// 		// if (cookie.get("token")) {
// 		// 	//用户每次操作，都将cookie设置成2小时
// 		// 	cookie.set("token", cookie.get("token"), 1 / 12)
// 		// 	cookie.set("name", cookie.get("name"), 1 / 12)
// 		// 	config.headers.token = cookie.get("token");
// 		// 	config.headers.name = cookie.get("name");
// 		// }
// 		return config;
// 	},
// 	error => {
// 		return Promise.reject(error.response);
// 	});

// // 路由响应拦截
// // http response 拦截器
// axios.interceptors.response.use(
// 	response => {
// 		if (response.data.resultCode == "404") {
// 			console.log("response.data.resultCode是404")
// 			// 返回 错误代码-1 清除ticket信息并跳转到登录页面
// 			//      cookie.del("ticket")
// 			//      window.location.href='http://login.com'
// 			return
// 		} else {
// 			return response;
// 		}
// 	},
// 	error => {
// 		return Promise.reject(error.response) // 返回接口返回的错误信息
// 	});



export default axios;
