<template>
  <div class="app-container">
    <div>
      <el-radio-group v-model="sort" size="mini">
        <el-radio-button label="lastbuy">时间顺序</el-radio-button>
        <el-radio-button label="more">多</el-radio-button>
        <el-radio-button label="shou">收</el-radio-button>
      </el-radio-group>
      <el-input v-model="userName" size="mini" style="width: 80px;" @focus="userName=(userName==='qq'?'xx':'qq')"/>
      <el-input v-model="symbol" size="mini" style="width: 100px;"/>
      <el-input v-model="quote" size="mini" style="width: 80px;" @click.native="changeQuoteCurrency"/>
      <el-button @click="listMoreOrderIsNotFinished()" icon="search" type="primary">搜索</el-button>
    </div>
    <div>
      <label>种类数量：{{moreList.length}}</label>
      <label>总笔数：{{totalBiShu}}</label>
      <label>总额度：{{totalAmount}}</label>
    </div>
    <br/>
    <el-table
      :data="moreList"
      :row-class-name="tableRowClassName"
      style="width: 100%">
      <el-table-column
        label="Id"
        width="120">
        <template slot-scope="scope">
          <div>{{scope.row.buyOrderId}}</div>
          <div style="line-height: 14px;">
            <div v-if="todayDic[scope.row.symbol]">{{todayDic[scope.row.symbol].toFixed(4,'')}}</div>
            <div v-if="todayDic[scope.row.symbol+'-']">{{todayDic[scope.row.symbol+'-'].toFixed(4,'')}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="人"
        width="80">
        <template slot-scope="scope">
          <div>{{scope.row.userName}}</div>
          <div style="line-height: 14px;">
            <div style="color: blue;" v-if="todayDic[scope.row.symbol+'+']>1.005">
              {{todayDic[scope.row.symbol+'+'].toFixed(4,'')}}
            </div>
            <div v-else-if="todayDic[scope.row.symbol+'+']">{{todayDic[scope.row.symbol+'+'].toFixed(4,'')}}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="symbol"
        label="物"
        width="135">
        <template slot-scope="scope">
          <div>{{scope.row.symbol}}(<span :style="{color:scope.row.count>10?'':'red'}">{{scope.row.count}})</span>
          </div>
          <div>
          <span
            v-if="symbol && scope.$index>0">{{(scope.row.buyTradePrice / moreList[scope.$index - 1].buyTradePrice).toFixed(3, '')}}</span>
          </div>
          <div style="line-height: 14px;">
            <div v-if="maxBuyPrice[scope.row.symbol] > closeDic[scope.row.symbol]">
              多：{{maxBuyPrice[scope.row.symbol]}}
            </div>
            <div v-else style="color: red;">多：{{maxBuyPrice[scope.row.symbol]}}</div>
            <div v-if="minSellPrice[scope.row.symbol] > closeDic[scope.row.symbol]">
              空：{{minSellPrice[scope.row.symbol]}}
            </div>
            <div v-else style="color: red;"> 空：{{minSellPrice[scope.row.symbol]}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="入"
        width="150">
        <template slot-scope="scope">
          <div>{{scope.row.buyTradePrice | fixedPrice}}</div>
          <div>
          <span
            v-if="closeDic[scope.row.symbol]"
            :style="{color:( scope.row.buyTradePrice / closeDic[scope.row.symbol])>=1.06?'red':(( scope.row.buyTradePrice / closeDic[scope.row.symbol]) > 1.04?'deeppink':'black')}">
            {{(scope.row.buyTradePrice / closeDic[scope.row.symbol]).toFixed(3,'')}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="now-more"
        width="150">
        <template slot-scope="scope">
          <div v-if="closeDic[scope.row.symbol]">
            {{closeDic[scope.row.symbol] | fixedPrice}}
          </div>
          <div>
          <span
            v-if="closeDic[scope.row.symbol]"
            :style="{color:(closeDic[scope.row.symbol] / scope.row.buyTradePrice)>=1.05?'red':'black'}">{{(closeDic[scope.row.symbol] / scope.row.buyTradePrice).toFixed(3,'')}}</span>
          </div>
        </template>
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
          {{(scope.row.buyQuantity * scope.row.buyTradePrice).toFixed(5, '')}}
        </template>
      </el-table-column>
      <el-table-column
        prop="buyDate"
        label="date"
        width="95">
        <template slot-scope="scope">
          {{scope.row.buyDate | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <div style="margin-bottom: 5px;">
            <el-button size="mini" @click="shouge(scope.row.buyOrderId)">shou</el-button>
          </div>
          <div>
            <el-button size="mini" @click="doMore(scope.row.symbol, scope.row.quote, scope.row.userName)">
              doMore
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    listMoreOrderIsNotFinished,
    shouge,
  } from '../../api/more';
  import {doMore} from '../../api/empty';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        sort: 'lastbuy',
        userName: 'qq',
        symbol: '',
        quote: 'usdt',
        moreList: [],
        closeDic: {},
        todayDic: {},
        maxBuyPrice: {},
        minSellPrice: {},
        totalAmount: 0,
      };
    },
    created: function() {
      this.listMoreOrderIsNotFinished();
    },
    computed: {
      totalBiShu() {
        let bishu = 0;
        for (const item of this.moreList) {
          bishu += item.count;
        }
        return bishu;
      },
    },
    methods: {
      changeQuoteCurrency() {
        if (this.quote === 'usdt') {
          this.quote = 'btc';
        } else if (this.quote === 'btc') {
          this.quote = 'eth';
        } else if (this.quote === 'eth') {
          this.quote = 'ht';
        } else if (this.quote === 'ht') {
          this.quote = 'trx';
        } else if (this.quote === 'trx') {
          this.quote = 'usdt';
        }
      },
      listMoreOrderIsNotFinished: function() {
        const {symbol, userName, sort, quote} = this;
        listMoreOrderIsNotFinished({symbol, quote, userName, sort}).then(data => {
          data = data.data || data;
          this.moreList = data.list;
          this.closeDic = data.closeDic;
          this.todayDic = data.todayDic;
          this.maxBuyPrice = data.maxBuyPrice;
          this.minSellPrice = data.minSellPrice;
          let totalAmount = 0;
          for (var item of this.moreList) {
            totalAmount += item.buyQuantity * item.buyTradePrice;
          }
          this.totalAmount = totalAmount;
        });
      },
      shouge: function(orderId) {
        shouge({orderId}).then(() => {
        });
      },
      tableRowClassName({row, rowIndex}) {
        const close = this.closeDic[row.symbol];
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
      doMore: function(symbol, quote, userName) {
        doMore({userName, symbol, quote}).then(() => {

        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
