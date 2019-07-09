<template>
  <div>空:
    <span :style="{color: close < minSellPrice ? 'black' : 'red'}">{{minSellPrice}}</span>
  </div>
</template>

<script>
  export default {
    components: {},
    name: 'DogControl',
    data() {
      return {
        close: null,
      };
    },
    props: ['tickers', 'quote', 'symbol', 'minSellPrice'],
    created: function() {
      this.init();
    },
    computed: {},
    methods: {
      init: function() {
        const findTicker = this.tickers.find(it => it.symbol === `${this.symbol}${this.quote}`);
        if (findTicker) {
          this.close = findTicker.close;
        }
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
