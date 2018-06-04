<template>
  <div class="app-container">
    <div>
      <el-select v-model="userName" clearable>
        <el-option value="qq">qq</el-option>
        <el-option value="xx">xx</el-option>
      </el-select>
      <el-input v-model="symbolName" style="width: 200px;"/>
      <el-button @click="emptyInfo()" icon="search" type="primary">搜索</el-button>
    </div>
    <div>
      <label>总次数：{{moreList.length}}</label>
      <label>总额度：{{totalAmount}}</label>
      <label>总数量：{{totalQuantity}}</label>
      <label>{{JSON.stringify(balance)}}</label>
    </div>
    <br/>
    <el-table
      border
      :data="moreList"
      style="width: 100%">
      <el-table-column
        prop="buyOrderId"
        label="订单"
        width="100">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="userName"
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
          {{scope.row.buyDate | formatDate}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {emptyInfo} from '../../api/more';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        userName: 'qq',
        symbolName: '',
        moreList: [],
        totalAmount: 0,
        totalQuantity:0,
        balance:null
      };
    },
    created: function () {
    },
    computed: {},
    methods: {
      emptyInfo: function () {
        const {symbolName, userName} = this;
        emptyInfo({symbolName,userName}).then(data => {
          data = data.data || data;
          this.moreList = data.list;
          this.balance = data.balanceItem;
          this.totalQuantity = data.totalQuantity;
          let totalAmount = 0;
          for (var item of this.moreList) {
            totalAmount += item.buyQuantity * item.buyTradePrice
          }
          this.totalAmount = totalAmount;
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
