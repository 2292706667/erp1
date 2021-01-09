<template>
	<el-container class="main-container">
		<el-aside :class="!booelan?asideClass:asideClass1">
			<LeftAside :left-coll="booelan"></LeftAside>
		</el-aside>
		<el-container>
			<el-header class="main-header">
				<TopNav @open-img="docc"></TopNav>
			</el-header>
			<el-main class="main-center">
				<router-view/>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	// 导入组件
	import TopNav from '@/components//TopNav.vue'
	import LeftAside from '@/components//LeftAside.vue'

	// 导出模块
	export default {
		name:'Main',
    data:function(){
      return{
        asideClass:'main-aside',
		// booelan:false,
		asideClass1:'main-aside-collapsed'
      };
    },
    methods:{
		docc:function(v){
			this.booelan=v;
		}
    },
    components:{
      TopNav,
      LeftAside
    },
	computed:{
		booelan:function(){
			 return this.$store.getters.getboolean1;
		},
		
	},
	
	};
</script>
<style scoped>
	.main-container {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}

	.main-aside-collapsed {
		/* 在CSS中，通过对某一样式声明! important ，可以更改默认的CSS样式优先级规则，使该条样式属性声明具有最高优先级 */
		width: 64px !important;
		height: 100%;
		background-color: #334157;
		margin: 0px;
	}

	.main-aside {
		width: 240px !important;
		height: 100%;
		background-color: #334157;
		margin: 0px;
	}

	.main-header,
	.main-center {
		padding: 0px;
		border-left: 2px solid #333;
	}
</style>
