<template lang="pug">
  div.container-fluid
    div#tray(:style='trayStyle')
      IS-tray-ticks(:unit='unit')
      div#scroll
        div(v-for='(row, index) in rows')
          div.rowName 
            h4 {{index + 1}}
          IS-row(
            :rowIndex='index'
            :key='"row"+index'
            :unit='unit'
            :rowStyle='rowStyle'
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
  props: [],
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
      'unit'
    ]),
    ...mapGetters([
      'rowStyle',
      'trayStyle'
    ])
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
  left: 0px;
  z-index: 1;
  background-color: rgba(20, 20, 20, 0.80);
  width: 50px;
  color: white;
  text-align: center;
  padding-left: 1em;
  padding-right: 1em;
  margin-top: 6px;
  border-radius: 6px;
}

#solutionRowName {
  transform: rotate(90deg);
  width: fit-content;
  left: -20px;
}

</style>
