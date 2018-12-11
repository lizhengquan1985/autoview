<template>
  <div style="padding: 5px;">
    <el-card>
      <el-select size="mini" v-model="sort">
        <el-option label="default" :value="`default`"/>
        <el-option label="currencyasc" :value="`currencyasc`"/>
        <el-option label="currencydesc" :value="`currencydesc`"/>
        <el-option label="canEmptyAmountasc" :value="`canEmptyAmountasc`"/>
        <el-option label="canEmptyAmountdesc" :value="`canEmptyAmountdesc`"/>
      </el-select>
      <el-input size="mini" v-model="userName" style="width: 80px;" @click.native="changeUserName"/>
      <el-input size="mini" v-model="quoteCurrency" style="width: 100px;" @click.native="changeQuoteCurrency"/>
      <el-button size="mini" @click="initAccountInfo()" type="primary">查询</el-button>
      <el-button size="mini" @click="initAccountInfo(true)" type="primary">查询并统计</el-button>
      <span>{{totalAmount}}</span>
    </el-card>
    <div style="margin-top: 5px;">
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
          <template slot-scope="scope">
            {{scope.row.canEmptyQuantity}}<span
            style="color:blue;">({{(scope.row.canEmptyQuantity / scope.row.balance).toFixed(3, '')}})</span>
          </template>
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
        sort: 'canEmptyAmountasc',
        quoteCurrency: 'usdt',
        userName: 'qq',
        list: [],
        totalAmount: 0,
      };
    },
    created: function () {
    },
    computed: {},
    methods: {
      initAccountInfo: function (bl = false) {
        console.log(this.order);
        const {userName, sort, quoteCurrency} = this;
        if (!userName || !quoteCurrency) {
          this.list = [];
          return;
        }
        initAccountInfo({userName, sort, quoteCurrency, stat:bl}).then(data => {
          console.log(data);
          this.list = data.data;
          let totalAmount = 0;
          for (const item of this.list) {
            if (item.currency === 'usdt' || item.currency === 'btc' || item.currency === 'eth' || item.currency === 'ht' || item.currency === 'usdt') {
              continue;
            }
            totalAmount += item.canEmptyAmount;
          }
          this.totalAmount = totalAmount;
        });
      },
      changeUserName() {
        if (this.userName === 'qq') {
          this.userName = 'xx';
        } else if (this.userName === 'xx') {
          this.userName = 'qq';
        }
      },
      changeQuoteCurrency() {
        if (this.quoteCurrency === 'usdt') {
          this.quoteCurrency = 'btc';
        } else if (this.quoteCurrency === 'btc') {
          this.quoteCurrency = 'eth';
        } else if (this.quoteCurrency === 'eth') {
          this.quoteCurrency = 'ht';
        } else if (this.quoteCurrency === 'ht') {
          this.quoteCurrency = 'usdt';
        }
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
