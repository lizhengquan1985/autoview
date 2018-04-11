<template>
  <div class="role-manage">
    <div>
      <el-button @click="refresh()" icon="search" type="primary">刷新</el-button>
    </div>
    <br/>
    <div>
      <div style="display: inline-block;width: 430px;margin-right: 10px;vertical-align: top;">
        <ItemDTO :list="list['lzq']" :total="total['lzq']"/>
      </div>
      <div style="display: inline-block;width: 430px;vertical-align: top;">
        <ItemDTO :list="list['yxq']" :total="total['yxq']"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {fetchSpotRecordDTO} from '../../api/spotrecord';
  import ItemDTO from './SpotRecordItemDTO';

  export default {
    components: {ItemDTO},
    name: 'HelloWorld',
    data() {
      return {
        total: {
          lzq: 0,
          yxq: 0,
        },
        list: {},
      };
    },
    created: function() {
      this.refresh();
    },
    computed: {},
    methods: {
      refresh: function() {
        this.fetchSpotRecordDTO('lzq');
        this.fetchSpotRecordDTO('yxq');
      },
      fetchSpotRecordDTO: function(username) {
        fetchSpotRecordDTO({username}).then(res => {
          res = res.data;
          this.list[username] = res.data;
          this.total[username] = res.total;
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
</style>
