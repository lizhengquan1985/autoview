<template>
  <div class='chart-container'>
    <div>
      <el-select v-model="coin" filterable>
        <el-option value="">全部</el-option>
        <!--<el-option value="btc">btc</el-option>-->
        <el-option value="bch">bch</el-option>
        <el-option value="eth">eth</el-option>
        <el-option value="etc">etc</el-option>
        <el-option value="ltc">ltc</el-option>
        <el-option value="eos">eos</el-option>
        <el-option value="xrp">xrp</el-option>
        <el-option value="dash">dash</el-option>
        <el-option value="zec">zec</el-option>
        <el-option value="omg">omg</el-option>
        <el-option value="hsr">hsr</el-option>
        <el-option value="qtum">qtum</el-option>
        <el-option value="iost">iost</el-option>
        <el-option value="neo">neo</el-option>

        <el-option value="ont">ont</el-option>
        <el-option value="trx">trx</el-option>
        <el-option value="mds">mds</el-option>
        <el-option value="ht">ht</el-option>
        <el-option value="ela">ela</el-option>
        <el-option value="dta">dta</el-option>
        <el-option value="itc">itc</el-option>
        <el-option value="ruff">ruff</el-option>
        <el-option value="theta">theta</el-option>
        <el-option value="zil">zil</el-option>
        <el-option value="let">let</el-option>
        <el-option value="nas">nas</el-option>
        <el-option value="smt">smt</el-option>
        <el-option value="snt">snt</el-option>
        <el-option value="xem">xem</el-option>
        <el-option value="ven">ven</el-option>
        <el-option value="elf">elf</el-option>
        <el-option value="gnt">gnt</el-option>
        <el-option value="cvc">cvc</el-option>
        <el-option value="storj">storj</el-option>
      </el-select>
      <el-select v-model="username">
        <el-option value="">全部</el-option>
        <el-option value="lzq">lzq</el-option>
        <el-option value="yxq">yxq</el-option>
      </el-select>
      <el-button @click="fetchStatisticsLine()" icon="search" type="primary">搜索</el-button>
    </div>
    <div style="width: 900px; overflow-x: auto;">
      <div id="trade-line" style="width: 2000px;height: 600px;"></div>
    </div>
  </div>
</template>

<script>
  import {fetchStatisticsLine} from '../../api/spotrecord';
  import echarts from 'echarts';

  export default {
    name: 'lineChart',
    data() {
      return {
        coin: '',
        username: 'lzq',
        zs: [],
        buy: [],
        sell: [],
        min: 0,
        max: 9999,
      };
    },
    methods: {
      fetchStatisticsLine: function() {
        const {coin, username,} = this;
        fetchStatisticsLine({coin, username}).then(data => {
          data = data.data || data;
          this.zs = data.zs;
          this.buy = data.buy;
          this.sell = data.sell;
          this.min = data.min;
          this.max = data.max;
          const list = [];
          for (const s of this.sell) {
            const dt = new Date(s.date);
            const item = {
              name: '出售',
              value: 's:' + s.price,
              xAxis: dt.getHours() + ':' + dt.getMinutes(),
              yAxis: s.price, itemStyle: {
                normal: {color: 'red'},
              },
            };
            list.push(item);
          }
          for (const b of this.buy) {
            const dt = new Date(b.date);
            const item = {
              name: '购买',
              value: 'b:' + b.price,
              xAxis: dt.getHours() + ':' + dt.getMinutes(),
              yAxis: b.price,
              label: {color: '#999999'},
            };
            list.push(item);
          }

          const close = [];
          const high = [];
          const open = [];
          const low = [];
          const dtList = [];
          for (var i = this.zs.length - 1; i >= 0; i--) {
            const item = this.zs[i];
            close.push(item.close);
            high.push(item.high);
            open.push(item.open);
            low.push(item.low);

            const itemDt = new Date(item.id * 1000);
            dtList.push(itemDt.getHours() + ':' + itemDt.getMinutes());
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

