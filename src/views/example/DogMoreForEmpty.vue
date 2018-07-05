<template>
  <div class="app-container">
    <div>
      <el-select v-model="userName" clearable>
        <el-option value="qq">qq</el-option>
        <el-option value="xx">xx</el-option>
      </el-select>
      <el-input v-model="symbolName" style="width: 200px;"/>
      <el-button @click="emptyInfo()" icon="search" type="primary">搜索</el-button>
      <el-button @click="doEmpty()" icon="search" type="primary">empty once</el-button>
    </div>
    <div>
      <label>count：{{moreList.length}}</label>
      <label>amount：{{totalAmount}}</label>
      <label>quantity：{{totalQuantity}}</label>
      <label>{{JSON.stringify(balance)}}</label>
    </div>
    <br/>
    <el-table
      border
      :data="moreList"
      style="width: 100%">
      <el-table-column
        prop="buyOrderId"
        label="order"
        width="100">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="人"
        width="58">
      </el-table-column>
      <el-table-column
        prop="buyTradePrice"
        label="入"
        width="90">
      </el-table-column>
      <el-table-column
        prop="buyQuantity"
        label="quantity"
        width="90">
      </el-table-column>
      <el-table-column
        label="amount"
        width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.buyQuantity">
            {{(scope.row.buyQuantity * scope.row.buyTradePrice).toFixed(2, '')}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="date"
        width="155">
        <template slot-scope="scope">
          {{scope.row.buyDate | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="buyState"
        label="state">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {emptyInfo} from '../../api/more';
  import {doEmpty} from '../../api/empty';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        userName: 'qq',
        symbolName: '',
        moreList: [],
        totalAmount: 0,
        totalQuantity: 0,
        balance: null,
      };
    },
    created: function() {
    },
    computed: {},
    methods: {
      emptyInfo: function() {
        const {symbolName, userName} = this;
        emptyInfo({symbolName, userName}).then(data => {
          data = data.data || data;
          this.moreList = data.list;
          this.balance = data.balanceItem;
          this.totalQuantity = data.totalQuantity;
          let totalAmount = 0;
          for (var item of this.moreList) {
            totalAmount += item.buyQuantity * item.buyTradePrice;
          }
          this.totalAmount = totalAmount;
        });
      },
      doEmpty: function() {
        const {symbolName, userName} = this;
        doEmpty({userName, symbolName}).then(() => {

        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
