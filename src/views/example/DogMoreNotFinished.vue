<template>
  <div class="app-container">
    <div>
      <el-radio-group v-model="sort" size="mini">
        <el-radio-button label="lastbuy">时间顺序</el-radio-button>
        <el-radio-button label="more">多</el-radio-button>
        <el-radio-button label="shou">收</el-radio-button>
      </el-radio-group>
      <el-input v-model="userName" size="mini" style="width: 80px;" @focus="userName=(userName==='qq'?'xx':'qq')"/>
      <el-input v-model="symbolName" size="mini" style="width: 100px;"/>
      <el-input v-model="quoteCurrency" size="mini" style="width: 80px;" @click.native="changeQuoteCurrency"/>
      <el-button @click="listMoreBuyIsNotFinished()" icon="search" type="primary">搜索</el-button>
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
          <div v-if="todayDic[scope.row.symbolName]">{{todayDic[scope.row.symbolName].toFixed(4,'')}}</div>
          <div v-if="todayDic[scope.row.symbolName+'-']">{{todayDic[scope.row.symbolName+'-'].toFixed(4,'')}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="人"
        width="80">
        <template slot-scope="scope">
          <div>{{scope.row.userName}}</div>
          <div style="color: blue;" v-if="todayDic[scope.row.symbolName+'+']>1.005">
            {{todayDic[scope.row.symbolName+'+'].toFixed(4,'')}}
          </div>
          <div v-else-if="todayDic[scope.row.symbolName+'+']">{{todayDic[scope.row.symbolName+'+'].toFixed(4,'')}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="symbolName"
        label="物"
        width="68">
        <template slot-scope="scope">
          <div>{{scope.row.symbolName}}(<span :style="{color:scope.row.count>10?'':'red'}">{{scope.row.count}})</span></div>
          <div>
          <span
            v-if="symbolName && scope.$index>0">{{(scope.row.buyTradePrice / moreList[scope.$index - 1].buyTradePrice).toFixed(3, '')}}</span>
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
            v-if="ladderBuyDic[scope.row.symbolName] && closeDic[scope.row.symbolName]"
            :style="{color:( scope.row.buyTradePrice / closeDic[scope.row.symbolName])>=ladderBuyDic[scope.row.symbolName]?'red':(( scope.row.buyTradePrice / closeDic[scope.row.symbolName]) > 1.04?'deeppink':'black')}">
            {{(scope.row.buyTradePrice / closeDic[scope.row.symbolName]).toFixed(3,'')}}</span>
            -- <span style="color: gray;"
                     v-if="ladderBuyDic[scope.row.symbolName]">{{ladderBuyDic[scope.row.symbolName].toFixed(3,'')}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="now-more"
        width="150">
        <template slot-scope="scope">
          <div v-if="closeDic[scope.row.symbolName]">
            {{closeDic[scope.row.symbolName] | fixedPrice}}
          </div>
          <div>
          <span
            v-if="closeDic[scope.row.symbolName]"
            :style="{color:(closeDic[scope.row.symbolName] / scope.row.buyTradePrice)>=1.05?'red':'black'}">{{(closeDic[scope.row.symbolName] / scope.row.buyTradePrice).toFixed(3,'')}}</span>
            --
            <span style="color: gray;" v-if="ladderDic[scope.row.symbolName]">
            {{ladderDic[scope.row.symbolName].toFixed(3, '')}}
          </span>
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
          {{(scope.row.buyQuantity * scope.row.buyTradePrice).toFixed(2, '')}}
        </template>
      </el-table-column>
      <el-table-column
        prop="buyDate"
        label="date"
        width="155">
        <template slot-scope="scope">
          {{scope.row.buyDate | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="shouge(scope.row.buyOrderId)">shou</el-button>
          <el-button size="mini" @click="doMore(scope.row.symbolName, scope.row.quoteCurrency, scope.row.userName)">
            doMore
          </el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    listMoreBuyIsNotFinished,
    shouge,
  } from '../../api/more';
  import {doMore} from '../../api/empty';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        sort: 'lastbuy',
        userName: 'qq',
        symbolName: '',
        quoteCurrency: 'usdt',
        moreList: [],
        closeDic: {},
        todayDic: {},
        ladderDic: {},
        totalAmount: 0,
        ladderBuyDic: {},
      };
    },
    created: function() {
      this.listMoreBuyIsNotFinished();
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
      listMoreBuyIsNotFinished: function() {
        const {symbolName, userName, sort, quoteCurrency} = this;
        listMoreBuyIsNotFinished({symbolName, quoteCurrency, userName, sort}).then(data => {
          data = data.data || data;
          this.moreList = data.list;
          this.closeDic = data.closeDic;
          this.todayDic = data.todayDic;
          this.ladderBuyDic = data.ladderBuyDic || {};
          this.ladderDic = data.ladderDic;
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
      doMore: function(symbolName, quoteCurrency, userName) {
        doMore({userName, symbolName, quoteCurrency}).then(() => {

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
