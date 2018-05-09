<template>
  <div class="role-manage">
    <div>
      <el-select v-model="username" clearable>
        <el-option value="qq">qq</el-option>
        <el-option value="xx">xx</el-option>
      </el-select>
      <el-button @click="listTodayTrade()" icon="search" type="primary">搜索</el-button>
      <span>{{list.length}}</span>
    </div>
    <br/>
    <div>
      购买数量：{{info.buyCount}}
      购买总额：{{info.buyAmount}}
    </div>
    <div>
      出售数量：{{info.sellCount}}
      出售总额：{{info.sellAmount}}
      出售收益：{{info.sellEarnings}}
    </div>
    <el-table
      border
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="name"
        width="80">
      </el-table-column>
      <el-table-column
        label="bDate"
        width="160">
        <template slot-scope="scope">
          {{scope.row.bDate | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="bQuantity"
        label="bQuantity"
        width="90">
      </el-table-column>
      <el-table-column
        prop="bTradeP"
        label="bTradeP"
        width="80">
      </el-table-column>
      <el-table-column
        label="收益/收益率"
        width="160">
        <template slot-scope="scope">
          <div v-if="scope.row.sQuantity>0">
            {{(scope.row.sQuantity * scope.row.sTradeP - scope.row.bQuantity * scope.row.bTradeP).toFixed(4) }} --
            {{((scope.row.sQuantity * scope.row.sTradeP) / (scope.row.bQuantity * scope.row.bTradeP)).toFixed(4) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="sQuantity"
        label="sQuantity"
        width="90">
      </el-table-column>
      <el-table-column
        prop="sTradeP"
        label="sTradeP"
        width="80">
      </el-table-column>
      <el-table-column
        label="sDate"
        width="160">
        <template slot-scope="scope">
          <div @click="showKline(scope.row)">
            {{scope.row.sDate | formatDate}}
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Error Log" :visible.sync="dialogVisible" width="80%">
      <div>
        <div id="trade-line" style="width: 2000px;height: 600px;"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {listTodayTrade, kline} from '../../api/pigMore';
  import echarts from 'echarts';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        min: 0,
        max: 0,
        coin: '',
        order: 'Id',
        username: 'qq',
        coinList: [],
        list: [],
        hasSell: '0',
        formLabelWidth: '100px',
        info: {},
        dialogVisible: false
      };
    },
    created: function () {
    },
    computed: {},
    methods: {
      listTodayTrade: function () {
        const {username} = this;
        listTodayTrade({username}).then(data => {
          data = data.data || data;
          this.list = data.list;
          this.info = {...data};
        });
      },
      showKline: function (row) {
        const {username} = this;
        const {name, bDate, sDate} = row;
        this.dialogVisible = true;
        kline({username, name, date: sDate}).then(data => {
          data = data.data || data;
          this.buyList = data.buyList;
          this.sellList = data.sellList;
          this.klineList = data.klineList;
          console.log(this.buyList)
          console.log(this.sellList)
          console.log(this.klineList)

          this.min = 1;
          this.max = 100;
          const list = [];
          for (const s of this.sellList) {
            const dt = new Date(s.sDate);
            const item = {
              name: '出售',
              value: 's:' + s.sTradeP,
              xAxis: dt.getDate() +'-'+ dt.getHours() + ':' + dt.getMinutes(),
              yAxis: s.sTradeP, itemStyle: {
                normal: {color: 'red'},
              },
            };
            list.push(item);
          }
          for (const b of this.buyList) {
            const dt = new Date(b.bDate);
            const item = {
              name: '购买',
              value: 'b:' + b.bTradeP,
              xAxis: dt.getDate() +'-'+ dt.getHours() + ':' + dt.getMinutes(),
              yAxis: b.bTradeP,
              label: {color: '#999999'},
            };
            list.push(item);
          }

          const close = [];
          const high = [];
          const open = [];
          const low = [];
          const dtList = [];
          var max = 0;
          var min = 9999999;
          for (var i = 0; i < this.klineList.length - 1; i++) {
            const item = this.klineList[i];
            close.push(item.close);
            high.push(item.high);
            open.push(item.open);
            low.push(item.low);

            const itemDt = new Date(item.id * 1000);
            dtList.push(itemDt.getDate() +'-'+ itemDt.getHours() + ':' + itemDt.getMinutes());

            if(max < item.close){
              max = item.close;
            }
            if(min > item.close){
              min = item.close;
            }
          }
          this.min = min;
          this.max = max;
          this.initChart(dtList, close, list);
        })
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
  .role-manage {
    padding: 20px;
  }

  .permissions-select {
    text-align: left;
  }

  .permissions-select .el-tag {
    margin-right: 5px;
  }
</style>
