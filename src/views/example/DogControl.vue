<template>
  <div style="padding: 5px;">
    <el-table
      border
      :data="dataList"
      style="width: 100%">
      <el-table-column
        prop="symbolName"
        label="名称"
        width="60">
      </el-table-column>
      <el-table-column
        label="最大投入价格"
        width="240">
        <template slot-scope="scope">
          <el-input v-model="scope.row.maxInputPrice" style="margin-bottom: 2px;"/>
          <el-date-picker
            v-model="scope.row.maxInputPriceExpiredTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column
        label="平均投入额度"
        width="240">
        <template slot-scope="scope">
          <el-input v-model="scope.row.avgInputAmount" style="margin-bottom: 2px;"/>
          <el-date-picker
            v-model="scope.row.avgInputExpiredTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column
        label="做空价格"
        width="240">
        <template slot-scope="scope">
          <el-input v-model="scope.row.emptyPrice" style="margin-bottom: 2px;"/>
          <el-date-picker
            v-model="scope.row.emptyExpiredTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column
        label="预计价格"
        width="240">
        <template slot-scope="scope">
          <el-input v-model="scope.row.predictPrice" style="margin-bottom: 2px;"/>
          <el-date-picker
            v-model="scope.row.predictExpiredTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="save(scope.$index)">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {listDogControl, createDogControl } from '../../api/dogControl'
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  export default {
    components: {
      ElButton,
      ElInput},
    name: 'HelloWorld',
    data () {
      return {
        dataList:[],
        tlCount: 0,
        tlAmount: 0,
        tlNowAmount:0,
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
        this.listDogControl()
      },
      listDogControl: function () {
        listDogControl({}).then(data => {
          console.log(3333333333, data.data)
          this.dataList = data.data;
        })
      },
      save: function (index) {
        createDogControl(this.dataList[index]);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
