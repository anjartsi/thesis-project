<template lang="pug">
div
  div.row
    br
    div.col-xs-1
      h3 Solver
    div.col-xs-4
      nice-button.btn-primary(
        @click='dosomething'
        :class='{ disabled: solved }'
        v-if='!solved'
        ) {{buttonMsg[step % maxSteps]}}
      div.alert.alert-success.text-center(v-else) 
        h4 Finished!
    div.col-xs-3
      div.alert.alert-info.text-center
        h4 Intervals in Solution: {{rowData.length}}
    div.col-xs-4
      div.alert.alert-warning.text-center
        h4 Number of Steps Performed: {{step}}
  div.col-xs-12
    div(:style='trayStyle')
      IS-tray-ticks(:unit='unit')
      div.solutionRowName
        h4 Solution
      div.trayRow#solutionRow(:style='rowStyle')
        IS-interval(
          v-for='(interval, index) in solutionRowData'
          :key='"interval_" + interval'
          :index='interval'
          :unit='unit'
        )
    nice-hint(namespace='intervalScheduling'  :show='solving').hint
      p Use the button above to perform the next step in the algorithm
      p The intervals taken in the solution will get added to the row labelled "Solution"
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ISRow from './IS-Row';
import ISInterval from './IS-Interval';
import ISTrayTicks from './IS-TrayTicks';
import NiceButton from '../nice-things/Nice-Button';
import NiceHint from '../nice-things/Nice-Hint';

const { mapState, mapGetters } = createNamespacedHelpers('intervalScheduling');

export default {
  components: {
    ISRow, ISInterval, ISTrayTicks, NiceButton, NiceHint,
  },
  props: [],
  data() {
    return {
      buttonMsg: [
        'Take next interval',
        'Remove any intervals that overlap',
      ],
    };
  },
  computed: {
    ...mapState({
      earliestTime: 'earliestTime',
      latestTime: 'latestTime',
      step: 'step',
      maxSteps: 'maxSteps',
      solved: 'solved',
      rowData: 'solution',
      unit: 'unit',
    }),
    ...mapState({
      solutionRowData: 'solution',
    }),
    ...mapGetters([
      'solving',
      'trayStyle',
      'rowStyle',
    ]),
  }, // end computed
  methods: {
    dosomething() {
      if (!this.solved) {
        this.$store.dispatch('intervalScheduling/eft');
      }
    },
  },
};
</script>

<style scoped>

.alert > h4 {
  margin: 0px;
}

#alertContainer {
  padding: 0px;
  margin-left: -1%;
}

#alertContainer > div{
  position: absolute;
  height: 150px;
  width: 102%;
  z-index: 1;
}
.bottom {
  bottom: 0px;
}


#solutionRow {
  /* Same as dark colored rows */
  background-color:lightgray;
}

.solutionRowName {
  position: absolute;  
  z-index: 1;
  background-color: rgba(20, 20, 20, 0.80);
  width: 50px;
  color: white;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 6px;
  border-radius: 6px;
  transform: rotate(90deg);
  width: fit-content;
  left: -40px;
}

.hint {
  left: 300px;
}
</style>
