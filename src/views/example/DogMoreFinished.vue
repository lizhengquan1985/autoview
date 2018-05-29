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
        prop="buyTradePrice"
        label="buyTradePrice"
        width="130">
      </el-table-column>
      <el-table-column
        prop="buyQuantity"
        label="buyQuantity"
        width="120">
      </el-table-column>
      <el-table-column
        label="总额"
        width="90">
        <template slot-scope="scope">
          {{(scope.row.buyTradePrice * scope.row.buyQuantity).toFixed(3) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="buyState"
        label="buyState"
        width="90">
      </el-table-column>
      <el-table-column
        prop="buyDate"
        label="buyDate"
        width="155">
        <template slot-scope="scope">
          {{scope.row.buyDate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row.buyOrderId)">详情</el-button>
          <el-button @click="deleteMore(scope.row.buyOrderId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="Error Log" :visible.sync="dialogVisible" width="500px">
      <div>
        <div v-for="item in Object.keys(detail)"><span class="detail-item">{{item}}</span> {{detail[item]}}</div>
      </div>
      <div>
        <el-button @click="dialogVisible=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {listMoreBuyIsFinished, getMoreBuyDetail, deleteMore} from '../../api/more';
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
        listMoreBuyIsFinished({userName, symbolName}).then(data => {
          data = data.data || data;
          this.moreList = data;
        });
      },
      showDetail: function (buyOrderId) {
        getMoreBuyDetail({buyOrderId}).then(data => {
          this.detail = data.data;
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
