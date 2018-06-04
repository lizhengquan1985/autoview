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
        prop="sellTradePrice"
        label="sellTradePrice"
        width="130">
      </el-table-column>
      <el-table-column
        prop="sellQuantity"
        label="sellQuantity"
        width="120">
      </el-table-column>
      <el-table-column
        label="总额"
        width="90">
        <template slot-scope="scope">
          {{(scope.row.sellTradePrice * scope.row.sellQuantity).toFixed(3) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="sellState"
        label="sellState"
        width="90">
      </el-table-column>
      <el-table-column
        prop="sellDate"
        label="sellDate"
        width="155">
        <template slot-scope="scope">
          {{scope.row.sellDate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row.sellOrderId)">详情</el-button>
          <el-button @click="deleteEmpty(scope.row.sellOrderId)">删除</el-button>
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
  import {listEmptySellIsFinished, getEmptySellDetail, deleteEmpty} from '../../api/empty';
  import echarts from 'echarts';
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    components: {ElButton},
    name: 'HelloWorld',
    data() {
      return {
        userName: 'qq',
        symbolName: '',
        emptyList: [],
        hasSell: '0',
        dialogVisible: false,
        formLabelWidth: '100px',
        detail: {}
      };
    },
    created: function () {
      this.listEmptySellIsFinished();
    },
    computed: {},
    methods: {
      listEmptySellIsFinished: function () {
        const {userName, symbolName} = this;
        listEmptySellIsFinished({userName, symbolName}).then(data => {
          data = data.data || data;
          this.emptyList = data;
        });
      },
      showDetail: function (sellOrderId) {
        getEmptySellDetail({sellOrderId}).then(data => {
          this.detail = data.data;
          this.dialogVisible = true;
        })
      },
      deleteEmpty: function (sellOrderId) {
        this.$confirm('删除吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteEmpty({sellOrderId}).then(data => {
            this.listEmptySellIsFinished();
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
