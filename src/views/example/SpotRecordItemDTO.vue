<template>
  <div>
    <div style="height: 20px;">
      总数: {{(list||[]).length}}
      总收益: {{total.toFixed(4)}}
    </div>
    <el-table
      border
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="统计日期"
        label="date"
        width="100">
      </el-table-column>
      <el-table-column
        prop="交易笔数"
        label="count"
        width="70">
      </el-table-column>
      <el-table-column
        prop="投出金额"
        label="putamount"
        width="100">
        <template slot-scope="scope">
          <span>{{(parseFloat(scope.row.投出金额)).toFixed(4)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="sy"
        width="75">
        <template slot-scope="scope">
          <span>{{(parseFloat(scope.row.收益)).toFixed(4)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="收益率"
        label="rate">
        <template slot-scope="scope">
          <span>{{(parseFloat(scope.row.收益率)).toFixed(4)}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: ['list', 'total'],
    data() {
      return {
      };
    },
    created: function() {
    },
    computed: {},
    methods: {},
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
