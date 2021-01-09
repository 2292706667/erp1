<template>
	<div>
		<el-row style="margin: 10px;"><el-button @click="add" type="success" icon="el-icon-plus" circle></el-button></el-row>
		<div align="center">
			<el-input type="text" style="width: 200px;" v-model="userForm.usrName"></el-input>
			<el-button @click="query(1)">查询</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<!-- <el-form-item label="用户账号">
            <span>{{props.row.usrId}}</span>
       </el-form-item> -->

						<el-form-item label="用户 ID">
							<span id="id">{{ props.row.usrId }}</span>
						</el-form-item>

						<el-form-item label="用户名">
							<span>{{ props.row.usrName }}</span>
						</el-form-item>

						<el-form-item v-if="!boolean" label="用户角色">
							<span v-if="props.row.usrRoleId == 1">管理员</span>
							<span v-if="props.row.usrRoleId == 5">销售主管</span>
							<span v-if="props.row.usrRoleId == 6">客户经理</span>
							<span v-if="props.row.usrRoleId == 7">高管</span>
						</el-form-item>

						<el-form-item v-if="boolean" label="用戶角色">
							<el-select v-model="usrRoleId">
								<el-option value="1" label="管理员">管理員</el-option>
								<el-option value="6" label="客户经理">客戶經理</el-option>
								<el-option value="5" label="销售主管">銷售主管</el-option>
								<el-option value="7" label="高管">高管</el-option>
							</el-select>
						</el-form-item>

						<el-form-item>
							<el-button id="xg" style="margin-left: 300px;" @click="update">修改</el-button>
							<el-button style="margin-left: 300px;" @click="up">確認</el-button>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>

			<el-table-column label="用户ID" prop="usrId"></el-table-column>
			<el-table-column label="用户账号" prop="usrName"></el-table-column>
 
			<el-table-column label="用户角色" v-model="usrRoleId"   prop="usrRoleId"  :formatter="format" ></el-table-column>

			<el-table-column label="是否启用">
				<template slot-scope="scope">
					<el-switch
						v-model="scope.row.usrFlag"
						:active-value="1"
						:inactive-value="0"
						active-color="#13ce66"
						inactive-color="#ff4949"
						@change="changeSwitch(scope.row)"
					/>
				</template>
			</el-table-column>

			<el-table-column label="操作">
				<!--slot-scope:类似将每一行的row对象封装到槽中，之后直接从scope中获取row对象信息即可-->
				<template slot-scope="scope">
					<el-button size="mini" type="primary" icon="el-icon-delete" circle @click.stop="deleteuser(scope.row)">刪除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--分页组件-->
		<div class="div-pagination">
			<el-pagination
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="page"
				:page-sizes="[5, 10, 20, 30]"
				:page-size="rows"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</div>

		<!--弹出框-->
		<el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogFormVisible">
			<el-form :model="userForm" :rules="userreles" ref="userForm">
				<el-form-item prop="usrName" label="用戶名" :label-width="formLabelWidth"><el-input v-model="userForm.usrName" autocomplete="off"></el-input></el-form-item>

				<el-form-item prop="usrPassword" label="密碼" :label-width="formLabelWidth"><el-input v-model="userForm.usrPassword" autocomplete="off"></el-input></el-form-item>

				<el-form-item prop="usrPassword1" label="確認密碼" :label-width="formLabelWidth">
					<el-input v-model="userForm.usrPassword1" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item prop="usrRoleId" label="角色" :label-width="formLabelWidth">
					<el-select v-model="userForm.usrRoleId">
						<el-option value="1" label="管理员">管理員</el-option>
						<el-option value="5" label="销售主管">销售主管</el-option>
						<el-option value="6" label="客户经理">客户经理</el-option>
						<el-option value="7" label="高管">高管</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="danger" @click="dialogFormVisible = false" icon="el-icon-close">取 消</el-button>
				<el-button type="primary" @click="save" icon="el-icon-edit-outline">保 存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<style>
.demo-table-expand {
	font-size: 0;
}
.demo-table-expand label {
	width: 90px;
	color: #99a9bf;
}
.demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 50%;
}
</style>

<script>
export default {
	data() {
		return {
			tableData: [],
			page: 1,
			rows: 5,
			total: 0,
			usrRoleId: null,
			boolean: false,
			title: '新增',
			dialogFormVisible: false,
			formLabelWidth: '80px',
			userForm: {
				usrName: null,
				usrPassword: null,
				usrPassword1: null,
				usrRoleId: null
			},
			userreles: {
				usrName: [{ required: true, message: '请输入用戶名！', trigger: 'blur' }, { min: 3, max: 6, message: '长度必须在3-6个字符之间', trigger: 'blur' }],

				usrPassword: [{ required: true, message: '請輸入密碼！', trigger: 'blur' }],

				usrPassword1: [
					{ required: true, message: '請確認密碼！', trigger: 'blur' },
					{
						validator: (rule, value, callback) => {
							if (value === '') {
								callback(new Error('请再次输入密码'));
							} else if (value !== this.userForm.usrPassword) {
								callback(new Error('两次输入密码不一致'));
							} else {
								callback();
							}
						},
						trigger: 'blur'
					}
				],

				usrRoleId: [{ required: true, message: '請選擇角色！', trigger: 'blur' }]
			}
		};
	},
	created: function() {
		this.query();
	},
	methods: {
		update() {
			this.boolean = !this.boolean;
			var a = document.getElementById('xg');
			if (a.innerText == '修改') {
				a.innerText = '取消';
			} else {
				a.innerText = '修改';
			}
		},
		
		
		changeSwitch(row) {
			var url = this.axios.urls.ROLEUSER_UPDATEUSER;
			var roleid = row.usrRoleId;
			console.log(roleid);
			console.log(row);
			this.axios
				.post(url, { uid: row.usrId, flag: row.usrFlag, rid: roleid })
				.then(resp => {
					this.$message({
						showClose: true,
						message: resp.data.msg,
						type: 'success'
					});
					this.query(1);
				})
				.catch();
		},
		
		format(row, column, cellValue, index) {
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
		
		query(page) {
			var params = {
				page: page,
				rows: this.rows,
				uname: this.userForm.usrName
			};
			var url = this.axios.urls.ROLEUSER_USER1;
			this.axios
				.post(url, params)
				.then(resp => {
					this.tableData = resp.data.rows;
					this.total = resp.data.total;
				})
				.catch();
		},

		//分页
		handleSizeChange: function(rows) {
			this.page = 1;
			this.rows = rows;
			this.query();
		},
		handleCurrentChange: function(page) {
			this.page = page;
			this.query(page);
		},

		deleteuser(row) {
			this.$confirm('确认删除用户？, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					var url = this.axios.urls.ROLEUSER_DELUSER;
					this.axios
						.post(url, { uid: row.usrId })
						.then(resp => {
							this.$message({
								showClose: true,
								message: resp.data.msg,
								type: 'success'
							});

							this.query(1);
						})
						.catch(err => {
							this.$message({
								showClose: true,
								message: '删除失败',
								type: 'error'
							});
						});
				})
				.catch(() => {});
		},

		up() {
			var id = document.getElementById('id').innerText;
			var roleid = this.usrRoleId;
			var url = this.axios.urls.ROLEUSER_updateUSERKING;

			this.axios
				.post(url, { roleId: roleid, uid: id })
				.then(resp => {
					console.log(resp);

					this.$message({
						showClose: true,
						message: '修改成功',
						type: 'success'
					});

					this.boolean = false;

					this.query(1);
				})
				.catch(err => {
					this.$message({
						showClose: true,
						message: '修改失敗',
						type: 'error'
					});
				});
		},

		add() {
			this.userForm = {
				usrName: null,
				usrPassword: null,
				usrRoleId: null
			};
			this.dialogFormVisible = true;
		},
		save() {
// 			this.$refs['userForm'].validate((valid) => {
// 				
// 			)}
					// if(valid){
						var url = this.axios.urls.ROLEUSER_ADDUSER;
						this.axios
							.post(url, this.userForm)
							.then(resp => {
								this.tableData = resp.data.rows;
								this.$message({
									showClose: true,
									message: resp.data.msg,
									type: 'success'
								});
								
								this.userForm = {
									usrName: null,
									usrPassword: null,
									usrRoleId: null
								};
						this.dialogFormVisible = false;
								this.query(1);
							})
							.catch(err => {
								this.$message({
									showClose: false,
									message: '添加失败',
									type: 'error'
								});
							});
					}
		
			
		
		},
		
		
		
	
};
</script>
