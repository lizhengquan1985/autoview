<template>
  <div class="role-manage">
    <el-card>
      <span style="margin-right: 10px;">数量：{{moreList.length}}</span>
      <el-button size="mini" @click="listMoreBuyIsFinished()" icon="search" type="primary">搜索</el-button>
      <span style="margin-right: 10px;">U：<el-tag>{{usdtAmount.toFixed(2, '')}}</el-tag></span>
      <span style="margin-right: 10px;">B：<el-tag>{{btcAmount.toFixed(5, '')}}</el-tag></span>
      <span style="margin-right: 10px;">E：<el-tag>{{ethAmount.toFixed(4, '')}}</el-tag></span>
      <span style="margin-right: 10px;">H：<el-tag>{{htAmount.toFixed(3, '')}}</el-tag></span>
    </el-card>
    <div style="margin-top: 2px;">
      <el-table
        border
        :data="moreList"
        style="width: 100%">
        <el-table-column
          prop="userName"
          label="人"
          width="40">
        </el-table-column>
        <!--<el-table-column-->
          <!--label="物"-->
          <!--width="90">-->
          <!--<template slot-scope="scope">-->
            <!--{{scope.row.symbol}}-{{scope.row.quote}}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          label="quote"
          width="85">
          <template slot-scope="scope">
            <div :style="{color:scope.row.usdt>0.3?'red':'black'}">
              {{scope.row.quoteEarn.toFixed(6, '')}}
              <div>{{scope.row.quote}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="symbol"
          width="80">
          <template slot-scope="scope">
            {{scope.row.symbolEarn.toFixed(4, '')}}
            <div>{{scope.row.symbol}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="波动"
          width="155">
          <template slot-scope="scope">
            <div>
              {{scope.row.buyTradePrice.toFixed(scope.row.buyTradePrice > 1 ? 3 : 6, '')}}~
              {{scope.row.sellTradePrice.toFixed(scope.row.buyTradePrice > 1 ? 3 : 6, '')}}
            </div>
            <div :style="{color:(scope.row.sellTradePrice / scope.row.buyTradePrice)>1.05?'red':'black'}">
              {{(scope.row.sellTradePrice / scope.row.buyTradePrice).toFixed(3, '')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="buyQuantity"
          label="quantity"
          width="140">
          <template slot-scope="scope">
            <div>入：{{scope.row.buyQuantity.toFixed(4, '')}}</div>
            <div>出：{{scope.row.sellQuantity.toFixed(4, '')}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="总波动"
          width="120">
          <template slot-scope="scope">
            <div>入：{{scope.row.buyAmount.toFixed(5, '')}}</div>
            <div>出：{{scope.row.sellAmount.toFixed(5, '')}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="buyDate"
          label="from~to"
          width="155">
          <template slot-scope="scope">
            {{scope.row.buyDate | formatDate }}
            {{scope.row.sellDate | formatDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteMore(scope.row.buyOrderId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {deleteMore, listMoreOrderIsFinished} from '../../api/more';
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue';

  export default {
    components: {ElButton},
    name: 'HelloWorld',
    data() {
      return {
        moreList: [],
        usdtAmount: 0,
        btcAmount: 0,
        ethAmount: 0,
        htAmount: 0,
      };
    },
    created: function() {
      this.listMoreBuyIsFinished();
    },
    computed: {},
    methods: {
      listMoreBuyIsFinished: function() {
        const {userName, symbolName} = this;
        listMoreOrderIsFinished({userName, symbolName, pageIndex: 0, pageSize: 60}).then(data => {
          data = data.data || data;
          this.moreList = data;
          let usdtAmount = 0;
          let btcAmount = 0;
          let ethAmount = 0;
          let htAmount = 0;
          data.forEach(it => {
            if (it.quote === 'usdt') {
              usdtAmount += it.quoteEarn;
            }
            if (it.quote === 'btc') {
              btcAmount += it.quoteEarn;
            }
            if (it.quote === 'eth') {
              ethAmount += it.quoteEarn;
            }
            if (it.quote === 'ht') {
              htAmount += it.quoteEarn;
            }
          });
          this.usdtAmount = usdtAmount;
          this.btcAmount = btcAmount;
          this.ethAmount = ethAmount;
          this.htAmount = htAmount;
        });
      },
      deleteMore: function(buyOrderId) {
        this.$confirm('删除吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteMore({buyOrderId}).then(data => {
            this.listMoreBuyIsFinished();
          });
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .role-manage {
    padding: 20px;
  }

</style>
