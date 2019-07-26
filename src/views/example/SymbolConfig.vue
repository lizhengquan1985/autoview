<template>
  <div style="padding: 5px;">
    <el-card class="card-container">
      <el-input v-model="params.quote" size="mini" style="width: 120px;" placeholder="quote"
                @click.native="changeQuoteCurrency"/>
      <el-input v-model="params.symbol" size="mini" style="width: 120px;" placeholder="symbol"/>
      <el-button size="mini" @click="listSymbolConfig()" type="primary">搜搜</el-button>
      <el-button size="mini" @click="showEdit()" type="primary">新增</el-button>
      <el-tag>{{dataList.length}}</el-tag>
      <el-input-number size="mini" v-model="ladderNum"/>
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
                <el-tag style="cursor: pointer;" size="mini" @click.native="showEdit(scope.row)">
                  {{scope.row.symbol}}
                </el-tag>
                <el-tag type="danger" size="mini" v-if="scope.row.willDelist" style="color:red;">将退市</el-tag>
              </div>
              <div>
                <close-item :key="`ci-${scope.row.symbol}${scope.row.quote}`" :tickers="tickers"
                            :symbol="scope.row.symbol" :quote="scope.row.quote"/>
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
                  <i class="el-icon-refresh" @click="refreshHistoryMaxMin(scope.row.symbol, scope.row.quote)"></i>
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
              <more-item :key="`mi-${scope.row.symbol}${scope.row.quote}`" :tickers="tickers" :symbol="scope.row.symbol"
                         :quote="scope.row.quote" :maxBuyPrice="scope.row.maxBuyPrice"/>
              <empty-item :key="`ei-${scope.row.symbol}${scope.row.quote}`" :tickers="tickers"
                          :symbol="scope.row.symbol"
                          :quote="scope.row.quote" :minSellPrice="scope.row.minSellPrice"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="emptySize"
          width="90">
          <template slot-scope="scope">
            {{scope.row.emptySize.toFixed(5, '')}}
          </template>
        </el-table-column>
        <el-table-column
          label="avgPrice"
          width="90">
          <template slot-scope="scope">
            <span v-if="params.quote === 'btc'">{{scope.row.avgPrice.toFixed(8, '')}}</span>
            <span v-if="params.quote === 'eth'">{{scope.row.avgPrice.toFixed(7, '')}}</span>
            <span v-if="params.quote === 'usdt'">{{scope.row.avgPrice.toFixed(4, '')}}</span>
            <span v-if="params.quote === 'ht'">{{scope.row.avgPrice.toFixed(5, '')}}</span>
            <span v-if="scope.row.avgPrice < scope.row.maxBuyPrice && scope.row.quote !== 'usdt'"
                  style="color:red;">大加权</span>
          </template>
        </el-table-column>
        <el-table-column
          label="ladder"
          width="110">
          <template slot-scope="scope">
            {{(scope.row.historyMin * (1.06**ladderNum)).toFixed(9, '')}}
            <span v-if="scope.row.historyMin * (1.06**ladderNum) < scope.row.maxBuyPrice && scope.row.quote !== 'usdt'"
                  style="color:red;">过大</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="oneQianWanPrice"
          label="1千万">
          <template slot-scope="scope">
            <price-item :key="`1q-${scope.row.symbol}${scope.row.quote}`" :tickers="tickers"
                        :price="scope.row.oneQianWanPrice"
                        :symbol="scope.row.symbol" :quote="scope.row.quote"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="twoQianWanPrice"
          label="2千万">
          <template slot-scope="scope">
            <price-item :key="`2q-${scope.row.symbol}${scope.row.quote}`" :tickers="tickers"
                        :price="scope.row.twoQianWanPrice"
                        :symbol="scope.row.symbol" :quote="scope.row.quote"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="fileQianWanPrice"
          label="5千万">
          <template slot-scope="scope">
            <price-item :key="`5q-${scope.row.symbol}${scope.row.quote}`" :tickers="tickers"
                        :price="scope.row.fileQianWanPrice"
                        :symbol="scope.row.symbol" :quote="scope.row.quote"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="oneYiPrice"
          label="1亿">
          <template slot-scope="scope">
            <price-item :key="`1y-${scope.row.symbol}${scope.row.quote}`" :tickers="tickers"
                        :price="scope.row.oneYiPrice"
                        :symbol="scope.row.symbol" :quote="scope.row.quote"/>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="编辑配置" :visible.sync="dialogFormVisible" :width="'520px'">
      <el-form :model="form" ref="ruleForm">
        <el-form-item label="symbol：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input size="small" v-model="form.symbol" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="quote：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input size="small" v-model="form.quote" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="maxBuyPrice：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.maxBuyPrice" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="minSellPrice：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.minSellPrice" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="emptySize：" :label-width="formLabelWidth" style="margin-bottom: 2px;">
          <el-input-number size="small" v-model="form.emptySize" style="width: 200px;"/>
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
  import PriceItem from './SymbolConfigComponents/PriceItem';

  export default {
    components: {CloseItem, MoreItem, EmptyItem, PriceItem},
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
        ladderNum: 8,
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
          this.params.quote = 'trx';
        } else if (this.params.quote === 'trx') {
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
      refreshHistoryMaxMin: function(symbol, quote) {
        refreshHistoryMaxMin({symbol, quote}).then(() => {
          this.listSymbolConfig();
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .card-container > .el-card__body {
    padding: 10px !important;
  }
</style>
