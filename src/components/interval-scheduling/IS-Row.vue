<template lang="pug">
  div.trayRow(:style='rowStyle')
    IS-interval(
      v-for='(interval, index) in rowData'
      :key='index + "interval"'
      :index='interval'
      :unit='unit'
    ) 
</template>

<script>
import Vuex from 'vuex';
import ISInterval from './IS-Interval';

export default {
  components: {
    ISInterval,
  },
  props: [
    'rowIndex', 'unit', 'rowStyle',
  ],
  computed: {
    ...Vuex.mapState([
      'rows',
      'max',
      'min',
      'earliestTime',
      'latestTime',
    ]),
    rowData() {
      return this.rows[this.rowIndex];
    },
  },
  data() { return {}; },
  methods: {
  },
};
</script>

<style>
.trayRow:nth-child(even){
  background-color: lightgray;
}
.trayRow:nth-child(odd){
background-color: rgba(211, 211, 211, 0.3);
}
</style>
