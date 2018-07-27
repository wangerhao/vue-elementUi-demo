<template>
	<div class="login-wrap">
		<div class="ms-title">后台管理系统</div>
		<div class="ms-login">
			<el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" status-icon label-width="0px" class="demo-ruleForm">
				<el-form-item prop="username">
					<el-input v-model="ruleForm2.username" placeholder="请输入用户名" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="请输入密码" v-model="ruleForm2.password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="checkPass">
					<el-input type="password" placeholder="请再次输入密码" v-model="ruleForm2.checkPass" auto-complete="off" @keyup.enter.native="submitForm('ruleForm2')"></el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" v-on:click="submitForm('ruleForm2')">注册</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			var validateName = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入用户名'));
				}else{
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.ruleForm2.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm2: {
					username: '',
					password: '',
					checkPass: ''
				},
				rules: {
					username: [{
						validator: validateName,
						trigger: 'blur'
					}],
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				},
				url: '/ATSUser/reg'
			}
		},
		methods: {
			submitForm(formName) {
				var vm = this
				console.log(vm.$refs.ruleForm2)
				vm.$refs[formName].validate((valid) => {
					console.log(valid)
					if(valid) {
						var params = new URLSearchParams()
						params.append("userName", vm.ruleForm2.username)
						params.append("passWord", vm.ruleForm2.password)
						
						vm.$http({
							method: 'post',
							url: vm.url,
							params: params
						}).then((response) => {
							if(response.data){
								console.log(response.data); //成功回调
								if(response.data.status == 1){
									this.$message.success(response.data.msg);
									localStorage.setItem('ms_username', response.data.userName);
									this.$router.push('/table');
								}else{
									this.$message.error(response.data.msg);
								}
							}else{
								this.$message.error('请求失败');
							}//成功回调
						}, (response) => {
							//失败回调
							this.$message.error('请求失败');
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	}
</script>

<style scoped>
	.login-wrap {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
	.ms-title {
		position: absolute;
		top: 50%;
		width: 100%;
		margin-top: -230px;
		text-align: center;
		font-size: 30px;
		color: #fff;
	}
	
	.ms-login {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 300px;
		height: 210px;
		margin: -150px 0 0 -190px;
		padding: 40px;
		border-radius: 5px;
		background: #fff;
	}
	
	.login-btn {
		text-align: center;
	}
	
	.login-btn button {
		width: 100%;
	}
</style>