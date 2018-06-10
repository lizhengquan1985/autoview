<template>
  <div class="app-container">
    <div>
      <el-input v-model="symbolName" style="width: 200px;"/>
      <el-button @click="listMoreBuyIsNotFinished()" icon="search" type="primary">搜索</el-button>
    </div>
    <div>
      <label>总次数：{{moreList.length}}</label>
      <label>总额度：{{totalAmount}}</label>
    </div>
    <br/>
    <el-table
      border
      :data="moreList"
      style="width: 100%">
      <el-table-column
        prop="buyOrderId"
        label="Id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="name"
        width="60">
      </el-table-column>
      <el-table-column
        prop="symbolName"
        label="symbol"
        width="90">
      </el-table-column>
      <el-table-column
        prop="buyState"
        label="buyState"
        width="90">
      </el-table-column>
      <el-table-column
        prop="buyTradePrice"
        label="交易价"
        width="90">
      </el-table-column>
      <el-table-column
        label="now-more"
        width="150">
        <template slot-scope="scope">
          <div v-if="closeDic[scope.row.symbolName]">
            {{closeDic[scope.row.symbolName].toFixed(4, '')}} --> {{(closeDic[scope.row.symbolName] / scope.row.buyTradePrice).toFixed(3, '')}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="buyQuantity"
        label="数量"
        width="90">
      </el-table-column>
      <el-table-column
        prop="buyQuantity"
        label="总额度"
        width="90">
        <template slot-scope="scope">
          {{(scope.row.buyQuantity * scope.row.buyTradePrice).toFixed(2, '')}}
        </template>
      </el-table-column>
      <el-table-column
        prop="buyDate"
        label="buyDate"
        width="155">
        <template slot-scope="scope">
          {{scope.row.buyDate | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="shouge(scope.row.buyOrderId)">收割</el-button>
          <el-button size="mini" @click="forceShouge(scope.row.buyOrderId)">强制收割</el-button>
          <el-button size="mini" @click="orderShouge(scope.row.sellOrderId)">指令收割</el-button>
          <el-button size="mini" @click="orderForceShouge(scope.row.sellOrderId)">指令强制收割</el-button>
          <el-button size="mini" @click="orderHuiben(scope.row.sellOrderId)">指令回本收割</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    listMoreBuyIsNotFinished,
    shouge, forceShouge
  } from '../../api/more';
  import {
    createOrderReap,
  } from '../../api/orderReap';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        symbolName: '',
        moreList: [],
        closeDic: {},
        totalAmount: 0
      };
    },
    created: function () {
    },
    computed: {},
    methods: {
      listMoreBuyIsNotFinished: function () {
        const {symbolName} = this;
        listMoreBuyIsNotFinished({symbolName}).then(data => {
          data = data.data || data;
          this.moreList = data.list;
          this.closeDic = data.closeDic;
          let totalAmount = 0;
          for (var item of this.moreList) {
            totalAmount += item.buyQuantity * item.buyTradePrice
          }
          this.totalAmount = totalAmount;
        });
      },
      shouge: function (orderId) {
        shouge({orderId}).then(() => {
        });
      },
      forceShouge: function (orderId) {
        forceShouge({orderId}).then(() => {
        });
      },
      orderShouge: function (orderId) {
        createOrderReap({
          reapType: 0,
          orderId,
          percent: 1.02,
        }).then(() => {

        });
      },
      orderForceShouge: function (orderId) {
        createOrderReap({
          reapType: 0,
          orderId,
          percent: 1.01,
        }).then(() => {

        });
      },
      orderHuiben: function (orderId) {
        createOrderReap({
          reapType: 0,
          orderId,
          percent: 1.008,
        }).then(() => {

        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
