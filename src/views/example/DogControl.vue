<template>
  <div style="padding: 5px;">
    <div>
      <el-input v-model="symbolName" style="width: 150px;"  @keyup.enter.native="search()"/>
    </div>
    <div v-if="controlObj" style="width: 600px;">
      <div class="item">
        <label>maxInputPrice:</label>
        <el-input-number size="small" v-model="controlObj.maxInputPrice" style="width: 100px;"/>
        <el-date-picker
          size="mini"
          v-model="controlObj.maxInputPriceExpiredTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>

      <div class="item">
        <label>avgInputAmount:</label>
        <el-input-number size="small" v-model="controlObj.avgInputAmount" style="width: 100px;"/>

        <el-date-picker
          size="mini"
          v-model="controlObj.avgInputExpiredTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>

      <div class="item">
        <label>doempty:</label>
        <el-input-number size="small" v-model="controlObj.emptyPrice" style="width: 100px;"/>
        <el-date-picker
          size="mini"
          v-model="controlObj.emptyExpiredTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>

      <div class="item">
        <label>predictPrice:</label>
        <el-input-number size="small" v-model="controlObj.predictPrice" style="width: 100px;"/>
        <el-date-picker
          size="mini"
          v-model="controlObj.predictExpiredTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div style="text-align: center;">
        <el-button type="primary" size="mini" @click="saveControlObj()">保存</el-button>
      </div>
    </div>

    <el-table
      v-else
      border
      size="mini"
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
          <el-input-number size="small" v-model="scope.row.maxInputPrice" style="margin-bottom: 2px;"/>
          <el-date-picker
            size="mini"
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
          <el-input-number size="small" v-model="scope.row.avgInputAmount" style="margin-bottom: 2px;"/>
          <el-date-picker
            size="mini"
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
          <el-input-number size="small" v-model="scope.row.emptyPrice" style="margin-bottom: 2px;"/>
          <el-date-picker
            size="mini"
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
          <el-input-number size="small" v-model="scope.row.predictPrice" style="margin-bottom: 2px;"/>
          <el-date-picker
            size="mini"
            v-model="scope.row.predictExpiredTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="save(scope.$index)">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {listDogControl, createDogControl} from '../../api/dogControl';

  export default {
    components: {},
    name: 'HelloWorld',
    data() {
      return {
        symbolName: '',
        dataList: [],
        tlCount: 0,
        tlAmount: 0,
        tlNowAmount: 0,
        yxqDetail: [],
        formLabelWidth: '100px',
        controlObj: null,
      };
    },
    created: function() {
      this.init();
    },
    computed: {
      controlObj: function() {
        return;
      },
    },
    methods: {
      init: function() {
        this.listDogControl();
      },
      listDogControl: function() {
        listDogControl({}).then(data => {
          console.log(3333333333, data.data);
          this.dataList = data.data;
        });
      },
      save: function(index) {
        createDogControl(this.dataList[index]);
      },
      search: function() {
        this.controlObj = this.dataList.find(it => it.symbolName === this.symbolName);
      },
      saveControlObj: function() {
        createDogControl(this.controlObj);
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
