<template>
  <div style="padding: 5px;">
    <el-card>
      <el-input v-model="params.quote" size="mini" style="width: 120px;" placeholder="quote"
                @click.native="changeQuoteCurrency"/>
      <el-input v-model="params.symbol" size="mini" style="width: 120px;" placeholder="symbol"/>
      <el-button size="mini" @click="listSymbolConfig()" type="primary">搜搜</el-button>
      <el-button size="mini" @click="showEdit()" type="primary">新增</el-button>
      <el-tag>{{dataList.length}}</el-tag>
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
          width="135">
          <template slot-scope="scope">
            <div style="line-height: 14px;">
              <div>
                <el-tag @click="showEdit(scope.row)">
                  {{scope.row.symbol}}
                </el-tag>
                <el-tag type="danger" size="mini" v-if="scope.row.willDelist" style="color:red;">将退市</el-tag>
              </div>
              <div>
                <close-item :tickers="tickers" :symbol="scope.row.symbol" :quote="scope.row.quote"/>
              </div>
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
          width="165">
          <template slot-scope="scope">
            <div style="line-height: 14px;">
              <more-item :tickers="tickers" :symbol="scope.row.symbol" :quote="scope.row.quote"
                         :maxBuyPrice="scope.row.maxBuyPrice"/>
              <empty-item :tickers="tickers" :symbol="scope.row.symbol" :quote="scope.row.quote"
                         :minSellPrice="scope.row.minSellPrice"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="avgPrice"
          label="avgPrice">
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
        <el-form-item label="willDelist：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-checkbox size="small" v-model="form.willDelist" style="width: 200px;"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
        <el-button type="primary" @click="upsertSymbolConfig('ruleForm')">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    listSymbolConfig,
    refreshHistoryMaxMin,
    upsertSymbolConfig,
  } from '../../api/symbolConfig';
  import CloseItem from './SymbolConfigComponents/CloseItem';
  import MoreItem from './SymbolConfigComponents/MoreItem';
  import EmptyItem from './SymbolConfigComponents/EmptyItem';

  export default {
    components: {CloseItem, MoreItem, EmptyItem},
    name: 'DogControl',
    data() {
      return {
        params: {
          quote: 'usdt',
          symbol: '',
        },
        dataList: [],
        formLabelWidth: '180px',
        form: {},
        dialogFormVisible: false,
        tickers: [],
      };
    },
    created: function() {
      this.init();
    },
    computed: {},
    methods: {
      changeQuoteCurrency() {
        if (this.params.quote === 'usdt') {
          this.params.quote = 'btc';
        } else if (this.params.quote === 'btc') {
          this.params.quote = 'eth';
        } else if (this.params.quote === 'eth') {
          this.params.quote = 'ht';
        } else if (this.params.quote === 'ht') {
          this.params.quote = 'usdt';
        }
      },
      init: function() {
        this.listSymbolConfig();
      },
      listSymbolConfig: function() {
        const params = {...this.params};
        listSymbolConfig(params).then(data => {
          this.dataList = data.data.list;
          this.tickers = data.data.tickers || [];
        });
      },
      showEdit: function(row = {emptyPrice: 99999, maxInputPrice: 0.000001}) {
        this.dialogFormVisible = true;
        this.form = {...row};
      },
      upsertSymbolConfig: function() {
        upsertSymbolConfig(this.form).then(() => {
          this.dialogFormVisible = false;
          this.listSymbolConfig();
        });
      },
      refreshHistoryMaxMin: function(symbolName) {
        const {quoteCurrency} = this;
        refreshHistoryMaxMin({symbolName, quoteCurrency}).then(() => {
          this.listSymbolConfig();
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
