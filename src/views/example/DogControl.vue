<template>
  <div style="padding: 5px;">
    <el-card>
      <el-input v-model="quoteCurrency" size="mini" style="width: 120px;" @click.native="changeQuoteCurrency"/>
      <el-button size="mini" @click="listDogControl()" type="primary">搜搜</el-button>
      <el-button size="mini" @click="showEdit({})" type="primary">新增</el-button>
      {{dataList.length}}
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
                  {{scope.row.symbolName}}
                </el-button>
              </div>
              <div style="color: red;"
                   v-if="canEmpty(scope.row)">
                {{closeDic[scope.row.symbolName]}}
              </div>
              <div v-else>{{closeDic[scope.row.symbolName]}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="历史最大最小"
          width="165">
          <template slot-scope="scope">
            <div>
              <div style="line-height: 14px;">
                <div>
                  min:{{scope.row.historyMin}}
                </div>
                <div>
                  max:{{scope.row.historyMax}}
                  <i class="el-icon-refresh" @click="refreshHistoryMaxMin(scope.row.symbolName)"></i>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="empty"
          width="145">
          <template slot-scope="scope">
            <div style="line-height: 14px;">
              <div>多:<span :style="{color:closeDic[scope.row.symbolName]>scope.row.maxInputPrice?'black':'blue'}">{{scope.row.maxInputPrice}}</span>
              </div>
              <div>空:<span :style="{color:closeDic[scope.row.symbolName]<scope.row.emptyPrice?'black':'red'}">{{scope.row.emptyPrice}}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="buy/sell"
          width="100">
          <template slot-scope="scope">
            <div style="line-height: 14px;">
              <div>buy: {{scope.row.ladderBuyPercent.toFixed(4,'')}}</div>
              <div>sell: {{scope.row.ladderSellPercent.toFixed(4,'')}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="up/down"
          width="100">
          <template slot-scope="scope">
            <div style="line-height: 14px;">
              <div>upIndex: {{scope.row.upIndex}}</div>
              <div>downIndex: {{scope.row.downIndex}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="symbolLevel"
          width="100">
          <template slot-scope="scope">
            <div>{{scope.row.symbolLevel}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="编辑配置" :visible.sync="dialogFormVisible" :width="'520px'">
      <el-form :model="form" ref="ruleForm">
        <el-form-item label="symbolName：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input size="small" v-model="form.symbolName" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="quoteCurrency：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input size="small" v-model="form.quoteCurrency" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="maxInputPrice：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.maxInputPrice" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="emptyPrice：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.emptyPrice" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="ladderBuyPercent：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.ladderBuyPercent" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="ladderSellPercent：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.ladderSellPercent" style="width: 200px;"/>
        </el-form-item>

        <el-form-item label="historyMax：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.historyMax" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="historyMin：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.historyMin" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="upIndex：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.upIndex" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="downIndex：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.downIndex" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="symbolLevel：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.symbolLevel" style="width: 200px;"/>
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
        closeDic: {},
      };
    },
    created: function() {
      this.init();
    },
    computed: {},
    methods: {
      changeQuoteCurrency() {
        if (this.quoteCurrency === 'usdt') {
          this.quoteCurrency = 'btc';
        } else if (this.quoteCurrency === 'btc') {
          this.quoteCurrency = 'eth';
        } else if (this.quoteCurrency === 'eth') {
          this.quoteCurrency = 'ht';
        } else if (this.quoteCurrency === 'ht') {
          this.quoteCurrency = 'usdt';
        }
      },
      init: function() {
        this.listDogControl();
      },
      listDogControl: function() {
        const {quoteCurrency} = this;
        listDogControl({quoteCurrency}).then(data => {
          this.dataList = data.data.list;
          this.closeDic = data.data.closeDic || {};
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
<style>
  .el-table--mini td, .el-table--mini th {
    padding: 2px 0 !important;
  }
</style>
