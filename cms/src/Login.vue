<template>

	<div class="login " >
		   <img src="@/assets/back.png" alt="">
		  	<div class="high" >
		  		<h2 class="title">文章管理系统</h2>
		    <el-form ref='userForm' :rules='rules' :model="form" size="mini" label-position="left" >
	        <el-form-item prop='username' label="username" label-width="6em">
	        <el-input v-model="form.username"></el-input>
	        </el-form-item>
	        <el-form-item prop='password' label="password" label-width="6em">
	        <el-input v-model="form.password" type="password"></el-input>
	    </el-form-item>

	  </el-form>
		
	  <div class="btns">
	  	<el-button size="mini" @click='login'>Login</el-button>
	  </div>
	 </div>  
	</div>
	
</template>
<script>
	
	import axios from '@/http/axios'
	export default {
		data(){
			return {
				form:{},
				rules:{
					username:[{
						required:true,
						message:'请输入用户名',
						trigger:'blur'
					}],
					password:[{
						required:true,
						message:'请输入密码',
						trigger:'blur'
					}]
				}
			}
		},
		methods:{
			    // refs强制校验
			login(){
				this.$refs.userForm.validate((valid)=>{
					if(valid){
						axios.post('/login',this.form)
						.then(({data:result})=>{
							if(result.status == 200 && result.message=='登录成功'){
								//登录成功的处理
								//1. 页面跳转
								window.vm.currentComponent='App';
								//2. 用户信息的保存
								localStorage.setItem('user',JSON.stringify(result.data))
							}
						})
						.catch((error)=>{
							this.$notify.error({
								title:'错误',
								message:'网络异常'
							});
						});
					}
				})
			}
		}
	}
</script>
<style scoped>


     body{

    	padding: 0;
     	margin: 0;
     }
 
	input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
	}   

	.login img{

		width: 100%;
		height: 612px; 

	}
 .high{
	 	width: 350px;
	 	height: 350px;
   margin: 0 auto;
    
    position: absolute;
    top : 150px;
    left: 500px;
			box-shadow: 10px 10px 10px 5px #888888;
			border-radius:25px;
       
   }
	 .title{
	 	margin-left: 20px;
	 }
	 .btns{
	 	width: 50px;
	 position: relative;
	 left: 180px;
	 
	 }
	 .btns:hover {

    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
        }
    .el-form {
  	  padding: 25px;
  	   }
   

</style>