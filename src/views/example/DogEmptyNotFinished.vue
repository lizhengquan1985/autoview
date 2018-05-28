<template>
  <div class="app-container">
    <div>
      <el-input v-model="symbolName" style="width: 200px;"/>{{coinList.length}}
      <el-button @click="listEmptySellIsNotFinished()" icon="search" type="primary">搜索</el-button>
    </div>
    <br/>
    <el-table
      border
      :data="coinList"
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="userName"
        width="110">
      </el-table-column>
      <el-table-column
        prop="sellTradePrice"
        label="sellTradePrice"
        width="115">
        <template slot-scope="scope">
          {{scope.row.sellTradePrice.toFixed(4)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="sellState"
        label="sellState"
        width="110">
      </el-table-column>
      <el-table-column
        prop="sellOrderId"
        label="sellOrderId"
        width="110">
      </el-table-column>
      <el-table-column
        prop="sellDate"
        label="sellDate"
        width="110">
      </el-table-column>
      <el-table-column
        prop="isFinished"
        label="isFinished"
        width="110">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="shouge(scope.row.sellOrderId)">收割</el-button>
          <el-button size="mini" @click="forceShouge(scope.row.sellOrderId)">强制收割</el-button>
          <el-button size="mini" @click="orderShouge(scope.row.sellOrderId)">指令收割</el-button>
          <el-button size="mini" @click="orderForceShouge(scope.row.sellOrderId)">指令强制收割</el-button>
          <el-button size="mini" @click="orderHuiben(scope.row.sellOrderId)">指令强制收割</el-button>
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
    createOrderReap
  } from '../../api/orderReap';
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    components: {ElButton},
    name: 'HelloWorld',
    data() {
      return {
        symbolName: '',
        emptyList: [],
        coinList:[]
      };
    },
    created: function () {
    },
    computed: {},
    methods: {
      listEmptySellIsNotFinished: function () {
        const {symbolName} = this;
        listEmptySellIsNotFinished({symbolName}).then(data => {
          data = data.data || data;
          this.coinList = data;
        });
      },
      shouge: function (orderId) {
        shouge({orderId}).then(()=>{})
      },
      forceShouge: function (orderId) {
        forceShouge({orderId}).then(()=>{})
      },
      orderShouge: function (orderId) {
        createOrderReap({
          reapType:0,
          orderId,
          isMore:false
        }).then(()=>{

        })
      },
      orderForceShouge: function (orderId) {
        createOrderReap({
          reapType:1,
          orderId,
          isMore:false
        }).then(()=>{

        })
      },
      orderHuiben: function (orderId) {
        createOrderReap({
          reapType:2,
          orderId,
          isMore:false
        }).then(()=>{

        })
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
