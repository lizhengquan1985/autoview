<template>
  <div style="padding: 5px;">
    <el-card>
      <el-input v-model="quoteCurrency" size="mini" style="width: 120px;"/>
      <el-button size="mini" @click="listDogControl()" type="primary">搜搜</el-button>
      <el-button size="mini" @click="showEdit({})" type="primary">新增</el-button>
    </el-card>
    <div style="margin-top: 3px;">
      <el-table
        border
        size="mini"
        :data="dataList"
        style="width: 100%">
        <el-table-column
          prop="symbolName"
          label="名称"
          width="125">
          <template slot-scope="scope">
            <div style="line-height: 14px;">
              <div>
                <el-button size="mini" @click="showEdit(scope.row)">
                  {{scope.row.symbolName}}{{scope.row.quoteCurrency}}
                </el-button>
              </div>
              <div style="color: red;"
                   v-if="canEmpty(scope.row)">
                {{closeDic[scope.row.symbolName]}}
              </div>
              <div v-else>{{closeDic[scope.row.symbolName]}}</div>
              <div>
              <span v-if="(Math.max(scope.row.emptyPrice, getRecommend(scope.row))/closeDic[scope.row.symbolName])<1.6"
                    style="color: red;">{{(Math.max(scope.row.emptyPrice, getRecommend(scope.row))/closeDic[scope.row.symbolName]).toFixed(4,'')}}</span>
                <span v-else>{{(Math.max(scope.row.emptyPrice, getRecommend(scope.row))/closeDic[scope.row.symbolName]).toFixed(4,'')}}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="历史最大最小"
          width="165">
          <template slot-scope="scope">
            <div>
              <div v-if="scope.row.historyMin>0">
                <div>
                  {{scope.row.historyMin}} ~ {{scope.row.historyMax}}
                </div>
                推荐:{{getRecommend(scope.row)}}
                <el-button size="mini" @click="refreshHistoryMaxMin(scope.row.symbolName)">刷新</el-button>
              </div>
              <el-button v-else size="mini" @click="refreshHistoryMaxMin(scope.row.symbolName)">刷新</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="empty"
          width="145">
          <template slot-scope="scope">
            <div>{{scope.row.emptyPrice || ''}}
              <el-button size="mini" @click="initEmptyPrice(scope.row.symbolName)">初始</el-button>
            </div>
            <div>{{scope.row.emptyExpiredTime | formatDate}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="maxInputPrice"
          width="135">
          <template slot-scope="scope">
            <div>{{scope.row.maxInputPrice || ''}}</div>
            <div>{{scope.row.maxInputPriceExpiredTime | formatDate}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="ladderBuyPercent"
          width="135">
          <template slot-scope="scope">
            <div>{{scope.row.ladderBuyPercent || ''}}</div>
            <div>{{scope.row.ladderBuyExpiredTime | formatDate}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="阶梯出售比"
          width="135">
          <template slot-scope="scope">
            <div>{{scope.row.ladderSellPercent || ''}}</div>
            <div>{{scope.row.ladderSellExpiredTime | formatDate}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="getFlexCount(scope.row.symbolName)">flex</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="编辑配置" :visible.sync="dialogFormVisible" :width="'520px'">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="symbolName：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input size="small" v-model="form.symbolName" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="quoteCurrency：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input size="small" v-model="form.quoteCurrency" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="maxInputPrice：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.maxInputPrice" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="maxInputExpiredTime：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-date-picker
            size="mini"
            v-model="form.maxInputPriceExpiredTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="avgInputAmount：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.avgInputAmount" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="avgInputExpiredTime：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-date-picker
            size="mini"
            v-model="form.avgInputExpiredTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="emptyPrice：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.emptyPrice" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="emptyExpiredTime：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-date-picker
            size="mini"
            v-model="form.emptyExpiredTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="predictPrice：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.predictPrice" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="predictExpiredTime：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-date-picker
            size="mini"
            v-model="form.predictExpiredTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="ladderBuyPercent：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.ladderBuyPercent" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="ladderBuyExpiredTime：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-date-picker
            size="mini"
            v-model="form.ladderBuyExpiredTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="ladderSellPercent：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.ladderSellPercent" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="ladderSellExpiredTime：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-date-picker
            size="mini"
            v-model="form.ladderSellExpiredTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>


        <el-form-item label="historyMax：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.historyMax" style="width: 200px;"/>
        </el-form-item>

        <el-form-item label="historyMin：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.historyMin" style="width: 200px;"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
        <el-button type="primary" @click="saveControlObj('ruleForm')">确 定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    listDogControl, createDogControl, refreshHistoryMaxMin,
    getFlexCount,
    initEmptyPrice,
  } from '../../api/dogControl';

  export default {
    components: {},
    name: 'DogControl',
    data() {
      return {
        quoteCurrency: 'usdt',
        symbolName: '',
        dataList: [],
        formLabelWidth: '180px',
        form: {},
        dialogFormVisible: false,
        rules: [],
        closeDic: {},
      };
    },
    created: function() {
      this.init();
    },
    computed: {},
    methods: {
      init: function() {
        this.listDogControl();
      },
      listDogControl: function() {
        const {quoteCurrency} = this;
        listDogControl({quoteCurrency}).then(data => {
          this.dataList = data.data;
          console.log(this.dataList);
          // this.closeDic = data.data.closeDic || {};
        });
      },
      getRecommend: function(row) {
        var recommend = (row.historyMin + (row.historyMax - row.historyMin) * 0.2);
        if (recommend < row.historyMin * 1.4) {
          recommend = row.historyMin * 1.4;
        }
        return recommend.toFixed(4, '');
      },
      initEmptyPrice: function(symbolName) {
        const {quoteCurrency} = this;
        initEmptyPrice({symbolName, quoteCurrency}).then(() => {
          this.listDogControl();
        });
      },
      canEmpty: function(row) {
        var recommend = (row.historyMin + (row.historyMax - row.historyMin) * 0.2);
        if (recommend < row.historyMin * 1.4) {
          recommend = row.historyMin * 1.4;
        }
        const nowPrice = this.closeDic[row.symbolName] || 0;
        return nowPrice >= recommend && nowPrice >= row.emptyPrice;
      },
      showEdit: function(row) {
        this.dialogFormVisible = true;
        this.form = {...row};
      },
      saveControlObj: function() {
        createDogControl(this.form).then(() => {
          this.dialogFormVisible = false;
          this.listDogControl();
        });
      },
      refreshHistoryMaxMin: function(symbolName) {
        const {quoteCurrency} = this;
        refreshHistoryMaxMin({symbolName, quoteCurrency}).then(() => {
          this.listDogControl();
        });
      },
      getFlexCount: function(symbolName) {
        return;
        getFlexCount({symbolName}).then(() => {
          this.listDogControl();
        });
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
