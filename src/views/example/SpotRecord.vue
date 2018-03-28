<template>
  <div class="role-manage">
    <div>
      <el-select v-model="coin">
        <el-option value="">全部</el-option>
        <el-option value="btc">btc</el-option>
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
      <el-radio-group v-model="hasSell">
        <el-radio-button label="0">全部</el-radio-button>
        <el-radio-button label="1">已经</el-radio-button>
        <el-radio-button label="2">未哦</el-radio-button>
      </el-radio-group>
      <el-button @click="fetchSpotRecord()" icon="search" type="primary">搜索</el-button>
      <span>{{list.length}}</span>
    </div>
    <br/>
    <el-table
      border
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="buyDate"
        label="bDate"
        width="170">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="name"
        width="45">
      </el-table-column>
      <template>
        <el-table-column
          label="sy"
          width="70">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.coin" placement="top">
              <span>{{scope.row.hasSell?(scope.row.sellTradePrice * scope.row.sellTotalQuantity -  scope.row.buyTradePrice * scope.row.buyTotalQuantity).toFixed(4):''}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          v-if="hasSell !== '2'"
          label="syrate"
          width="70">
          <template slot-scope="scope">
            <span>{{scope.row.hasSell?(scope.row.sellTradePrice * scope.row.sellTotalQuantity/(scope.row.buyTradePrice * scope.row.buyTotalQuantity)).toFixed(3):''}}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        label="bop/btp"
        width="110">
        <template slot-scope="scope">
          <el-tooltip effect="dark" :content="scope.row.coin" placement="top">
            <span>{{scope.row.buyOrderPrice}}/{{scope.row.buyTradePrice}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="总数量/总金额"
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.buyTotalQuantity}}/{{(scope.row.buyTradePrice*scope.row.buyTotalQuantity).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <template>
        <el-table-column
          prop="sellDate"
          label="sDate"
          width="170">
        </el-table-column>
        <el-table-column
          label="sop/stp"
          width="110">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.coin" placement="top">
              <span>{{scope.row.sellOrderPrice}}/{{scope.row.sellTradePrice}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="总数量/总金额"
          width="120">
          <template slot-scope="scope">
            <span>{{scope.row.sellTotalQuantity}}/{{(scope.row.sellTotalQuantity*scope.row.sellTradePrice).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="success"
          width="80">
          <template slot-scope="scope">
            <span>{{scope.row.buySuccess?'yes':'no'}}/{{scope.row.sellSuccess?'yes':'no'}}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
  import {fetchSpotRecord} from '../../api/spotrecord'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        coin: '',
        order: 'Id',
        username: '',
        coinList: [],
        hasSell: '0',
        formLabelWidth: '100px'
      }
    },
    created: function () {
    },
    computed: {
      list: function () {
        let hasSell = this.hasSell
        let rs = this.coinList
        if (hasSell === '1') {
          rs = this.coinList.filter(it => it.hasSell)
        } else if (hasSell === '2') {
          rs = this.coinList.filter(it => !it.hasSell)
        }
        console.log(111111111, rs)
        return rs
      }
    },
    methods: {
      fetchSpotRecord: function () {
        const {coin, username, hasSell} = this
        let {order} = this
        let fw = hasSell
        if (hasSell === '1') {
          order = 'SellDate'
        }
        fetchSpotRecord({coin, order, username, fw}).then(data => {
          data = data.data || data
          this.coinList = data
        })
      }
    }
  }
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
