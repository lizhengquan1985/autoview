<template>
  <div class="app-container">
    <div>
      <el-select v-model="userName">
        <el-option value="qq">qq</el-option>
        <el-option value="xx">xx</el-option>
      </el-select>
      <el-input v-model="symbolName" style="width: 120px;"/>
      <el-input v-model="quoteCurrency" style="width: 100px;" @click.native="changeQuoteCurrency"/>
      <el-button @click="listEmptySellIsNotFinished()" icon="search" type="primary">搜索</el-button>
    </div>
    <div>
      <label>总次数：{{emptyList.length}}</label>
      <label>总额度：{{totalAmount}}</label>
    </div>
    <br/>
    <el-table
      :data="emptyList"
      :row-class-name="tableRowClassName"
      style="width: 100%">
      <el-table-column
        prop="sellOrderId"
        label="Id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="人"
        width="50">
      </el-table-column>
      <el-table-column
        prop="symbolName"
        label="物"
        width="68">
      </el-table-column>
      <el-table-column
        prop="sellTradePrice"
        label="出"
        width="90">
      </el-table-column>
      <el-table-column
        label="now-more"
        width="150">
        <template slot-scope="scope">
          <div v-if="closeDic[scope.row.symbolName]">
            {{closeDic[scope.row.symbolName].toFixed(4, '')}}
          </div>
          <div>
          <span
            :style="{color:(scope.row.sellTradePrice / closeDic[scope.row.symbolName])>=1.04?'red':'black'}">{{(scope.row.sellTradePrice / closeDic[scope.row.symbolName]).toFixed(3, '')}}</span>
            <span v-if="ladderDic[scope.row.symbolName]">
            {{ladderDic[scope.row.symbolName].toFixed(4, '')}}
          </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="sellQuantity"
        label="quantity"
        width="90">
      </el-table-column>
      <el-table-column
        label="amount"
        width="90">
        <template slot-scope="scope">
          {{(scope.row.sellQuantity * scope.row.sellTradePrice).toFixed(2, '')}}
        </template>
      </el-table-column>
      <el-table-column
        prop="buyDate"
        label="date"
        width="155">
        <template slot-scope="scope">
          {{scope.row.sellDate | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="shouge(scope.row.sellOrderId)">shou</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    listEmptySellIsNotFinished,
    shouge,
  } from '../../api/empty';

  export default {
    components: {},
    name: 'HelloWorld',
    data() {
      return {
        userName: 'qq',
        symbolName: '',
        quoteCurrency: 'usdt',
        emptyList: [],
        closeDic: {},
        ladderDic: {},
        totalAmount: 0,
      };
    },
    created: function() {
    },
    computed: {},
    methods: {
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
      listEmptySellIsNotFinished: function() {
        const {symbolName, userName, quoteCurrency} = this;
        listEmptySellIsNotFinished({symbolName, userName, quoteCurrency}).then(data => {
          data = data.data || data;
          this.emptyList = data.list;
          this.closeDic = data.closeDic;
          this.ladderDic = data.ladderDic || {};
          let totalAmount = 0;
          for (var item of this.emptyList) {
            totalAmount += item.sellQuantity * item.sellTradePrice;
          }
          this.totalAmount = totalAmount;
        });
      },
      shouge: function(orderId) {
        shouge({orderId}).then(() => {
        });
      },
      tableRowClassName({row, rowIndex}) {
        const close = this.closeDic[row.symbolName];
        if (!close) {
          return '';
        }
        if (close / row.buyTradePrice > 1.05) {
          return 'row-red';
        }
        if (close / row.buyTradePrice > 1.03) {
          return 'row-blue';
        }
        if (close / row.buyTradePrice > 1.01) {
          return 'row-green';
        }
        if (row.customerType === 1) {
          return 'customer-probation';
        }
        return '';
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .row-red {
    background-color: rgba(255, 0, 0, 0.2) !important;
  }

  .row-blue {
    background-color: rgba(0, 0, 255, 0.2) !important;
  }

  .row-green {
    background-color: rgba(0, 255, 0, 0.1) !important;
  }
</style>
