<template>
  <div class="role-manage">
    <div>
      <el-select v-model="username" clearable>
        <el-option value="qq">qq</el-option>
        <el-option value="xx">xx</el-option>
      </el-select>
      <el-button @click="listPigMoreStatisticsDay()" icon="search" type="primary">搜索</el-button>
      <span>{{list.length}}</span>
    </div>
    <br/>
    <el-table
      border
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="bDate"
        label="bDate"
        width="100">
      </el-table-column>
      <el-table-column
        prop="bCount"
        label="bCount"
        width="80">
      </el-table-column>
      <el-table-column
        prop="bAmount"
        label="bAmount"
        width="90">
        <template slot-scope="scope">
            {{scope.row.bAmount.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="sDate"
        label="SDate"
        width="100">
      </el-table-column>
      <el-table-column
        prop="sCount"
        label="SCount"
        width="80">
      </el-table-column>
      <el-table-column
        prop="sAmount"
        label="sAmount"
        width="90">
        <template slot-scope="scope">
          {{scope.row.bAmount.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="earning"
        label="earning"
        width="80">
        <template slot-scope="scope">
          {{scope.row.earning.toFixed(2) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {listPigMoreStatisticsDay} from '../../api/pigMore';
  import echarts from 'echarts';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        min: 0,
        max: 0,
        coin: '',
        order: 'Id',
        username: 'qq',
        coinList: [],
        list: [],
        hasSell: '0',
        formLabelWidth: '100px',
        info: {}
      };
    },
    created: function () {
      this.listPigMoreStatisticsDay();
    },
    computed: {},
    methods: {
      listPigMoreStatisticsDay: function () {
        const {username} = this;
        listPigMoreStatisticsDay({username}).then(data => {
          data = data.data || data;
          this.list = data;
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
</style>
