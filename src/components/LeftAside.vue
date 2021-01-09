<template>
	<el-menu router :default-active="$route.path" class="el-menu-vertical-demo" background-color="#334157"
	 text-color="#fff" active-text-color="#ffd04b" :collapse="leftColl">
		<!-- <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b"> -->
		
		<div class="logobox">
			<img class="logoimg" src="../assets/img/logo.png">
		</div>
		
		 <el-submenu v-for="root in fortree"
			:key="root.id"
			:index="'index-'+root.id">
          <template slot="title">
            <i :class="root.icon"></i>
            <span>{{root.text}}</span>
          </template>
			<el-menu-item v-for="nobe in root.children" :key="nobe.id" :index="nobe.url">
				<i class="el-icon-setting"></i>
				<span slot="title">{{nobe.text}}</span>
			</el-menu-item>
			
			</el-submenu> 
			<!-- <template slot="title">
				<i class="el-icon-location"></i>
				<span>导航一</span>
			</template>
			<el-menu-item-group>
				<template slot="title">分组一</template>
				<el-menu-item >选项1</el-menu-item>
				<el-menu-item >选项2</el-menu-item>
			</el-menu-item-group>
			
			
			<!-- <el-menu-item-group title="分组2">
				<el-menu-item index="1-3">选项3</el-menu-item>
			</el-menu-item-group>
			<el-submenu index="1-4">
				<template slot="title">选项4</template>
				<el-menu-item index="1-4-1">选项1</el-menu-item>
			</el-submenu>
		</el-submenu>
		<el-menu-item index="2">
			<i class="el-icon-menu"></i>
			<span slot="title">导航二</span>
		</el-menu-item>
		<el-menu-item index="3" disabled>
			<i class="el-icon-document"></i>
			<span slot="title">导航三</span>
		</el-menu-item>
		<el-menu-item index="4">
			<i class="el-icon-setting"></i>
			<span slot="title">导航四</span>
		</el-menu-item> -->
	</el-menu>
</template>
<script>
	export default {
    name:'LeftAside',
	props:['leftColl'],
    data:function(){
      return{
      };
    },
    methods:{

    },
	created:function() {
// 		let url=this.axios.urls.SYSTEM_Tree_node;
// 		console.log(url);
// 		this.axios.get(url,{}).then(resp=>{
// 			let json=resp.data;
// 			console.log(json);
// 			this.fortree=json.data;
// 		}).catch(err=>{
// 			console.log(err);
// 		});
	},
	
	computed:{
		fortree:function(){
			return this.$store.getters.getnodelist;
		}
	}
	
	}
</script>
<style>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 240px;
		min-height: 400px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		border: none;
		text-align: left;
	}

	.el-menu-item-group__title {
		padding: 0px;
	}

	.el-menu-bg {
		background-color: #1f2d3d !important;
	}

	.el-menu {
		border: none;
	}

	.logobox {
		height: 40px;
		line-height: 40px;
		color: #9d9d9d;
		font-size: 20px;
		text-align: center;
		padding: 20px 0px;
	}

	.logoimg {
		height: 40px;
	}
</style>
