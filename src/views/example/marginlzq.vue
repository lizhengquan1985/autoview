<template>
  <div class="role-manage">
    <div class="filter-container">
      账户:lzq, 统计从2018年3月1日开始的交易情况,个人操作不统计
    </div>
    <div class="filter-container">
      <span>套牢笔数：{{tlCount}}</span>
      <span>套牢资金：{{tlAmount}}</span>
      <span>套牢市值：{{tlNowAmount}}</span>
    </div>
    <div class="filter-container">
      <span>总收益：{{totalSy}}</span>
      <span>总亏损：{{tlAmount - tlNowAmount}}</span>
      <span>净收益：{{totalSy - tlAmount + tlNowAmount}}</span>
    </div>
    <el-table
      border
      :data="lzqDetail"
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
  import {fetchLZQMarginDetail} from '../../api/auto'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        tlCount: 0,
        tlAmount: 0,
        tlNowAmount:0,
        lzqDetail: [],
        formLabelWidth: '100px'
      }
    },
    filters: {
      isDeletedDesc: function (isDeleted) {
        return isDeleted ? '已删除' : '正常'
      }
    },
    created: function () {
      this.init()
    },
    computed: {},
    methods: {
      init: function () {
        this.fetchLZQMarginDetail()
      },
      fetchLZQMarginDetail: function () {
        fetchLZQMarginDetail({}).then(data => {
          data = data.data || data
          var result = data.Result
          const {tlCount, tlAmount, totalSy, tlNowAmount, detail} = result
          this.tlCount = tlCount
          this.tlAmount = tlAmount
          this.tlNowAmount = tlNowAmount
          this.totalSy = totalSy
          this.lzqDetail = detail
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
