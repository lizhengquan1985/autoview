<template>
  <div class="role-manage">
    <div class="filter-container">
      <el-button type="primary" size="small" v-on:click="showAddAccount()">新增账户</el-button>
    </div>
    <el-table
      border
      :data="accountList"
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="用户名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="realName"
        label="姓名"
        width="150">
      </el-table-column>
      <el-table-column
        label="状态"
        width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.isDeleted | isDeletedDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="opt"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="showEditAccount(scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteAccount(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" v-show="accountCount > 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagination.pageSize"
        background
        layout="total, sizes, prev, pager, next"
        :total="accountCount">
      </el-pagination>
    </div>
    <el-dialog :title="!!form.id?'编辑账户':'新增账户'" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="账户名称：" :label-width="formLabelWidth" v-show="!form.id" prop="userName">
          <el-input v-model="form.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" :label-width="formLabelWidth">
          <el-input v-model="form.realName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称：" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户备注：" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            v-model="form.memo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色选择：" :label-width="formLabelWidth" class="permissions-select" prop="roleIds">
          <div class="permissions-select">
            <el-select v-model="form.roleIds" multiple placeholder="请选择" :style="{width:'410px'}">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="upsertAccount('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {fetchLZQDetail } from '../../api/auto'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        pagination: {
          current: 1,
          pageSize: 10
        },
        roleList: [],
        accountList: [],
        accountCount: 0,
        dialogFormVisible: false,
        form: {
          userName: '',
          memo: '1'
        },
        rules: {
          userName: [
            {required: true, message: '请输入账户名', trigger: 'blur'},
            {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}
          ],
          roleIds: [
            {required: true, message: '请选择角色', trigger: 'change'}
          ]
        },
        formLabelWidth: '100px'
      }
    },
    filters: {
      isDeletedDesc: function (isDeleted) {
        return isDeleted ? '已删除' : '正常'
      }
    },
    created: function () {
      this.init()
    },
    computed: {},
    methods: {
      init: function () {
        this.fetchLZQDetail()
      },
      fetchLZQDetail: function () {
        fetchLZQDetail({}).then(data => {
          this.roleList = data.results
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .role-manage {
    padding: 20px;
  }

  .permissions-select {
    text-align: left;
  }

  .permissions-select .el-tag {
    margin-right: 5px;
  }
</style>
