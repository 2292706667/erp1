// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui' //新添加1
import 'element-ui/lib/theme-chalk/index.css' //新添加2，避免后期打包样式不同，要放在import App from './App';之前
 
// #import axios from 'axios'
// #import qs from 'qs'
 import axios from '@/api/http'            // #vue项目对axios的全局配置      
 import VueAxios from 'vue-axios' 
	  
	  
import App from './App'
import router from './router'

// process.env.MOCK && require('@/mock') 
import store from '@/store/index.js'


import Blob from "@/excel/Blob.js";
import Export2Excel from "@/excel/Export2Excel.js";


Vue.use(VueAxios,axios)
Vue.use(ElementUI)   //新添加3
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.filter("dateformat", function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return dataStr? moment(dataStr).format(pattern) : "";
});
window.vm=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
