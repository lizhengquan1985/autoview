<template>
  <div class="app-container">
    <el-card>
      <el-button v-for="item in symbolList" @click="selectSymbol(item)" size="mini" type="primary">{{item}}</el-button>
      <el-select v-model="userName" style="width: 100px;">
        <el-option value="qq">qq</el-option>
        <el-option value="xx">xx</el-option>
      </el-select>
      <el-input v-model="symbolName" style="width: 100px;"/>
      <el-input v-model="quoteCurrency" style="width: 100px;" @click.native="changeQuoteCurrency"/>
      <el-button @click="emptyInfo()" icon="search" type="primary">搜索</el-button>
      <el-button @click="doEmpty()" icon="search" type="primary">empty once</el-button>
      <div>
        <label>count：{{moreList.length}}</label>
        <label>amount：{{totalAmount}}</label>
        <label>quantity：{{totalQuantity}}</label>
        <label>{{JSON.stringify(balance)}}</label>
      </div>
    </el-card>

    <div style="width: 100%; overflow-x: auto;">
      <div id="trade-line" style="width: 2000px;height: 600px;"></div>
    </div>

    <div style="margin-top: 2px;">
      <el-table
        border
        :data="moreList"
        style="width: 100%">
        <el-table-column
          prop="buyOrderId"
          label="order"
          width="100">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="人"
          width="58">
        </el-table-column>
        <el-table-column
          prop="buyTradePrice"
          label="入"
          width="90">
        </el-table-column>
        <el-table-column
          prop="buyQuantity"
          label="quantity"
          width="90">
        </el-table-column>
        <el-table-column
          label="amount"
          width="90">
          <template slot-scope="scope">
          <span v-if="scope.row.buyQuantity">
            {{(scope.row.buyQuantity * scope.row.buyTradePrice).toFixed(2, '')}}
          </span>
          </template>
        </el-table-column>
        <el-table-column
          label="date"
          width="155">
          <template slot-scope="scope">
            {{scope.row.buyDate | formatDate}}
          </template>
        </el-table-column>
        <el-table-column
          prop="buyState"
          label="state">
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
  import {kline, symbolKline, getNeedEmpty} from '../../api/day';
  import {emptyInfo} from '../../api/more';
  import {doEmpty} from '../../api/empty';
  import echarts from 'echarts';

  export default {
    components: {},
    name: 'HelloWorld',
    data() {
      return {
        symbolList: ['etc', 'xrp'],
        userName: 'qq',
        quoteCurrency: 'usdt',
        symbolName: '',
        moreList: [],
        totalAmount: 0,
        totalQuantity: 0,
        balance: null,
      };
    },
    created: function() {
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
        this.doGetNeedEmpty();
      },
      doGetNeedEmpty() {
        const quoteCurrency = this.quoteCurrency;
        getNeedEmpty({quoteCurrency}).then(data => {
          this.symbolList = data.data;
        });
      },
      emptyInfo: function() {
        const {symbolName, userName, quoteCurrency} = this;
        emptyInfo({symbolName, userName, quoteCurrency}).then(data => {
          data = data.data || data;
          this.moreList = data.list;
          this.balance = data.balanceItem;
          this.totalQuantity = data.totalQuantity;
          let totalAmount = 0;
          for (const item of this.moreList) {
            totalAmount += item.buyQuantity * item.buyTradePrice;
          }
          this.totalAmount = totalAmount;
        });
      },
      doEmpty: function() {
        const {symbolName, userName, quoteCurrency} = this;
        this.$confirm('确定空吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          doEmpty({userName, symbolName, quoteCurrency}).then(() => {

          });
        });
      },
      selectSymbol(symbolName) {
        this.symbolName = symbolName;
        this.fetchStatisticsLine();
      },
      fetchStatisticsLine: function() {
        const {symbolName, userName, quoteCurrency} = this;
        symbolKline({symbolName, userName, day: 20, quoteCurrency}).then(data => {
          data = data.data || data;
          this.klineList = data.klineList;
          this.buyList = data.buyList;
          this.sellList = data.sellList;
          this.min = data.min;
          this.max = data.max;
          const list = [];
          for (const s of this.sellList) {
            const dt = new Date(s.sellDate);
            const item = {
              name: '出售',
              value: 's:' + s.sellTradePrice,
              xAxis: dt.getDate() + '日' + dt.getHours() + '时' + dt.getMinutes(),
              yAxis: s.sellTradePrice,
              itemStyle: {
                normal: {color: 'red'},
              },
            };
            list.push(item);
          }
          for (const b of this.buyList) {
            const dt = new Date(b.buyDate);
            const item = {
              name: '购买',
              value: 'b:' + b.buyTradePrice,
              xAxis: dt.getDate() + '日' + dt.getHours() + '时' + dt.getMinutes(),
              yAxis: b.buyTradePrice,
              label: {color: '#999999'},
            };
            list.push(item);
          }

          const close = [];
          const high = [];
          const open = [];
          const low = [];
          const dtList = [];
          for (let i = 0; i < this.klineList.length; i++) {
            const item = this.klineList[i];
            close.push(item.close);
            high.push(item.high);
            open.push(item.close);
            low.push(item.close);

            const itemDt = new Date(item.id * 1000);
            dtList.push(itemDt.getDate() + '日' + itemDt.getHours() + '时' + itemDt.getMinutes());
          }

          this.initChart(dtList, open, list);
        });
      },
      initChart(dt, open, list) {
        this.chart = echarts.init(document.getElementById('trade-line'));

        this.chart.setOption({
          backgroundColor: '#394056',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B',
              },
            },
          },
          grid: {
            top: '1%',
            left: '1%',
            right: '1%',
            bottom: '1%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: '#57617B',
                },
              },
              // 时间点
              data: dt,
            }],
          yAxis: [
            {
              type: 'value',
              name: '(%)',
              axisTick: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  color: '#57617B',
                },
              },
              axisLabel: {
                margin: 1,
                textStyle: {
                  fontSize: 14,
                },
              },
              splitLine: {
                lineStyle: {
                  color: '#57617B',
                },
              },
              min: (this.min * 0.98).toFixed(4),
              max: (this.max * 1.01).toFixed(2),
            }],
          series: [
            {
              name: 'CMCC',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1,
                },
              },
              markPoint: {
                data: list,
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgba(137, 189, 27, 0.3)',
                    }, {
                      offset: 0.8,
                      color: 'rgba(137, 189, 27, 0)',
                    }], false),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowBlur: 10,
                },
              },
              itemStyle: {
                normal: {
                  color: 'rgb(137,189,27)',
                  borderColor: 'rgba(137,189,2,0.27)',
                  borderWidth: 12,
                },
              },
              data: open,
            }],
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
