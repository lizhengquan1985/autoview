<template>
  <div class="role-manage">
    <div>
      <el-button @click="listEmptySellIsFinished()" icon="search" type="primary">搜索</el-button>
      <span>{{emptyList.length}}</span>
    </div>
    <br/>
    <el-table
      border
      :data="emptyList"
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="人"
        width="40">
      </el-table-column>
      <el-table-column
        prop="symbol"
        label="物"
        width="68">
      </el-table-column>
      <el-table-column
        label="quote"
        width="65">
        <template slot-scope="scope">
          <div :style="{color:scope.row.usdt>0.3?'red':'black'}">
            {{scope.row.quoteEarn.toFixed(4, '')}}
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
        width="135">
        <template slot-scope="scope">
          <div>
            {{scope.row.sellTradePrice.toFixed(4, '')}}~
            {{scope.row.buyTradePrice.toFixed(4, '')}}
          </div>
          <div :style="{color:(scope.row.buyTradePrice / scope.row.sellTradePrice)>1.05?'red':'black'}">
            {{(scope.row.sellTradePrice / scope.row.buyTradePrice).toFixed(3, '')}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="sellQuantity"
        label="quantity"
        width="140">
        <template slot-scope="scope">
          <div>出：{{scope.row.sellQuantity.toFixed(4, '')}}</div>
          <div>入：{{scope.row.buyQuantity.toFixed(4, '')}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="总波动"
        width="120">
        <template slot-scope="scope">
          <div>出：{{scope.row.sellAmount.toFixed(4, '')}}</div>
          <div>入：{{scope.row.buyAmount.toFixed(4, '')}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="from~to"
        width="155">
        <template slot-scope="scope">
          {{scope.row.sellDate | formatDate }}
          {{scope.row.buyDate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteEmpty(scope.row.sellOrderId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    deleteEmpty,
    listEmptyOrderIsFinished,
  } from '../../api/empty';

  export default {
    components: {},
    name: 'emptyOrder',
    data() {
      return {
        emptyList: [],
      };
    },
    created: function() {
      this.listEmptySellIsFinished();
    },
    computed: {},
    methods: {
      listEmptySellIsFinished: function() {
        listEmptyOrderIsFinished().then(data => {
          data = data.data || data;
          this.emptyList = data;
        });
      },
      deleteEmpty: function(sellOrderId) {
        this.$confirm('删除吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteEmpty({sellOrderId}).then(() => {
            this.listEmptySellIsFinished();
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
