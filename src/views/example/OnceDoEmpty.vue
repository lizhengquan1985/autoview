<template>
  <div class="app-container">
    <el-card>
      <el-select v-model="userName" style="width: 100px;">
        <el-option value="qq">qq</el-option>
        <el-option value="xx">xx</el-option>
      </el-select>
      <el-input v-model="symbolName" style="width: 100px;"/>
      <el-input v-model="quoteCurrency" style="width: 100px;" @click.native="changeQuoteCurrency"/>
      <el-button @click="emptyInfo()" icon="search" type="primary">搜索</el-button>
      <el-button @click="doEmpty()" icon="search" type="primary">empty once</el-button>
      <div>
        <label>count：{{moreList.length}}</label>
        <label>amount：{{totalAmount}}</label>
        <label>quantity：{{totalQuantity}}</label>
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
  </div>
</template>

<script>
  import {emptyInfo} from '../../api/more';
  import {doEmpty} from '../../api/empty';
  import ElCard from 'element-ui/packages/card/src/main';

  export default {
    components: {ElCard},
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
      emptyInfo: function() {
        const {symbolName, userName, quoteCurrency} = this;
        emptyInfo({symbolName, userName, quoteCurrency}).then(data => {
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
      doEmpty: function() {
        const {symbolName, userName, quoteCurrency} = this;
        this.$confirm('确定空吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          doEmpty({userName, symbolName, quoteCurrency}).then(() => {

          });
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
