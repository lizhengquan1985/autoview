<template>
  <div style="padding: 5px;">
    <el-card>
      <el-input-number size="mini" v-model="intervalDay" style="width: 120px;"/>
      <el-input size="mini" v-model="userName" style="width: 80px;" @click.native="changeUserName"/>
      <el-button size="mini" @click="initAccountInfo()" type="primary">查询</el-button>
      <span>{{list.length}}</span>
      <span>总in：{{totalAmount.toFixed(2, '')}}</span>
      <span>上次总in：{{preTotalAmount.toFixed(2, '')}}</span>
    </el-card>
    <div style="margin-top: 5px;">
      <el-table
        border
        size="mini"
        :data="list"
        height="700"
        style="width: 100%">
        <el-table-column
          label="id"
          width="42">
          <template slot-scope="scope">
            {{scope.$index}}
          </template>
        </el-table-column>
        <el-table-column
          prop="symbolName"
          label="名称"
          width="65">
        </el-table-column>
        <el-table-column
          label="占比"
          width="75">
          <template slot-scope="scope">
            <div v-if="total[scope.row.symbolName]">
              <span v-if="parseFloat(scope.row[dateList[0]]) / (total[scope.row.symbolName] * 100) > 1"
                    style="color: red;">
              {{(parseFloat(scope.row[dateList[0]]) / (total[scope.row.symbolName] * 100)).toFixed(5, '')}}
              </span>
              <span v-else>
              {{(parseFloat(scope.row[dateList[0]]) / (total[scope.row.symbolName] * 100)).toFixed(5, '')}}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="in"
          width="75">
          <template slot-scope="scope">
            <div>
              {{(parseFloat(scope.row[dateList[0]]) * closeDic[scope.row.symbolName]).toFixed(3, '')}}
            </div>
          </template>
        </el-table-column>
        <template v-for="(date, index) in dateList">
          <el-table-column
            :prop="date"
            :label="date"
            width="105">
            <template slot-scope="scope">
              <div style="line-height: 14px;">
              <span
                style="color: red;"
                v-if="dateList.length > (index + 1) && parseFloat(scope.row[date]) > parseFloat(scope.row[dateList[index + 1]])">
              {{(parseFloat(scope.row[date])).toFixed(5, '')}}
                <div>
                增:{{(parseFloat(scope.row[date]) - parseFloat(scope.row[dateList[index + 1]])).toFixed(5, '')}}
                  </div>
              </span>
                <span
                  style="color: blue;"
                  v-else-if="dateList.length > (index + 1) && parseFloat(scope.row[date]) < parseFloat(scope.row[dateList[index + 1]])">
              {{(parseFloat(scope.row[date])).toFixed(5, '')}}
                <div>
                减:{{(parseFloat(scope.row[date]) - parseFloat(scope.row[dateList[index + 1]])).toFixed(5, '')}}
                  </div>
              </span>
                <span v-else-if="scope.row[date]">
              {{(parseFloat(scope.row[date])).toFixed(5, '')}}
              </span>
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {
    listDogStatCurrency,
  } from '../../api/dogControl';

  export default {
    components: {},
    name: 'HelloWorld',
    data() {
      return {
        userName: 'qq',
        intervalDay: 1,
        list: [],
        dateList: [],
        closeDic: {},
        totalAmount: 0,
        preTotalAmount: 0,
        total: {
          '18c': 10,
          'act': 10,
          'ada': 450,
          'ae': 0,
          'ardr': 10,
          'atom': 2.3,
          'bat': 15,
          'bcd': 0.21,
          'bch': 0.21,
          'bcx': 2100,
          'bft': 10,
          'bix': 2.7,
          'blz': 5,
          'bsv': 0.21,
          'btc': 0.21,
          'btg': 0.21,
          'btm': 21,
          'bts': 36,
          'btt': 9900,
          'cmt': 10,
          'ctxc': 2.99792458,
          'cvc': 10,
          'dac': 88,
          'dash': 0.189,
          'dat': 10,
          'dcr': 0.21,
          'dgb': 210,
          'dgd': 0.02,
          'doge': 0,
          'dta': 115,
          'ela': 0.33,
          'elf': 10,
          'eng': 1.5,
          'etc': 0,
          'eth': 0,
          'etn': 210,
          'gas': 1,
          'gnt': 10,
          'grs': 1.05,
          'gtc': 0,
          'gxc': 0,
          'hb10': 0,
          'hc': 0,
          'hit': 1024,
          'hpt': 100,
          'ht': 5,
          'icx': 8.0046,
          'iost': 210,
          'iota': 2.779,
          'iris': 20,
          'itc': 1,
          'kan': 0,
          'kcash': 10,
          'light': 2100,
          'of': 512,
          'cai': 210,
          'win': 210,
          'insur': 200,
          'tra': 200,
          'mvp': 100,

          'swftc': 100,
          'eos': 10.44,
          'aac': 10,
          'chat': 10,
          'rct': 10,
          'trio': 5,
          'ors': 3,

          'eth': 1.06,
          'edo': 0.907,
          'bnt': 0.7444,
          'ace': 0.1447,
          'okb': 10,
          'sda': 20,
          'rnt': 4,
          'mkr': 0.01,

          'knc': 2.148,
          'lamb': 100,
          'lba': 10,
          'let': 10,
          'link': 10,
          'loom': 10,
          'lsk': 1,
          'ltc': 0.84,
          'man': 2.50,
          'mana': 26.44,
          'mco': 0.3158,
          'mds': 20,
          'mt': 40,
          'nano': 1.33,
          'nas': 1,
          'neo': 1,
          'new': 1000,
          'npxs': 2745.55,
          'nuls': 1,
          'ocn': 100,
          'omg': 1.4,
          'ont': 10,
          'ost': 8,
          'pai': 21,
          'pay': 2.0521,
          'poly': 10,
          'powr': 10,
          'qash': 10,
          'qsp': 10,
          'qtum': 1,
          'rcn': 10,
          'rdn': 1,
          'req': 10,
          'ruff': 20,
          'salt': 1.2,
          'smt': 31.4,
          'snt': 68,
          'soc': 15,
          'srn': 5.7,
          'steem': 3.28,
          'storj': 4.25,
          'theta': 10,
          'top': 200,
          'trx': 1000,
          'utk': 5,
          'vet': 867.13,
          'wan': 2.1,
          'waves': 1,
          'wax': 18.5,
          'wicc': 2.1,
          'wtc': 1,
          'xem': 90,
          'xlm': 1000,
          'xmr': 0.16,
          'xrp': 1000,
          'xtz': 10,
          'xvg': 165,
          'xzc': 0.214,
          'zec': 0.0282,
          'zen': 0.21,
          'zil': 210,
          'zrx': 10,
          'egt': 80,
          'zz-question': 'atom,ctxc,dash,smt,snt,vet,bix,bts,zec, xtz,xmr, steem,srn',
        },
      };
    },
    created: function() {
    },
    computed: {},
    methods: {
      initAccountInfo: function() {
        const userName = this.userName;
        const intervalDay = this.intervalDay;
        listDogStatCurrency({userName, intervalDay}).then(({data}) => {
          this.list = data.data;
          this.dateList = data.dateList;
          this.closeDic = data.closeDic;
          let totalAmount = 0;
          let preTotalAmount = 0;
          for (const item of this.list) {
            if (item.symbolName === 'usdt' || item.symbolName === 'btc' || item.symbolName === 'eth' ||
              item.symbolName === 'ht' ||
              item.symbolName === 'hpt') {
              continue;
            }
            if (this.closeDic[item.symbolName] && item[this.dateList[0]]) {
              totalAmount += parseFloat(item[this.dateList[0]]) * this.closeDic[item.symbolName];
            }
            if (this.closeDic[item.symbolName] && item[this.dateList[1]]) {
              preTotalAmount += parseFloat(item[this.dateList[1]]) * this.closeDic[item.symbolName];
            }
          }
          this.totalAmount = totalAmount;
          this.preTotalAmount = preTotalAmount;
        });
      },
      changeUserName() {
        if (this.userName === 'qq') {
          this.userName = 'xx';
        } else if (this.userName === 'xx') {
          this.userName = 'qq';
        }
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
