<template>
  <div class="app-container">
    <div>
      <el-input v-model="symbolName" style="width: 200px;"/>
      <el-button @click="fetchDogMoreNotFinished()" icon="search" type="primary">搜索</el-button>
    </div>
    <br/>
    <el-table
      border
      :data="list"
      style="width: 100%">
      <el-table-column
        label="bDate"
        width="160">
        <template slot-scope="scope">
          {{scope.row.buyDate | formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="name"
        width="80">
        <template slot-scope="scope">
          {{scope.row.userName}}({{scope.row.coin}})
        </template>
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
          width="65">
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
          label="sDate"
          width="160">
          <template slot-scope="scope">
            {{scope.row.sellDate | formatDate}}
          </template>
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
  import {fetchSpotRecord} from '../../api/spotrecord';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        symbolName: '',
        moreList: [],
      };
    },
    created: function() {
    },
    computed: {},
    methods: {
      fetchDogMoreNotFinished: function() {
        const {symbolName} = this;
        fetchSpotRecord({symbolName}).then(data => {
          data = data.data || data;
          this.coinList = data;
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
