<template>
  <div style="line-height: 14px;">
    <div>{{symbol}}</div>
    <div @click="show">{{earn.toFixed(2, '')}}</div>
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
    props: ['earnQuantity', 'taoTotalUsdt', 'taoQuantity', 'price', 'index', 'symbol'],
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
      show() {
        console.log('earnQuantity' + this.earnQuantity);
        console.log('taoTotalUsdt' + this.taoTotalUsdt);
        console.log('taoQuantity' + this.taoQuantity);
        console.log('price' + this.price);
        console.log('index' + this.index);
        console.log('earn' + this.earn);
        console.log('tao' + this.tao);
        console.log('kui' + this.kui);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
