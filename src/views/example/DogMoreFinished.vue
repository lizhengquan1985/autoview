<template>
  <div class="role-manage">
    <div>
      <el-select v-model="userName" clearable>
        <el-option value="qq">qq</el-option>
        <el-option value="xx">xx</el-option>
      </el-select>
      <el-input v-model="symbolName" style="width: 200px;"/>
      <el-button @click="listMoreBuyIsFinished()" icon="search" type="primary">搜索</el-button>
      <span>{{moreList.length}}</span>
    </div>
    <br/>
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
            {{scope.row.buyTradePrice.toFixed(4, '')}}~
            {{scope.row.sellTradePrice.toFixed(4, '')}}
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
        prop="buyAmount"
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


    <el-dialog title="详情" :visible.sync="dialogVisible" width="500px">
      <div>
        <div v-for="item in Object.keys(detail)"><span class="detail-item">{{item}}</span> {{detail[item]}}</div>
      </div>
      <div>
        <el-button type="danger" @click="deleteMore(detail.buyOrderId)">删除</el-button>
        <el-button type="primary" style="float: right;" @click="dialogVisible=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {listMoreBuyIsFinished, getMoreBuyDetail, deleteMore, listMoreBuyIsFinishedDetail} from '../../api/more';
  import echarts from 'echarts';
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

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
        dialogVisible: false,
        formLabelWidth: '100px',
        detail: {}
      };
    },
    created: function () {
      this.listMoreBuyIsFinished();
    },
    computed: {},
    methods: {
      listMoreBuyIsFinished: function () {
        const {userName, symbolName} = this;
        listMoreBuyIsFinishedDetail({userName, symbolName, pageIndex: 0, pageSize: 30}).then(data => {
          data = data.data || data;
          this.moreList = data;
        });
      },
      showDetail: function (buyOrderId) {
        getMoreBuyDetail({buyOrderId}).then(data => {
          this.detail = data.data;
          this.detail.buyOrderId = buyOrderId;
          this.dialogVisible = true;
        })
      },
      deleteMore: function (buyOrderId) {
        this.$confirm('删除吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMore({buyOrderId}).then(data => {
            this.listMoreBuyIsFinished();
            this.dialogVisible = false;
          })
        })
      }
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
