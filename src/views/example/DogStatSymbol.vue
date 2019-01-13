<template>
  <div style="padding: 5px;">
    <el-card>
      <el-input-number size="mini" v-model="intervalDay" style="width: 80px;"/>
      <el-input size="mini" v-model="userName" style="width: 80px;" @click.native="changeUserName"/>
      <el-button size="mini" @click="initAccountInfo()" type="primary">查询</el-button>
      <span>{{list.length}}</span>
    </el-card>
    <div style="margin-top: 5px;">
      <el-table
        border
        size="mini"
        :data="list"
        height="700"
        style="width: 100%">
        <el-table-column
          prop="symbolName"
          label="名称"
          width="75">
        </el-table-column>
        <el-table-column
          label="in"
          width="75">
          <template slot-scope="scope">
            <div>
              {{(parseFloat(scope.row[dateList[0]]) * closeDic[scope.row.symbolName]).toFixed(3, '')}}
            </div>
          </template>
        </el-table-column>
        <template v-for="(date, index) in dateList">
          <el-table-column
            :prop="date"
            :label="date"
            width="105">
            <template slot-scope="scope">
              <div style="line-height: 14px;">
              <span
                style="color: red;"
                v-if="dateList.length > (index + 1) && parseFloat(scope.row[date]) > parseFloat(scope.row[dateList[index + 1]])">
              {{(parseFloat(scope.row[date])).toFixed(5, '')}}
                <div>
                增:{{(parseFloat(scope.row[date]) - parseFloat(scope.row[dateList[index + 1]])).toFixed(5, '')}}
                  </div>
              </span>
                <span v-else-if="scope.row[date]">
              {{(parseFloat(scope.row[date])).toFixed(5, '')}}
              </span>
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {
    listDogStatCurrency,
  } from '../../api/dogControl';

  export default {
    components: {},
    name: 'HelloWorld',
    data() {
      return {
        userName: 'qq',
        intervalDay: 1,
        list: [],
        dateList: [],
        closeDic: {}
      };
    },
    created: function () {
    },
    computed: {},
    methods: {
      initAccountInfo: function () {
        const userName = this.userName;
        const intervalDay = this.intervalDay;
        listDogStatCurrency({userName, intervalDay}).then(({data}) => {
          this.list = data.data;
          this.dateList = data.dateList;
          this.closeDic = data.closeDic;
        });
      },
      changeUserName() {
        if (this.userName === 'qq') {
          this.userName = 'xx';
        } else if (this.userName === 'xx') {
          this.userName = 'qq';
        }
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item {
    margin-bottom: 10px;
  }

  .item > label {
    display: inline-block;
    width: 160px;
    margin-right: 10px;
    text-align: right;
  }

  .item > .el-input-number {
    width: 180px !important;
    margin-right: 10px;
  }
</style>
