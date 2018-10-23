<template>
  <div class="app-container">
    <el-card>
      <el-select v-model="userName" style="width: 100px;">
        <el-option value="qq">qq</el-option>
        <el-option value="xx">xx</el-option>
      </el-select>
      <el-input v-model="symbolName" style="width: 100px;"/>
      <el-input v-model="quoteCurrency" style="width: 100px;" @click.native="changeQuoteCurrency"/>
      <el-button @click="moreInfo()" icon="search" type="primary">搜索</el-button>
      <el-button @click="doMore()" icon="search" type="primary">more once</el-button>
      <div>
        <label>总次数：{{moreList.length}}</label>
        <label>总额度：{{totalAmount}}</label>
        <label>总数量：{{totalQuantity}}</label>
        <label>{{JSON.stringify(balance)}}</label>
      </div>
    </el-card>
    <div style="margin-top: 2px;">
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
  </div>
</template>

<script>
  import {moreInfo} from '../../api/more';
  import {doMore} from '../../api/empty';

  export default {
    components: {},
    name: 'HelloWorld',
    data() {
      return {
        userName: 'qq',
        quoteCurrency: 'usdt',
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
      moreInfo: function() {
        const {symbolName, userName, quoteCurrency} = this;
        moreInfo({symbolName, userName, quoteCurrency}).then(data => {
          data = data.data || data;
          this.moreList = data.list;
          this.balance = data.balanceItem;
          this.totalQuantity = data.totalQuantity;
          let totalAmount = 0;
          for (const item of this.moreList) {
            totalAmount += item.buyQuantity * item.buyTradePrice;
          }
          this.totalAmount = totalAmount;
        });
      },
      doMore: function() {
        const {symbolName, userName, quoteCurrency} = this;
        this.$confirm('确定多吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          doMore({userName, symbolName, quoteCurrency}).then(() => {

          });
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
