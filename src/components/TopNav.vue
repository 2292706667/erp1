<template>
	<!-- <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64"
	 text-color="#fff" active-text-color="#ffd04b">
		<el-menu-item index="1">处理中心</el-menu-item>
		<el-submenu index="2">
			<template slot="title">我的工作台</template>
			<el-menu-item index="2-1">选项1</el-menu-item>
			<el-menu-item index="2-2">选项2</el-menu-item>
			<el-menu-item index="2-3">选项3</el-menu-item>
			<el-submenu index="2-4">
				<template slot="title">选项4</template>
				<el-menu-item index="2-4-1">选项1</el-menu-item>
				<el-menu-item index="2-4-2">选项2</el-menu-item>
				<el-menu-item index="2-4-3">选项3</el-menu-item>
			</el-submenu>
		</el-submenu>

		<el-menu-item index="3" disabled>消息中心</el-menu-item>
		<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
	</el-menu> -->
	<el-menu class="el-menu-demo" mode="horizontal" background-color="#334157" text-color="#fff" active-text-color="#fff">
		<el-button class="buttonimg">
			<!--:src="collapsed?imgshow:imgsq" @click="doToggle()"-->
			<img class="showimg"  :src="collapsed?imgshow:imgsq" @click="doToggle()">
		</el-button>
		<el-submenu index="2" class="submenu">
			<template slot="title">{{name}}</template>
			<el-menu-item index="2-1">设置</el-menu-item>
			<el-menu-item index="2-2">个人中心</el-menu-item>
			<el-menu-item @click="exit()" index="2-3">退出</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
	export default {
    name:'TopNav',
    data:function(){
      return{
		// collapsed:false,
		imgshow:require("@/assets/img/show.png"),
		imgsq:require("@/assets/img/sq.png")
      };
    },
    methods:{
      exit:function(){
		this.$router.push("/");
      },
	  doToggle:function(){
			this.$store.commit('setboolean1',{collapsed:!this.collapsed})
// 		  this.collapsed=!this.collapsed;
// 		  console.log('子组件'+this.collapsed);
// 		 this.$emit("open-img",this.collapsed);
	  },
    },
	computed:{
		collapsed:function(){
			return this.$store.getters.getboolean1;
		},
		name:function(){
			if(this.$store.getters.getuser.usrRoleId==1){
				return '管理员';
			}else if(this.$store.getters.getuser.usrRoleId==5){
				return '销售主管';
			}else if(this.$store.getters.getuser.usrRoleId==6){
				return '客户经理';
			}else if(this.$store.getters.getuser.usrRoleId==7){
				return '高管';
			}
			 
		}
	}
	
	
	}
	
</script>

<style scoped>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		border: none;
	}

	.submenu {
		float: right;
	}

	.buttonimg {
		height: 60px;
		background-color: transparent;
		border: none;
	}

	.showimg {
		width: 26px;
		height: 26px;
		position: absolute;
		top: 17px;
		left: 17px;
	}

	.showimg:active {
		border: none;
	}
</style>
