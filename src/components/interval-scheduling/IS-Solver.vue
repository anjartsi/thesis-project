<template lang="pug">
div
  h1 Solver
  div.row
    div.col-xs-2
    div.col-xs-10
      div#solverTray(:style='trayStyle')
        IS-tray-ticks(:unit='unit')
        div.trayRow(:style='rowStyle')
          IS-interval(
            v-for='(interval, index) in rowData'
            :key='index + "interval"'
            :index='interval'
            :unit='unit'
          )
        IS-tray-ticks(:unit='unit')

</template>

<script>
import Vuex from 'vuex';
import ISRow from './IS-Row';
import ISInterval from './IS-Interval';
import ISTrayTicks from './IS-TrayTicks';

export default {
  components: { ISRow, ISInterval, ISTrayTicks },
  props: [
    'unit', 'trayStyle', 'rowStyle',
  ],
  data() { return {}; },
  computed: {
    ...Vuex.mapState([
      'earliestTime',
      'latestTime',
    ]),
    rowData() {
      return this.$store.state.solution;
    },
  },
};
</script>

<style scoped>
/* The 2 above have been copied from IS-Row */
</style>
