<template lang='pug'>
div
  div.col-xs-4
    div.col-xs-6
      nice-button.btn-primary(@click='addInterval') Add Interval
    div.col-xs-6
      nice-button.btn-danger(@click='removeInterval') Remove Interval
  div.col-xs-12
    ul
      IS-interval(
        v-for='(interval, index) in intervals'
        :key='index'
        :index='index'
      ) 
</template>

<script>
import store from './store';
import ISInterval from './ISInterval';
import NiceButton from '../nice-things/NiceButton';

export default {
  components: {
    NiceButton, ISInterval,
  },
  store,
  computed: {
    intervals() {
      return this.$store.state.intervals;
    },
  },
  // end computed
  data() {
    return {};
  },
  methods: {
    addInterval() {
      this.$store.commit('addInterval');
    },
    removeInterval() {
      this.$store.commit('removeInterval', { index: 0 });
    },
  },
};
</script>

<style scoped>
  
</style>