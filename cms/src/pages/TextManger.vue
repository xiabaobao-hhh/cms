<template>
  <div class="app">
   
    <el-button class="btns" type='danger' size='mini' @click='toAddUser'>新增</el-button>
    
    <el-table :data="users" style="width: 100%" v-loading='loading'  @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>

      <el-table-column
        prop="nickname"
        label="真实姓名">
      </el-table-column>
      <el-table-column
        prop="email"
        label="电子邮箱">
      </el-table-column>
    <el-table-column label="操作" width='120'>
          <template slot-scope='{row}'>
            <i class="fa fa-trash" @click='deleteUser(row.id)'></i>
            <i class="fa fa-pencil" @click='toUpdateUser(row)'></i>
          </template>
        </el-table-column>
    </el-table>
        <!-- table结束 -->
        <!-- 模态框开始 -->
      <el-dialog :title="cDialog.title" :visible.sync="cDialog.visible">
    
      <el-form :model="cDialog.form" size="mini" label-position="left" >
        <el-form-item label="用户名" label-width="6em">
          <el-input v-model="cDialog.form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" label-width="6em">
          <el-input v-model="cDialog.form.nickname" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" label-width="6em">
          <el-input v-model="cDialog.form.email"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size='mini'@click = 'closeCDialog'>取 消</el-button>
        <el-button type="primary" size='mini' @click= 'saveOrUpdateUser'>确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
  import axios from '@/http/axios'
  export default{
    data(){
      return{
          users:[],
           multipleSelection:[],
          loading:false ,
          cDialog:{
            title:'',
            visible:false,
            form:{}
         
          }
      }

    },
    methods:{
        handleSelectionChange(val){
            this.multipleSelection = val;
           },
        toUpdateUser(row){
        this.cDialog.title='修改用户';
        this.cDialog.id = row.id;
        // row.parentId = row.parent.id;
        this.cDialog.form=row;
        this.cDialog.visible = true;
      },
          // 提交保存或者跟新用户信息
        saveOrUpdateUser(){
          // 
          axios.post('/manager/user/saveOrUpdateUser',this.cDialog.form)
            .then(()=>{
          this.$notify.success({
            title: '成功',
            message: '提交成功！'
          });
          // this.cDialog.form= {};
          this.closeCDialog();
          this.findAllUser();
        })
        .catch(()=>{
          this.$notify.error({
            title: '错误',
            message: '提交失败！'
          });
        });
        },
        closeCDialog(){
          this.cDialog.title = {};
          this.cDialog.visible = false;
        },
         toAddUser(){
          this.cDialog.title = '新增用户';
          this.cDialog.visible = 'true';
         },

        // 通过id删除用户
      deleteUser(id){
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          axios.get('/manager/user/deleteUserById?id='+id)
          .then(()=>{
            this.$notify.success({
              title: '成功',
              message: '删除成功！'
            });
            this.findAllUser();
          })
          .catch(()=>{
            this.$notify.error({
              title: '错误',
              message: '删除失败！'
            });
          });
        })
      },
          //查询所有用户
      findAllUser(){
         this.loading=true;
        axios.get('/manager/user/findAllUser')
        .then(({data:result})=>{
            this.users = result.data;
            console.log(result);
        })
        .catch(()=>{
            this.$notify.error({
            title: '错误',
            message: '网络异常！'
          });
        })
        .finally(()=>{
          this.loading = false;
        })
      }
    },
    created(){
      //
      this.findAllUser();
    }
  }
 
</script>
