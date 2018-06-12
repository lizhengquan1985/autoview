<template>
  <div class="role-manage">
    <div>
      <el-select v-model="userName" clearable>
        <el-option value="qq">qq</el-option>
        <el-option value="xx">xx</el-option>
      </el-select>
      <el-input v-model="symbolName" style="width: 200px;"/>
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
        prop="symbolName"
        label="物"
        width="68">
      </el-table-column>
      <el-table-column
        label="usdt"
        width="65">
        <template slot-scope="scope">
          <div :style="{color:scope.row.usdt>0.3?'red':'black'}">
            {{scope.row.usdt.toFixed(4, '')}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="symbol"
        width="80">
        <template slot-scope="scope">
          {{scope.row.baseSymbol.toFixed(4, '')}}
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
        prop="sellState"
        label="state"
        width="90">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteEmpty(scope.row.sellOrderId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="详情" :visible.sync="dialogVisible" width="500px">
      <div>
        <div v-for="item in Object.keys(detail)"><span class="detail-item">{{item}}</span> {{detail[item]}}</div>
      </div>
      <div>
        <el-button type="danger" @click="deleteEmpty(detail.sellOrderId)">删除</el-button>
        <el-button type="primary" style="float: right;" @click="dialogVisible=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getEmptySellDetail,
    deleteEmpty,
    listEmptySellIsFinishedDetail,
  } from '../../api/empty';

  export default {
    components: {},
    name: 'HelloWorld',
    data() {
      return {
        userName: 'qq',
        symbolName: '',
        emptyList: [],
        hasSell: '0',
        dialogVisible: false,
        formLabelWidth: '100px',
        detail: {},
      };
    },
    created: function() {
      this.listEmptySellIsFinished();
    },
    computed: {},
    methods: {
      listEmptySellIsFinished: function() {
        const {userName, symbolName} = this;
        listEmptySellIsFinishedDetail({userName, symbolName, pageIndex: 0, pageSize: 30}).then(data => {
          data = data.data || data;
          this.emptyList = data;
        });
      },
      showDetail: function(sellOrderId) {
        getEmptySellDetail({sellOrderId}).then(data => {
          this.detail = data.data;
          this.dialogVisible = true;
        });
      },
      deleteEmpty: function(sellOrderId) {
        this.$confirm('删除吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteEmpty({sellOrderId}).then(data => {
            this.listEmptySellIsFinished();
            this.dialogVisible = false;
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
