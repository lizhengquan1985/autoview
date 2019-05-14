<template>
  <div style="padding: 5px;">
    <el-card>
      <el-input v-model="quoteCurrency" size="mini" style="width: 120px;" @click.native="changeQuoteCurrency"/>
      <el-button size="mini" @click="listDogControl()" type="primary">搜搜</el-button>
      <el-button size="mini" @click="showEdit({ emptyPrice:99999, maxInputPrice:0.000001})" type="primary">新增
      </el-button>
      {{dataList.length}}
      <el-button size="mini" @click="refreshEmpty()" type="primary">刷新空</el-button>
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
          label="empty">
          <template slot-scope="scope">
            <div style="line-height: 14px;">
              <div>多:<span
                v-if="closeDic[scope.row.symbolName]>scope.row.maxInputPrice">{{scope.row.maxInputPrice}}<span
                style="color: red;">---不可狗--</span></span>
                <span v-else style="color:blue;">{{scope.row.maxInputPrice}}</span>
              </div>
              <div>空:<span :style="{color:closeDic[scope.row.symbolName]<scope.row.emptyPrice?'black':'red'}">{{scope.row.emptyPrice}}</span>
              </div>
            </div>
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
    listDogControl, createDogControl, refreshHistoryMaxMin, refreshEmpty,
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
      refreshEmpty: function(symbolName) {
        const {quoteCurrency} = this;
        refreshEmpty({symbolName, quoteCurrency}).then(() => {
          this.listDogControl();
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
