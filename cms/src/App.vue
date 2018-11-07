<template>
 <div class="app">
   <div class="header">
     <div class="title"> <i class="fa fa-tv"></i> 文章管理系统</div>
     <div class="info">
       <img :src="user.userface" alt="">
       <div class="user1">
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
               <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{user.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item command='logout'>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item command='logout'>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
       </div>
     </div>
   </div>
   <div class="content">
     <div class="left_nav">
        <el-menu
        :router='true'
        default-active='/User'
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/TextManger">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/Article">
          <i class="el-icon-menu"></i>
          <span slot="title" @click='jump("/article")'>文章管理</span>
        </el-menu-item>
        <el-menu-item index="/User">
          <i class="el-icon-document"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/Category">
          <i class="el-icon-setting"></i>
          <span slot="title">栏目管理</span>
        </el-menu-item>
      </el-menu>      
     </div>
     <div class="right_content">
       <div class="wrapper">
       <router-view></router-view>
      </div>
     </div>
   </div>
 </div>
</template>
<script>
import axios from '@/http/axios'
   export default {
     methods: {
       jump(url){
        this.$router.push(url)
       },
       handleCommand(command){
          if(command == 'logout'){
            axios.get('/logout').then(()=>{
              localStorage.removeItem('user')
            });
          }
       }
      },
      created(){
        //处理路由默认显示
        this.currentRoute = this.$route.path;
        //处理用户登录
        let user = JSON.parse(localStorage.getItem('user'));
        if(user){
          this.user = user;
        }else{
          window.vm.currentComponent = 'Login';
        }
      },
      watch:{
        '$route':function(to,form){
          this.currentRoute = to.path;
        }
      },
      data(){
        return{
          msg:'App.vue',
          currentRoute:'/',
          user:{}
        }
      }

    }
  
</script>
<style>
  
  i.fa{
    margin: 0 .5em;
  }
  div{
    padding: 0;
    margin: 0;
  }
  html{
     font: normal normal 12px '微软雅黑','Microsoft YaHei';
    color: #666;
    
   overflow-x: hidden;  
  }
   
  .header {
    position: absolute;
    width: 100%;
    height: 60px;
    top: 0;
    background-color:#545c64;
    padding: 0 2em;
  }
  .header .title {
    color: #ffffff;
    line-height: 60px;
    font-size: 24px;
    float: left;
  }
  .header .info{
    line-height: 60px;
    height: 60px;
    text-align: right;
  }
  .header .info>img{
    width: 50px;
    height: 50px;
    border-radius:50%;
    margin-top: 5px;
    margin-right: 1em; 

  }
  .header .info>.user1{
    
    float: right;
    cursor: pointer;
  }
  .header .info>.user1 .el-dropdown{
    color: pink;
  }
  .content {
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 0;
  }
  .content > .left_nav {
    width: 220px;
    height: 100%;
    float: left;
  }
  .content > .right_content {
    box-sizing: border-box;
    margin-left: 220px;
    height: 100%;
    background-color: #f0f0f0;
    padding: 1em;
  }
  .content > .right_content > .wrapper {
  
    width: 100%;
    height: 100%;
    border-radius: 5px;
    padding:.5em;
    background-color: #ededed;
    overflow-y: auto;
  }
  .el-menu{
    height: 100%;
  }
  

</style>
