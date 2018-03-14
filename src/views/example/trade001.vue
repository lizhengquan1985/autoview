<template>
  <div class="role-manage">
    <el-table
      border
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="Date"
        label="日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="TAmount"
        label="投入资金"
        width="150">
      </el-table-column>
      <el-table-column
        prop="Count"
        label="投入笔数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="Sy"
        label="收益(单位美元)">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {fetchTradeRecord } from '../../api/trade'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        tlCount: 0,
        tlAmount: 0,
        yxqDetail: [],
        formLabelWidth: '100px'
      }
    },
    created: function () {
      this.init()
    },
    computed: {},
    methods: {
      init: function () {
        this.fetchTradeRecord()
      },
      fetchTradeRecord: function () {
        fetchTradeRecord({}).then(data => {
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
