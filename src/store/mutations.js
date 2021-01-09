export default{
	 // type(事件类型)： 其值为setResturantName
        // payload：官方给它还取了一个高大上的名字：载荷，其实就是一个保存要传递参数的容器
		
	setnodelist:(state,payload) =>{
			state.nodelist=payload.nodelist
	},
		
// 	setResturantName: (state, payload) => {	
//           state.resturantName = payload.resturantName;
// 	}
	
	setboolean1:(state,payload) =>{
		state.boolean1=payload.collapsed
	},
	
	setjwt:(state,payload) =>{
		state.jwt=payload.jwt
	},
	
	
}