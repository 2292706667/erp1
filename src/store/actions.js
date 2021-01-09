export default{
	setResturantNameByAsync: function(context, payload) {
       setTimeout(() => {
         context.commit('setResturantName', payload);//Action提交的是mutation
       }, 3000);
     },
	 
	 setAajxResturantNameByAsync: function(context, payload) {
		 //獲取this
		 let _this=payload._this;
		 //獲取請求路勁
		 let url =_this.axios.urls.SYSTEM_Vuex;
		
		 _this.axios.post(url,{resturantName:payload.name}).then(resp=>{
			let json=resp.data;
			context.commit('setResturantName', {name:json.msg});
		 }).catch(err=>{
			 
		 })
	  },
}