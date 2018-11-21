<template>
  <div class="role-manage">
    <el-card>
      <el-select v-model="userName" clearable size="mini">
        <el-option value="qq">qq</el-option>
        <el-option value="xx">xx</el-option>
      </el-select>
      <el-input size="mini" v-model="symbolName" style="width: 150px;"/>
      <el-button size="mini" @click="listMoreBuyIsFinished()" icon="search" type="primary">搜索</el-button>
      <span style="margin-right: 10px;">数量：{{moreList.length}}</span>
      <span>USDT：{{usdtAmount.toFixed(4, '')}}</span>
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
        <el-table-column
          prop="symbolName"
          label="物"
          width="68">
        </el-table-column>
        <el-table-column
          label="quote"
          width="85">
          <template slot-scope="scope">
            <div :style="{color:scope.row.usdt>0.3?'red':'black'}">
              {{scope.row.usdt.toFixed(6, '')}}
              <div>{{scope.row.quoteCurrency}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="symbol"
          width="80">
          <template slot-scope="scope">
            {{scope.row.baseSymbol.toFixed(4, '')}}
            <div>{{scope.row.symbolName}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="波动"
          width="155">
          <template slot-scope="scope">
            <div>
              {{scope.row.buyTradePrice.toFixed(scope.row.buyTradePrice>1?3:6, '')}}~
              {{scope.row.sellTradePrice.toFixed(scope.row.buyTradePrice>1?3:6, '')}}
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
            <div>入：{{scope.row.buyAmount.toFixed(4, '')}}</div>
            <div>出：{{scope.row.sellAmount.toFixed(4, '')}}</div>
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
          prop="buyState"
          label="state"
          width="90">
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
  import {deleteMore, listMoreBuyIsFinishedDetail} from '../../api/more';
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue';

  export default {
    components: {ElButton},
    name: 'HelloWorld',
    data() {
      return {
        min: 0,
        max: 0,
        coin: '',
        order: 'Id',
        userName: 'qq',
        symbolName: '',
        moreList: [],
        hasSell: '0',
        formLabelWidth: '100px',
        detail: {},
        usdtAmount: 0,
      };
    },
    created: function() {
      this.listMoreBuyIsFinished();
    },
    computed: {},
    methods: {
      listMoreBuyIsFinished: function() {
        const {userName, symbolName} = this;
        listMoreBuyIsFinishedDetail({userName, symbolName, pageIndex: 0, pageSize: 60}).then(data => {
          data = data.data || data;
          this.moreList = data;
          let usdtAmount = 0;
          data.forEach(it => {
            usdtAmount += it.usdt;
          });
          this.usdtAmount = usdtAmount;
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

  .permissions-select {
    text-align: left;
  }

  .permissions-select .el-tag {
    margin-right: 5px;
  }

  .detail-item {
    display: inline-block;
    width: 100px;
    text-align: right;
    margin-right: 10px;
  }
</style>
