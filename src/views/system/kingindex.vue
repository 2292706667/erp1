<template>
	<el-container class="auth-container">
		<el-header style="width:100%;margin:15px 0px;padding:0px 15px;">
			<el-row class="el-row-bg">
				<el-col :span="24">
					<el-button type="success" icon="el-icon-plus" @click="dialogFormVisible=true">新增</el-button>
					<el-button type="primary" icon="el-icon-edit-outline" @click="saveAuth">保存角色权限</el-button>
				</el-col>
			</el-row>
		</el-header>
		<el-container class="auth-container">
			<el-aside class="auth-aside">
				<el-tree style="height:100%;" :data="data" @check="handleCheckChange" show-checkbox default-expand-all node-key="id"
				 ref="authTree" highlight-current :props="defaultProps">
				</el-tree>
			</el-aside>
			<el-main class="auth-main">
				<!--数据表格-->
				<div align="center">
				<el-input type="text" style="width: 200px;" v-model="roleForm.roleName"></el-input>
				<el-button @click="query(1)">查询</el-button>
				</div>
				<el-table size="medium" :loading="true" :header-cell-style="{background:'#eef1f6',color:'#606266'}" ref="singleTable"
				 :highlight-current-row="true" @row-click="rowClick" @row-dblclick="rowClick1" :data="result" style="width: 100%">
					<el-table-column type="index" label="序号" width="50" align="center" :index="indexMethod"></el-table-column>
					<el-table-column prop="roleName"  label="角色名称" min-width="180" align="left">
						<template slot-scope="scope">
							<el-link @click.stop="queryRoleModuleId(scope.row.roleId)">{{scope.row.roleName}}</el-link>
						</template>
					</el-table-column>
							
							<el-table-column prop="roleDesc"  label="角色备注" min-width="180" align="left">
							</el-table-column>

						
					<el-table-column label="操作">
						<!--slot-scope:类似将每一行的row对象封装到槽中，之后直接从scope中获取row对象信息即可-->
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-edit-outline" type="primary" round @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="mini" icon="el-icon-delete" type="danger" round @click.stop="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			<el-button  @click="exportExcel">导出文档</el-button>
				<!--分页组件-->
				<div class="div-pagination">
					<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
					 :page-sizes="[5,10, 20, 30]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>

				<!--弹出框-->
				<el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogFormVisible" @close="dialogClose">
					<el-form :label-position="labelPosition" :model="roleForm" :rules="rules" ref="roleForm">
						<el-form-item prop="roleName" label="角色名称" :label-width="formLabelWidth">
							<input type="hidden" v-model="roleForm.roleId" />
							<el-input v-model="roleForm.roleName" autocomplete="off"></el-input>
						</el-form-item>
						
						<el-form-item prop="roleDesc" label="角色备注" :label-width="formLabelWidth">
							<el-input  v-model="roleForm.roleDesc" autocomplete="off"></el-input>
						</el-form-item>
						
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button type="danger" @click="dialogFormVisible = false" icon="el-icon-close">取 消</el-button>
						<el-button type="primary" @click="doFormSubmit" icon="el-icon-edit-outline">保 存</el-button>
					</div>
				</el-dialog>
				
					<!--弹出框-->
				<el-dialog :close-on-click-modal="false" title="对应用户" :visible.sync="dialogFormVisible1" >
					<el-button size="mini" icon="el-icon-add" @click="rolekingupdate" type="success"  >新增</el-button>
					<el-table size="medium" :data="userresult" style="width: 100%">
						
					
					<el-table-column type="index" label="序号" width="50" align="center" :index="indexMethod"></el-table-column>
						<el-table-column prop="1" label="用户名称"   min-width="180" align="left">
						</el-table-column>
							
						<el-table-column label="操作">
							<!--slot-scope:类似将每一行的row对象封装到槽中，之后直接从scope中获取row对象信息即可-->
							<template slot-scope="scope">
								<el-button size="mini" icon="el-icon-position" type="danger" round @click.stop="rolekingDelete(scope.$index, scope.row)">撤销权限</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div slot="footer" class="dialog-footer">
						<el-button type="danger" @click="dialogFormVisible1 = false" icon="el-icon-close">取 消</el-button>
					</div>
				</el-dialog> 
				
					<!--弹出框-->
				<el-dialog :close-on-click-modal="false" title="更新权限" :visible.sync="dialogFormVisible2" >
					<el-table size="medium" :data="userresult2" style="width: 100%">

					<el-table-column type="index" label="序号" width="50" align="center" :index="indexMethod"></el-table-column>
						<el-table-column prop="1" label="用户名称"   min-width="180" align="left">
					</el-table-column>
					
					
					<el-table-column  prop="3" :formatter="format" label="用户角色"   min-width="180" align="left">
					</el-table-column>
							
						<el-table-column label="操作">
							<!--slot-scope:类似将每一行的row对象封装到槽中，之后直接从scope中获取row对象信息即可-->
							<template slot-scope="scope">
								<el-button size="mini" type="primary" icon="el-icon-edit" circle @click.stop="updateking(scope.$index, scope.row)"></el-button>
							</template>
							
						</el-table-column>
					</el-table>
					<div slot="footer" class="dialog-footer">
						<el-button type="danger" @click="dialogFormVisible2 = false" icon="el-icon-close">取 消</el-button>
					</div>
				</el-dialog> 
				
				
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
	export default {
		name: 'BookList',
		data: function() {
			return {
				value:true,
				result: [],
				userresult: [],
				userresult2:[],
				page: 1,
				rows: 5,
				total: 0,
				data: [],
				defaultProps: {
					children: 'children',
					label: 'text'
				},
				title: '新增角色',
				dialogFormVisible: false,
				dialogFormVisible1:false,
				dialogFormVisible2:false,
				formLabelWidth: '80px',
				labelPosition: 'right',
				roleForm: {
					roleId: null,
					roleName: null,
					roleDesc:null,
					roleFlag:null
				},
				//表单验证
				rules: {
					roleName: [{
						required: true,
						message: '请输入角色名称！',
						trigger: 'blur'
					}],
					roleDesc: [{
						required: true,
						message: '请输入角色备注！',
						trigger: 'blur'
					}]
				},
				//权限Tree选中的节点
				moduleids: [],
				//获取table当前选中行row对象
				curRow: null
			};
		},
		methods: {
			
			exportExcel() {
				require.ensure([], () => {
					const {
						export_json_to_excel
					} = require("../../excel/Export2Excel");

					const tHeader = ["角色id", "角色名",]; // 这是excel文档第一行显示的标题

					const filterVal = ["roleId","roleName"]; // id，version等都是上面标题所对应的数据

					const list = this.result; //把data里的数组tableData存到list中

					const data = this.formatJson(filterVal, list);

					export_json_to_excel(tHeader, data, "列表excel"); //标题，数据，文件名
				});
			},

			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]));
			},
			
			
			
			//开关
			changeSwitch(row){
				console.log(row)
				var bo=row.roleFlag;
				var s;
				if(bo){
					s=1;
				}else{
					s=0;
				}
				
			},
			
			//格式内容
			format(row, column, cellValue, index){
				if (cellValue == 1) {
					return '管理员';
				} else if (cellValue == 5) {
					return '销售主管';
				} else if (cellValue == 6) {
					return '客户经理';
				}else if(cellValue==7){
					return '高管';
				}
			},	
			
			//更新权限
			updateking(index, row){
				this.$confirm('确定更新权限？, 是否继续?', '提示', {
				      confirmButtonText: '确定',
				      cancelButtonText: '取消',
				      type: 'warning'
				    }).then(() => {
						
				      var roleId=this.$store.getters.getroleId;
				      
				      var url=this.axios.urls.ROLEUSER_updateUSERKING;
				      
				      this.axios.post(url,{roleId:roleId,uid:row[0]}).then(resp=>{
						  
				      		this.$message({
				      			showClose: true,
				      			message: resp.data.msg,
				      			type: 'success'
				      		});
				      		
				      		var url1=this.axios.urls.ROLE_ROLEUSER;
				      		this.axios.post(url1,{roleId:roleId}).then(resp=>{
				      				this.userresult=resp.data.rows;
				      		}).catch();
				      		
				      		this.dialogFormVisible2=false;
				      		
				      }).catch(err=>{
						  this.$message({
						  	showClose: true,
						  	message: resp.data.msg,
						  	type: 'error'
						  });
					  });
				      
				    }).catch(() => {
				    });
				
				
				
				
			},
			
			//撤销权限
			rolekingDelete(index, row){
				
				
	this.$confirm('确定撤销权限？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url =this.axios.urls.ROLEUSER_DELUSERKING;
          this.axios.post(url,{id:row[0]}).then(resp=>{
          		
          		var url1=this.axios.urls.ROLE_ROLEUSER;
          		
          		this.axios.post(url1,{roleId:row[3]}).then(resp=>{
          				this.userresult=resp.data.rows;
          				console.log(this.userresult);
          				
						this.$message({
          					showClose: true,
          					message: "撤销成功",
          					type: 'success'
          				});
						
          		}).catch();
				
          }).catch(err=>{
			  this.$message({
			  	showClose: true,
			  	message: "撤销失败",
			  	type: 'error'
			  });
		  });
        }).catch(() => {
        });
				
				
				
			},
			
			//全部权限查看
			rolekingupdate(){
				
				var url =this.axios.urls.ROLEUSER_USER;
				this.axios.post(url,{}).then(resp=>{
						this.userresult2=resp.data.rows;
						console.log(this.userresult);
				}).catch();
				this.dialogFormVisible2=true;
				
			},
			//自定义索引
			indexMethod: function(index) {
				return (this.page - 1) * this.rows + (index + 1);
			},
			//分页
			handleSizeChange: function(rows) {
				this.page = 1;
				this.rows = rows;
				this.query();
			},
			handleCurrentChange: function(page) {
				this.page =page;
				this.query(page);
			},
			//Dialog弹出框的close方法
			dialogClose: function() {
				this.doFormReset();
			},
			//form表单重置
			doFormReset: function() {
				//通过form表单的ref属性来清空表单验证信息
				this.$refs['roleForm'].resetFields();
				//清空上一次表单的数据信息
				this.roleForm.roleId = null;
				this.roleForm.roleName = null;
				this.roleForm.roleDesc=null;
				this.title = "新增角色";
			},
			//数据查询
			query: function(page) {
				var params = {
					page:page,
					rows: this.rows,
					roleName:this.roleForm.roleName
				}
				var url = this.axios.urls.ROLE_QUERY_PAGER;
				this.axios.post(url, params).then(resp => {
					console.log(resp);
					this.result = resp.data.rows;
					this.total = resp.data.total;
				}).catch();
			},
			//表格行的单击事件
			rowClick: function(row, column, event) {

				this.curRow = row;
			},
					//表格行的双击击事件
			rowClick1: function(row, column, event) {
					
					this.$store.commit('setroleId',{
						roleId:row.roleId
					});
				
				var url=this.axios.urls.ROLE_ROLEUSER;
			
				this.axios.post(url,{roleId:row.roleId}).then(resp=>{
						this.userresult=resp.data.rows;
						console.log(this.userresult);
				}).catch();
				
				this.dialogFormVisible1=true;
			},
			//数据表格行的编辑删除操作
			handleEdit: function(index, row) {
				if(row.roleId==1){
					this.$message({
						showClose: true,
						message: '系统初始管理员不可被操作',
						type: 'success'
					});
					return ;
				}
				
				//console.log(index, row);
				this.roleForm.roleId = row.roleId;
				this.roleForm.roleName = row.roleName;
				this.roleForm.roleDesc = row.roleDesc;
				//设置对话框title
				
				this.title = "角色编辑";
				//显示对话框
				this.dialogFormVisible = true;
			},
			handleDelete: function(index, row) {
				//console.log(index, row);
				
				if(row.roleId==1){
					this.$message({
						showClose: true,
						message: '系统初始管理员不可被操作',
						type: 'success'
					});
					return ;
				}
				
				this.$confirm('确认删除当前角色信息吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var url = this.axios.urls.ROLE_DEL;
					this.axios.post(url, {
						roleId: row.roleId
					}).then(resp => {
						var type = "error";
						if (resp.data.success) {
							this.dialogFormVisible = false;
							this.query(1);
							type = "success";
						}
						this.$message({
							showClose: true,
							message: resp.data.msg,
							type: type
						});
					}).catch();
				}).catch(() => {});
			},
			//表单提交
			doFormSubmit: function() {
				//默认新增
				this.$refs['roleForm'].validate((valid) => {
					if (valid) {
						var url = this.axios.urls.ROLE_ADD;
						var params = {
							roleId: this.roleForm.roleId,
							roleName: this.roleForm.roleName,
							roleDesc:this.roleForm.roleDesc
						};
						if (this.title == "角色编辑") {
							url = this.axios.urls.ROLE_EDIT;
						}
						//console.log(url);
						//console.log(params);
						this.axios.post(url, params).then(resp => {
							this.roleForm.roleName=null;
							this.query(1);
							var type = "error";
							if (resp.data.success) {
								this.dialogFormVisible = false;
								type = "success";
							}
							this.$message({
								showClose: true,
								message: resp.data.msg,
								type: type
							});
						}).catch();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			saveAuth: function() {

				if (this.moduleids.length <= 0) {
					this.$message({
						showClose: true,
						message: '请选择权限分配给指定角色！',
						type: 'error'
					});
					return false;
				}
				if (null == this.curRow) {
					this.$message({
						showClose: true,
						message: '请选中表格中对应的角色分配权限！',
						type: 'error'
					});
					return false;
				}
				let params = {
					roleId: this.curRow.roleId,
					moduleId: this.moduleids.toString()
				}
				if(params.roleId==1){
					this.$message({
						showClose: true,
						message: '系统初始管理员不可被操作',
						type: 'success'
					});
					this.curRow = null;
					this.moduleids = [];
					this.page=1;
					this.query(1);
					this.$refs['authTree'].setCheckedKeys([]);
					return ;
				}
				//保存角色权限
				var url = this.axios.urls.SAVE_ROLE_AUTH;
				this.axios.post(url, params).then(resp => {
					if (resp.data.success) {
					
							this.$message({
								showClose: true,
								message: resp.data.msg,
								type: 'success'
							});
							//保存成功，刷新列表和清空数据信息
							this.curRow = null;
							this.moduleids = [];
							this.page=1;
							this.query(1);
							this.$refs['authTree'].setCheckedKeys([]);
					} else {
						this.$message({
							showClose: true,
							message: '请确定修改权限',
							type: 'error'
						});
					}
				}).catch();
			},
			queryRoleModuleId: function(roleId) {
				//先清空，再查权限
				this.$refs['authTree'].setCheckedKeys([]);

				var url = this.axios.urls.QUERY_ROLE_MODULE;
				this.axios.post(url, {
					roleId: roleId
				}).then(resp => {
					//console.log(resp);
					this.moduleids = resp.data.data;
					this.moduleids.forEach((value) => {
						//setChecked 子节点只选中一个需要用setChecked，（(key/data, checked, deep) 接收三个参数，
						this.$refs['authTree'].setChecked(value, true, false);
					});
				}).catch();
			},
			handleCheckChange: function(data, checked) {
				//checked.checkedKeys  选中的节点id数组
				//checked.halfCheckedKeys 半选中节点id数组
				this.moduleids = checked.halfCheckedKeys.concat(checked.checkedKeys); //选中节点和半选中节点所有的id
				console.log(this.moduleids);
			}
		},
		created: function() {
			//加载权限树
			var url = this.axios.urls.SYSTEM_ELEMENT_TREE;
			this.axios.post(url, {}).then(resp => {
				this.data = resp.data.data;
				//this.$router.push('/Home');
			}).catch(err=>{
				
			});
			//加载角色列表
			this.query(1);
		}
	}
</script>
<style scoped>
	.auth-container {
		height: 100%;
		width: 100%;
		display: flex;
		object-fit: fill;

	}

	.auth-aside {
		width: 200px !important;
		padding: 0px 10px;
		height: 100%;
		object-fit: fill;
		margin-left:5px;
	}

	.auth-main {
		padding: 0px;
		height: 100%;
		margin-right:15px;
	}

	.el-row-bg {
		padding-top: 10px;
		padding-left: 10px;
		color: #000000;
		font-weight: bold;
		height: 60px;
		background: #f4f4f5;
	}
</style>
