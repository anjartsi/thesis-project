<template lang="pug">
  div
    div#tray(:style='trayStyle')
      IS-tray-ticks(:unit='unit')
      IS-row(
        v-for='(row, index) in rows'
        :rowIndex='index'
        :key='"row"+index'
        :unit='unit'
        :rowStyle='rowStyle'
        )
      IS-tray-ticks(:unit='unit')
      
</template>

<script>
import Vuex from 'vuex';
import ISRow from './IS-Row';
import ISTrayTicks from './IS-TrayTicks';

export default {
  components: { ISRow, ISTrayTicks },
  props: [
    'unit', 'trayStyle', 'rowStyle',
  ],
  data() { return {}; },
  computed: {
    ...Vuex.mapState([
      'problemSize',
      'intervals',
      'rows',
      'min',
      'max',
      'earliestTime',
      'latestTime',
    ]),
  },
  methods: {
    ...Vuex.mapGetters([
      'getCollision',
    ]),
  }, // end methods
};
</script>

<style scoped>

</style>
