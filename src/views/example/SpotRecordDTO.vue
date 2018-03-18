<template>
  <div class="role-manage">
    <div>
      <el-button @click="fetchSpotRecordDTO()" icon="search" type="primary">搜索</el-button>
      <span>{{list.length}}</span>
    </div>
    <br/>
    <el-table
      border
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="统计日期"
        label="date"
        width="190">
      </el-table-column>
      <el-table-column
        prop="交易笔数"
        label="count"
        width="120">
      </el-table-column>
      <el-table-column
        prop="投出金额"
        label="putamount"
        width="120">
        <template slot-scope="scope">
          <span>{{(parseFloat(scope.row.投出金额)).toFixed(4)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="sy"
        width="120">
        <template slot-scope="scope">
          <span>{{(parseFloat(scope.row.收益)).toFixed(4)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="收益率"
        label="rate"
        width="120">
        <template slot-scope="scope">
          <span>{{(parseFloat(scope.row.收益率)).toFixed(4)}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {fetchSpotRecordDTO} from '../../api/spotrecord'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        coin: 'eos',
        order: 'Id',
        username: '',
        list: [],
        hasSell: '0',
        formLabelWidth: '100px'
      }
    },
    created: function () {
    },
    computed: {},
    methods: {
      fetchSpotRecordDTO: function () {
        fetchSpotRecordDTO({}).then(data => {
          data = data.data || data
          this.list = data
        })
      }
    }
  }
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
</style>
