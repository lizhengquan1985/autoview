<template>
  <div class="app-container">
    <div>
      <el-input v-model="symbolName" style="width: 200px;"/>
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
          <span
            :style="{color:(scope.row.sellTradePrice / closeDic[scope.row.symbolName])>=1.04?'red':'black'}">{{(scope.row.sellTradePrice / closeDic[scope.row.symbolName]).toFixed(3, '')}}</span>
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
          <el-button size="mini" @click="forceShouge(scope.row.sellOrderId)">force shou</el-button>
          <!--<el-button size="mini" @click="orderShouge(scope.row.sellOrderId)">指令收割</el-button>-->
          <!--<el-button size="mini" @click="orderForceShouge(scope.row.sellOrderId)">指令强制收割</el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    listEmptySellIsNotFinished,
    shouge,
    forceShouge,
  } from '../../api/empty';
  import {
    createOrderReap,
  } from '../../api/orderReap';

  export default {
    components: {},
    name: 'HelloWorld',
    data() {
      return {
        symbolName: '',
        emptyList: [],
        closeDic: {},
        totalAmount: 0,
      };
    },
    created: function() {
    },
    computed: {},
    methods: {
      listEmptySellIsNotFinished: function() {
        const {symbolName} = this;
        listEmptySellIsNotFinished({symbolName}).then(data => {
          data = data.data || data;
          this.emptyList = data.list;
          this.closeDic = data.closeDic;
          let totalAmount = 0;
          for (var item of this.emptyList) {
            totalAmount += item.sellQuantity * item.sellTradePrice;
          }
          this.totalAmount = totalAmount;
        });
      },
      shouge: function(orderId) {
        shouge({orderId}).then(() => {});
      },
      forceShouge: function(orderId) {
        forceShouge({orderId}).then(() => {});
      },
      orderShouge: function(orderId) {
        createOrderReap({
          reapType: 0,
          orderId,
          isMore: false,
        }).then(() => {

        });
      },
      orderForceShouge: function(orderId) {
        createOrderReap({
          reapType: 1,
          orderId,
          isMore: false,
        }).then(() => {

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
