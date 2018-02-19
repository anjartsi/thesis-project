<template lang="pug">
  div
    div#tray(:style='trayStyle')
      IS-tray-ticks(:unit='unit')
      div(v-for='(row, index) in rows')
        div.rowName 
          h4 {{index}}
        IS-row(
          :rowIndex='index'
          :key='"row"+index'
          :unit='unit'
          :rowStyle='rowStyle'
          )
      IS-tray-ticks(:unit='unit')
      div
        div.rowName#solutionRowName
          h4 Solution
        div.trayRow#solutionRow(:style='rowStyle')
          IS-interval(
            v-for='(interval, index) in solutionRowData'
            :key='"interval_" + interval'
            :index='interval'
            :unit='unit'
          )
      IS-tray-ticks(:unit='unit')

      
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ISRow from './IS-Row';
import ISInterval from './IS-Interval';
import ISTrayTicks from './IS-TrayTicks';

const { mapState, mapGetters } = createNamespacedHelpers('intervalScheduling');

export default {
  components: { ISRow, ISTrayTicks, ISInterval },
  props: [
    'unit',
  ],
  data() { return {}; },
  computed: {
    ...mapState([
      'problemSize',
      'intervals',
      'rows',
      'min',
      'max',
      'earliestTime',
      'latestTime',
    ]),
    ...mapState({
      solutionRowData: 'solution',
    }),
    trayStyle() {
      return {
        'padding-left': `${this.unit}px`,
        border: '1px solid black',
        'user-select': 'none',
        'overflow-x': 'auto',
        width: '100%',
      };
    },
    rowStyle() {
      return {
        width: `${this.unit * (this.latestTime - this.earliestTime)}px`,
        position: 'relative',
        height: '50px',
        'font-size': '11px',
      };
    },
  },
  methods: {
    ...mapGetters([
      'getCollision',
    ]),
  }, // end methods
};
</script>

<style scoped>
#solutionRow {
  /* Same as dark colored rows */
  background-color:lightgray;
}

.rowName {
  position: absolute;  
  left: 15px;
  z-index: 1;
  background-color: rgba(20, 20, 20, 0.80);
  color: white;
  text-align: center;
  padding-left: 1em;
  padding-right: 1em;
  margin-top: 6px;
  border-radius: 6px;
}

#solutionRowName {
  transform: rotate(90deg);
  left: -10px;
}
</style>
