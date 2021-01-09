import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'

import kingindex from '@/views/system/kingindex.vue'
import login from '@/views/system/login.vue'
import user from '@/views/system/user'

//统计表报

import hello from '@/components/hello.vue'


Vue.use(Router)

export default new Router({
  routes: [
		{
		  path: '/Main',
		  name: 'Main',
		  component: Main,
			children:[
		
			]
		},
		
		
		{
		  path: '/',
		  name: '/login',
		  component: login,
		},
		
		
  ]
})
