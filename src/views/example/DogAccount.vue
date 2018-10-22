<template>
  <div style="padding: 5px;">
    <el-select v-model="order">
      <el-option label="coin" :value="`coin`"/>
      <el-option label="canEmptyAmount" :value="`canEmptyAmount`"/>
    </el-select>
    <el-checkbox v-model="asc"/>
    <el-input v-model="userName" style="width: 200px;"/>
    <el-button size="mini" @click="initAccountInfo()">查询</el-button>
    <el-table
      border
      size="mini"
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="currency"
        label="名称"
        width="75">
      </el-table-column>
      <el-table-column
        prop="buyQuantity"
        label="总狗"
        width="165">
      </el-table-column>
      <el-table-column
        prop="balance"
        label="余啊"
        width="145">
      </el-table-column>
      <el-table-column
        prop="canEmptyQuantity"
        label="剩Q"
        width="155">
      </el-table-column>
      <el-table-column
        prop="canEmptyAmount"
        label="剩M"
        width="155">
      </el-table-column>
      <el-table-column
        prop="nowPrice"
        label="nowP"
        width="145">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    initAccountInfo,
  } from '../../api/dogControl';

  export default {
    components: {},
    name: 'HelloWorld',
    data() {
      return {
        order: '',
        asc: true,
        userName: '',
        list: [],
      };
    },
    created: function() {
    },
    computed: {},
    methods: {
      initAccountInfo: function() {
        console.log(this.order);
        const userName = this.userName;
        if (!userName) {
          this.list = [];
          return;
        }
        if (this.list.length > 0) {
          this.list.sort((a, b) => {
            if (this.asc) {
              return a[this.order] - b[this.order];
            } else {
              return b[this.order] - a[this.order];
            }
          });
          return;
        }
        initAccountInfo({userName}).then(data => {
          console.log(data);
          this.list = data.data;
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item {
    margin-bottom: 10px;
  }

  .item > label {
    display: inline-block;
    width: 160px;
    margin-right: 10px;
    text-align: right;
  }

  .item > .el-input-number {
    width: 180px !important;
    margin-right: 10px;
  }
</style>
