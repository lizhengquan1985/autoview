<template>
  <div class="app-container">
    <div>
      <el-input v-model="userName" style="width:120px;" @focus="userName=(userName==='qq'?'xx':'qq')"/>
      <el-select v-model="sort">
        <el-option label="zimu" value="zimu"/>
        <el-option label="count" value="count"/>
        <el-option label="maxmin" value="maxmin"/>
        <el-option label="amount" value="amount"/>
        <el-option label="nowamount" value="nowamount"/>
        <el-option label="diffamount" value="diffamount"/>
      </el-select>
      <el-input v-model="quote" style="width: 100px;" @click.native="changeQuoteCurrency"/>
      <el-button @click="listMoreOrderNotFinishedStatistics()">搜索</el-button>
      {{list.length}}
    </div>
    <div class="filter-container">
      <span>tao-now：{{nowTotalAmount}}</span>
      <span>tao：{{totalAmount}}</span>
      <span>kui：{{totalAmount - nowTotalAmount}}</span>
    </div>
    <el-table
      border
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="symbolName"
        label="物"
        width="90">
      </el-table-column>
      <el-table-column
        prop="minPrice"
        label="min"
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.minPrice}}<span style="color:red;">({{(scope.row.maxPrice/scope.row.minPrice).toFixed(2,'')}})</span></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="maxPrice"
        label="max"
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.maxPrice}}<span style="color:red;">({{(scope.row.minPrice/scope.row.maxPrice).toFixed(2,'')}})</span></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalQuantity"
        label="quantity"
        width="110">
      </el-table-column>
      <el-table-column
        prop="totalAmount"
        label="amount"
        width="110">
      </el-table-column>
      <el-table-column
        prop="nowTotalAmount"
        label="nowAmount"
        width="110">
      </el-table-column>
      <el-table-column
        prop="count"
        label="count"
        width="60">
        <template slot-scope="scope">
          <span v-if="scope.row.count < 10" style="color:red;">{{scope.row.count}}</span>
          <span v-else>{{scope.row.count}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {listMoreOrderNotFinishedStatistics} from '../../api/more';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        sort: 'maxmin',
        userName: 'qq',
        quote: 'usdt',
        list: [],
        totalAmount: 0,
        nowTotalAmount: 0,
        formLabelWidth: '100px',
      };
    },
    filters: {
      isDeletedDesc: function(isDeleted) {
        return isDeleted ? '已删除' : '正常';
      },
    },
    created: function() {
      this.init();
    },
    computed: {},
    methods: {
      changeQuoteCurrency() {
        if (this.quote === 'usdt') {
          this.quote = 'btc';
        } else if (this.quote === 'btc') {
          this.quote = 'eth';
        } else if (this.quote === 'eth') {
          this.quote = 'ht';
        } else if (this.quote === 'ht') {
          this.quote = 'trx';
        } else if (this.quote === 'trx') {
          this.quote = 'usdt';
        }
      },
      init: function() {
        this.listMoreOrderNotFinishedStatistics();
      },
      listMoreOrderNotFinishedStatistics: function() {
        const {userName, sort, quote} = this;
        listMoreOrderNotFinishedStatistics({userName, sort, quote}).then(data => {
          data = data.data || data;
          this.list = data;
          let nowTotalAmount = 0;
          let totalAmount = 0;
          for (const item of data) {
            nowTotalAmount += item.nowTotalAmount;
            totalAmount += item.totalAmount;
          }
          this.nowTotalAmount = nowTotalAmount;
          this.totalAmount = totalAmount;
        });
      },
    },
  };
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
