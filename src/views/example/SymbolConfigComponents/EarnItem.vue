<template>
  <div style="line-height: 14px;">
    <div>{{earn.toFixed(3, '')}}</div>
    <template v-if="taoTotalUsdt">
      <div v-if="beishu > 1" style="color:green;">{{taoTotalUsdt.toFixed(2,'')}}</div>
      <div :tip="beishu" v-if="beishu <= 1 && beishu > 0.25" style="color:blue;">{{taoTotalUsdt.toFixed(2,'')}}</div>
      <div v-if="beishu <= 0.25 && beishu > 0.05" style="color:hotpink;">{{taoTotalUsdt.toFixed(2,'')}}</div>
      <div v-if="beishu <= 0.05" style="color:deeppink;">{{taoTotalUsdt.toFixed(2,'')}}</div>
    </template>
  </div>
</template>

<script>
  export default {
    components: {},
    name: 'DogControl',
    data() {
      return {
        beishu: 1,
      };
    },
    props: ['earn', 'taoTotalUsdt'],
    created: function() {
      this.init();
    },
    computed: {},
    methods: {
      init: function() {
        this.beishu = this.earn / this.taoTotalUsdt;
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
