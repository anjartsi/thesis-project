<template lang="pug">
  div.trayRow
    div
      IS-interval(
        v-for='(interval, index) in rowData'
        :key='index'
        :index='interval'
      ) 
</template>

<script>
// import Vuex from 'vuex';
import ISInterval from './IS-Interval';

export default {
  components: {
    ISInterval,
  },
  props: [
    'rowData',
  ],
  data() { return {}; },
  methods: {
  },
};
</script>

<style scoped>
.trayRow {
  position: relative;
  height: 50px;;
}
.trayRow > div {
  position: relative;
}
.trayRow:nth-child(even){
  background-color: grey;
}
</style>
