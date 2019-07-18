<template>
  <div style="padding: 5px;">
    <el-card>
      <el-input-number size="mini" v-model="intervalDay" style="width: 120px;"/>
      <el-input size="mini" v-model="userName" style="width: 80px;" @click.native="changeUserName"/>
      <el-button size="mini" @click="initAccountInfo()" type="primary">查询</el-button>
      <el-button size="mini" @click="resetAccountSymbol" type="primary">刷新</el-button>
      <span>{{list.length}}个</span>&emsp;
      <el-tag v-for="(amount, index) in totalAmounts" style="margin-right: 10px;">{{amount.toFixed(2, '')}}
        <span v-if="index < totalAmounts.length - 1">(多{{(amount - totalAmounts[index + 1]).toFixed(2, '')}})</span>
      </el-tag>
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
            <span>{{scope.$index}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="占比"
          width="75">
          <template slot-scope="scope">
            <div v-if="total[scope.row.symbol]">
              <span v-if="parseFloat(scope.row[dateList[0]]) / (total[scope.row.symbol] * 100) > 1"
                    style="color: red;">
              {{(parseFloat(scope.row[dateList[0]]) / (total[scope.row.symbol] * 100)).toFixed(5, '')}}
              </span>
              <span v-else>
              {{(parseFloat(scope.row[dateList[0]]) / (total[scope.row.symbol] * 100)).toFixed(5, '')}}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Earn"
          width="75">
          <template slot-scope="scope">
            <div>
              {{(parseFloat(scope.row[dateList[0]]) * closeDic[scope.row.symbol]).toFixed(3, '')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="symbol"
          label="名称"
          width="65">
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
    listAccountSymbol,
    resetAccountSymbol,
  } from '../../api/symbolConfig';

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
        totalAmounts: [0, 0, 0],
        total: {
          'usdt': 100,
          '18c': 10,
          'aac': 10,
          'abl': 4,
          'abt': 1.86,
          'ace': 0.1447,
          'act': 10,
          'ada': 450,
          'ae': 3.09,
          'aidoc': 7.777,
          'appc': 2.4,
          'ardr': 10,
          'ark': 1.41,
          'ast': 5,
          'atom': 2.3,
          'auto': 72,
          'bat': 15,
          'bcd': 0.21,
          'bch': 0.21,
          'bcx': 2100,
          'bec': 70,
          'bft': 10,
          'bix': 2.7,
          'bkbt': 100,
          'bkx': 4,
          'bloc': 100,
          'blz': 5,
          'bnt': 0.7444,
          'box': 30,
          'bsv': 0.21,
          'btc': 0.21,
          'btg': 0.21,
          'btm': 21,
          'bts': 36,
          'btt': 9900,
          'cai': 210,
          'chat': 10,
          'cic': 30,
          'cmt': 10,
          'cnn': 1000,
          'cova': 65,
          'ctxc': 2.99792458,
          'cvc': 10,
          'cvnt': 10,
          'cvt': 21.47,
          'dac': 88,
          'dadi': 1,
          'dash': 0.189,
          'dat': 10,
          'datx': 100,
          'dcr': 0.21,
          'dgb': 210,
          'dgd': 0.02,
          'doge': 1193.78,
          'dpy': 1,
          'dta': 115,
          'edo': 0.907,
          'edu': 150,
          'egcc': 100,
          'egt': 80,
          'ela': 0.33,
          'elf': 10,
          'eng': 1.5,
          'eos': 10.44,
          'etc': 1.1,
          'eth': 1.06,
          'etn': 210,
          'fair': 12,
          'fun': 110,
          'gas': 1,
          'gnt': 10,
          'gnx': 6.5,
          'grs': 1.05,
          'gsc': 10,
          'gtc': 20,
          'gto': 10,
          'gve': 10,
          'gxc': 1,
          'hb10': 1,
          'hc': 0.84,
          'hit': 1024,
          'hmc': 10,
          'hot': 15.6,
          'hpb': 1,
          'hpt': 100,
          'ht': 5,
          'hyc': 29.88,
          'icx': 8.0046,
          'ins': 0.5,
          'insur': 200,
          'int': 6.54,
          'iost': 210,
          'iota': 2.779,
          'iris': 20,
          'itc': 1,
          'kan': 100,
          'kcash': 10,
          'knc': 2.148,
          'lamb': 100,
          'lba': 10,
          'let': 10,
          'light': 2100,
          'link': 10,
          'loom': 10,
          'lrc': 13.75,
          'lsk': 1,
          'ltc': 0.84,
          'lym': 10,
          'man': 2.5,
          'mana': 26.44,
          'mco': 0.3158,
          'mds': 20,
          'mdt': 10,
          'mith': 10,
          'mkr': 0.01,
          'mof': 1,
          'mt': 40,
          'mvp': 100,
          'nano': 1.33,
          'mtx': 0.3443,
          'nas': 1,
          'neo': 1,
          'nkn': 7,
          'new': 1000,
          'npxs': 2745.55,
          'nuls': 1,
          'nxt': 9.99,
          'mtl': 0.6658,
          'lun': 0.027,
          'bifi': 210,
          'ocn': 100,
          'atp': 100,
          'algo': 100,
          'of': 512,
          'okb': 10,
          'omg': 1.4,
          'ont': 10,
          'ors': 3,
          'ost': 8,
          'pai': 21,
          'pay': 2.0521,
          'pnt': 1000,
          'poly': 10,
          'powr': 10,
          'ppt': 0.5325,
          'pra': 1,
          'pst': 1.01,
          'qash': 10,
          'qsp': 10,
          'qtum': 1,
          'qun': 15,
          'r': 4.84,
          'rcn': 10,
          'rct': 10,
          'rdn': 1,
          'ref': 0.5,
          'req': 10,
          'rfr': 50,
          'rnt': 4,
          'ruff': 20,
          'salt': 1.2,
          'sbtc': 0.2121,
          'sc': 408,
          'sda': 20,
          'skm': 15,
          'smt': 31.4,
          'snc': 1.23,
          'snt': 68,
          'soc': 15,
          'srn': 5.7,
          'ssc': 10,
          'stc': 10,
          'steem': 3.28,
          'storj': 4.25,
          'swftc': 100,
          'tct': 10,
          'theta': 10,
          'tnb': 45,
          'tnt': 10,
          'top': 200,
          'topc': 8.4,
          'tra': 200,
          'trio': 5,
          'true': 1,
          'trx': 1000,
          'tt': 100,
          'uct': 10.5,
          'ugc': 10,
          'uip': 30,
          'utk': 5,
          'vet': 867.13,
          'vib': 2,
          'vite': 10,
          'wan': 2.1,
          'waves': 1,
          'wax': 18.5,
          'wicc': 2.1,
          'win': 210,
          'wpr': 7.45,
          'wtc': 1,
          'xas': 1.15,
          'xem': 90,
          'xlm': 1000,
          'xmr': 0.16,
          'xmx': 300,
          'xrp': 1000,
          'xtz': 10,
          'xuc': 30,
          'xvg': 165,
          'xzc': 0.214,
          'you': 24.64,
          'yoyo': 3,
          'zco': 5,
          'zec': 0.0282,
          'zen': 0.21,
          'zil': 210,
          'zip': 1000,
          'zrx': 10,

          'kmd': 1.14,
          'get': 10,
          'nexo': 10,
          'propy': 1,
          'ugas': 10,
          'eko': 5,

          'uuu': 100,
          'fti': 100,
          'ren': 10,
          'mtn': 5,
          'zla': 0.6,
          'adx': 1,

          'but': 10,
          'rte': 10,
          'meet': 4,
          'ycc': 100,
          'uc': 100,
          'cvcoin': 0.15,
          'portal': 10,
          'ssp': 100,
          'tos': 10,

          'dbc': 100,
          'stk': 5,
          'yee': 100,
          'seele': 10,
          'zjlt': 25,
          'rsr': 1000,
          'dock': 10,

          'phx': 13.62,
          'lxt': 20,
          'evx': 0.25,
          'ncash': 100,
          'rccc': 5,
          'bcv': 12,

          'mxc': 26.65,
          'musk': 10,
          'she': 50,
          'ncc': 6.5744,
          'iic': 210,
          'pc': 210,
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
        listAccountSymbol({userName, sort: 'earn', intervalDay}).then(({data}) => {
          this.list = data.data;
          this.dateList = data.dateList;
          this.closeDic = data.closeDic;

          const totalAmounts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (let i = 0; i < totalAmounts.length; i++) {
            for (const item of this.list) {
              if (item.symbol === 'usdt' || item.symbol === 'btc' || item.symbol === 'eth' ||
                item.symbol === 'ht' ||
                item.symbol === 'hpt') {
                continue;
              }
              if (this.closeDic[item.symbol] && item[this.dateList[i]]) {
                totalAmounts[i] += parseFloat(item[this.dateList[i]]) * this.closeDic[item.symbol];
              }
            }
          }
          this.totalAmounts = [...totalAmounts];
        });
      },
      changeUserName() {
        if (this.userName === 'qq') {
          this.userName = 'xx';
        } else if (this.userName === 'xx') {
          this.userName = 'qq';
        }
      },
      resetAccountSymbol(row) {
        const {symbol} = {...row};
        const userName = this.userName;
        resetAccountSymbol({userName, symbol}).then(() => {

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
