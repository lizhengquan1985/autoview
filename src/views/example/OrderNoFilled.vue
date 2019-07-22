<template>
  <div style="padding: 5px;">
    <el-card>
      <el-button size="mini" @click="listNotFilledData()" type="primary">刷新</el-button>
      <span>moreOrderList: <el-tag>{{moreOrderList.length}}</el-tag></span>
      <span>moreOrderProfitList: <el-tag>{{moreOrderProfitList.length}}</el-tag></span>
      <span>emptyOrderList: <el-tag>{{emptyOrderList.length}}</el-tag></span>
      <span>emptyOrderProfitList: <el-tag>{{emptyOrderProfitList.length}}</el-tag></span>
    </el-card>
    <div v-if="moreOrderList && moreOrderList.length > 0" style="margin-top: 5px;">
      <el-table
        border
        size="mini"
        :data="moreOrderList"
        style="width: 100%">
        <el-table-column
          prop="quote"
          label="quote"
          width="75">
        </el-table-column>
        <el-table-column
          prop="symbol"
          label="symbol"
          width="75">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="user"
          width="65">
        </el-table-column>
        <el-table-column
          prop="buyState"
          label="buyState"
          width="110">
        </el-table-column>
        <el-table-column
          prop="buyDate"
          label="buyDate"
          width="145">
        </el-table-column>
        <el-table-column
          prop="buyOrderPrice"
          label="buyOrderPrice"
          width="110">
        </el-table-column>
        <el-table-column
          label="nowPrice"
          width="100">
          <template slot-scope="scope">
            <span>{{symbolClose[scope.row.symbol+scope.row.quote]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="buyQuantity"
          label="buyQuantity"
          width="95">
        </el-table-column>
        <el-table-column
          prop="buyTradeQuantity"
          label="buyTradeQuantity">
        </el-table-column>
      </el-table>
    </div>

    <div v-if="moreOrderProfitList && moreOrderProfitList.length > 0" style="margin-top: 5px;">
      <el-table
        border
        size="mini"
        :data="moreOrderProfitList"
        style="width: 100%">
        <el-table-column
          prop="quote"
          label="quote"
          width="75">
        </el-table-column>
        <el-table-column
          prop="symbol"
          label="symbol"
          width="75">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="user"
          width="65">
        </el-table-column>
        <el-table-column
          prop="sellState"
          label="sellState"
          width="110">
        </el-table-column>
        <el-table-column
          prop="sellDate"
          label="sellDate"
          width="145">
        </el-table-column>
        <el-table-column
          prop="sellOrderPrice"
          label="sellOrderPrice"
          width="110">
        </el-table-column>
        <el-table-column
          label="nowPrice"
          width="100">
          <template slot-scope="scope">
            <span>{{symbolClose[scope.row.symbol+scope.row.quote]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sellQuantity"
          label="sellQuantity"
          width="95">
        </el-table-column>
        <el-table-column
          prop="sellTradeQuantity"
          label="sellTradeQuantity">
        </el-table-column>
      </el-table>
    </div>

    <div v-if="emptyOrderList && emptyOrderList.length > 0" style="margin-top: 5px;">
      <el-table
        border
        size="mini"
        :data="emptyOrderList"
        style="width: 100%">
        <el-table-column
          prop="quote"
          label="quote"
          width="75">
        </el-table-column>
        <el-table-column
          prop="symbol"
          label="symbol"
          width="75">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="user"
          width="65">
        </el-table-column>
        <el-table-column
          prop="sellState"
          label="sellState"
          width="110">
        </el-table-column>
        <el-table-column
          prop="sellDate"
          label="sellDate"
          width="145">
        </el-table-column>
        <el-table-column
          prop="sellOrderPrice"
          label="sellOrderPrice"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sellQuantity"
          label="sellQuantity"
          width="95">
        </el-table-column>
        <el-table-column
          prop="sellTradeQuantity"
          label="sellTradeQuantity">
        </el-table-column>
      </el-table>
    </div>

    <div v-if="emptyOrderProfitList && emptyOrderProfitList.length > 0" style="margin-top: 5px;">
      <el-table
        border
        size="mini"
        :data="emptyOrderProfitList"
        style="width: 100%">
        <el-table-column
          prop="quote"
          label="quote"
          width="75">
        </el-table-column>
        <el-table-column
          prop="symbol"
          label="symbol"
          width="75">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="user"
          width="65">
        </el-table-column>
        <el-table-column
          prop="buyState"
          label="buyState"
          width="110">
        </el-table-column>
        <el-table-column
          prop="buyDate"
          label="buyDate"
          width="145">
        </el-table-column>
        <el-table-column
          prop="buyOrderPrice"
          label="buyOrderPrice"
          width="120">
        </el-table-column>
        <el-table-column
          prop="buyQuantity"
          label="buyQuantity"
          width="95">
        </el-table-column>
        <el-table-column
          prop="buyTradeQuantity"
          label="buyTradeQuantity">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {
    listNotFilledData,
  } from '../../api/more';

  export default {
    components: {},
    name: 'HelloWorld',
    data() {
      return {
        moreOrderList: [],
        moreOrderProfitList: [],
        emptyOrderList: [],
        emptyOrderProfitList: [],
        symbolClose: {},
      };
    },
    created: function() {
      this.listNotFilledData();
    },
    computed: {},
    methods: {
      listNotFilledData() {
        listNotFilledData({}).then(data => {
          const {moreOrderList, moreOrderProfitList, emptyOrderList, emptyOrderProfitList, symbolClose} = data.data;
          this.moreOrderList = moreOrderList;
          this.moreOrderProfitList = moreOrderProfitList;
          this.emptyOrderList = emptyOrderList;
          this.emptyOrderProfitList = emptyOrderProfitList;
          this.symbolClose = symbolClose;
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
