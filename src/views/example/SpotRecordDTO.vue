<template>
  <div class="role-manage">
    <div>

      <el-radio-group v-model="hasSell">
        <el-radio-button label="0">全部</el-radio-button>
        <el-radio-button label="1">已经</el-radio-button>
        <el-radio-button label="2">未哦</el-radio-button>
      </el-radio-group>
      <el-button @click="fetchSpotRecordDTO()" icon="search" type="primary">搜索</el-button>
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
            <span>{{scope.row.hasSell?(scope.row.sellTradePrice * scope.row.sellTotalQuantity/(scope.row.buyTradePrice * scope.row.buyTotalQuantity)).toFixed(2):''}}</span>
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
        label="bQuantity/byAmount"
        width="110">
        <template slot-scope="scope">
          <span>{{scope.row.buyTotalQuantity}}/{{(scope.row.buyTradePrice*scope.row.buyTotalQuantity).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <template>
        <el-table-column
          prop="sellDate"
          label="ssdate"
          width="170">
        </el-table-column>
        <el-table-column
          prop="sellOrderPrice"
          label="bop"
          width="90">
        </el-table-column>
        <el-table-column
          prop="sellTradePrice"
          label="btp"
          width="stp">
        </el-table-column>
        <el-table-column
          prop="sellTotalQuantity"
          label="ssdf"
          width="90">
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
  import {fetchSpotRecordDTO} from '../../api/spotrecord'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        coin: 'eos',
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
      fetchSpotRecordDTO: function () {

        fetchSpotRecord({}).then(data => {
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
