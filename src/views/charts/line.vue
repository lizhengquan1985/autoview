<template>
  <div class='chart-container'>
    <div>
      <el-input v-model="symbolName" style="width:100px;"/>
      <el-input v-model="userName" style="width:100px;" placeholder="qq/xx"/>
      <el-date-picker
        v-model="date"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="">
      </el-date-picker>
      <el-button @click="fetchStatisticsLine()" icon="search" type="primary">搜索</el-button>
    </div>
    <div style="width: 900px; overflow-x: auto;">
      <div id="trade-line" style="width: 2000px;height: 600px;"></div>
    </div>
  </div>
</template>

<script>
  import {fetchStatisticsLine} from '../../api/spotrecord';
  import {kline} from '../../api/day';
  import echarts from 'echarts';

  export default {
    name: 'lineChart',
    data() {
      return {
        date: null,
        symbolName: '',
        userName: 'qq',
        klineList: [],
        buyList: [],
        sellList: [],
        min: 0,
        max: 9999,
      };
    },
    methods: {
      fetchStatisticsLine: function() {
        const {symbolName, userName, date = new Date()} = this;
        kline({name: symbolName, userName, date}).then(data => {
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
              xAxis: dt.getDate() + ':' + dt.getHours() + ':' + dt.getMinutes(),
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
              xAxis: dt.getDate() + ':' + dt.getHours() + ':' + dt.getMinutes(),
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
            dtList.push(itemDt.getDate() + ':' + itemDt.getHours() + ':' + itemDt.getMinutes());
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

<style scoped>
  .chart-container {
    position: relative;
    padding: 20px;
    width: 100%;
    height: 85vh;
  }
</style>

