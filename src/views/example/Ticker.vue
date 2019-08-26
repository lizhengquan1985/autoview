<template>
  <div class="role-manage">
    <div>
      <el-button @click="listTickerSymbolDTO()" icon="search" type="primary">搜索</el-button>
      <span>{{tickerList.length}}</span>
    </div>
    <br/>
    <el-table
      border
      :data="tickerList"
      style="width: 100%">
      <el-table-column
        prop="quote"
        label="quote"
        width="65">
      </el-table-column>
      <el-table-column
        prop="symbol"
        label="symbol"
        width="72">
      </el-table-column>
      <el-table-column
        prop="notFinishedEmptyCount"
        label="空单数"
        width="68">
      </el-table-column>
      <el-table-column
        prop="notFinishedMoreCount"
        label="多单数"
        width="68">
      </el-table-column>
      <el-table-column
        prop="nowEmptyRate"
        label="nowEmptyRate"
        width="68">
      </el-table-column>
      <el-table-column
        prop="nowMoreRate"
        label="nowMoreRate"
        width="68">
        <template slot-scope="scope">
          <div style="line-height: 14px;">
            <div>{{scope.row.nowMoreRate}}</div>
            <div>{{scope.row.moreUserName}}</div>
          </div>
        </template>
      </el-table-column>


      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <a target="_blank"
             :href="`http://118.31.44.235/api/Ticker/doMoreByHand?quote=${scope.row.quote}&symbol=${scope.row.symbol}&username=&buyAmount=&sellLadder=`">多</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    listTickerSymbolDTO,
  } from '../../api/ticker';

  export default {
    components: {},
    name: 'emptyOrder',
    data() {
      return {
        tickerList: [],
      };
    },
    created: function () {
      this.listTickerSymbolDTO();
    },
    computed: {},
    methods: {
      listTickerSymbolDTO: function () {
        listTickerSymbolDTO().then(data => {
          data = data.data || data;
          this.tickerList = data;
        });
      },
      deleteEmpty: function (sellOrderId) {
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
