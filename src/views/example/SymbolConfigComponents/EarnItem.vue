<template>
  <div style="line-height: 14px;">
    <div>{{earn.toFixed(2, '')}}</div>
    <template v-if="index > 4">
      <div v-if="kui>0" style="color:red;">亏：{{kui.toFixed(2,'')}}</div>
      <div v-else style="color:blue;">赚：{{(0-kui).toFixed(2,'')}}</div>
      <div>{{taoTotalUsdt.toFixed(2,'')}}</div>
    </template>
  </div>
</template>

<script>
  export default {
    components: {},
    name: 'DogControl',
    data() {
      return {
        earn: 0,
        tao: 0,
        kui: 0,
      };
    },
    props: ['earnQuantity', 'taoTotalUsdt', 'taoQuantity', 'price', 'index'],
    created: function() {
      this.init();
    },
    computed: {},
    methods: {
      init: function() {
        const taoQuantity = this.taoQuantity || 0;
        const earnQuantity = this.earnQuantity || 0;
        this.earn = earnQuantity * this.price;
        this.tao = taoQuantity * this.price;
        this.kui = this.taoTotalUsdt - this.tao - this.earn;
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
