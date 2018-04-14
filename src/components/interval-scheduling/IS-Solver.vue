<template lang="pug">
div
  div.row 
    h1 Solver
  div.col-xs-4
      h4.text-center(v-if='!solved') {{buttonMsg[step % maxSteps]}}
      h4.text-center(v-else) Finished!
      nice-button.btn-primary(
        @click='dosomething'
        :class='{ disabled: solved }'
        ) Click Me! 
  br
  div.col-xs-4
    div.alert.alert-success.text-center
      h4 Total Intervals in Solution: {{rowData.length}}
  div.col-xs-4
    div.alert.alert-warning.text-center
      h4 Number of Steps Performed: {{step}}
  hr
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ISRow from './IS-Row';
import ISInterval from './IS-Interval';
import ISTrayTicks from './IS-TrayTicks';
import NiceButton from '../nice-things/Nice-Button';

const { mapState, mapGetters } = createNamespacedHelpers('intervalScheduling');

export default {
  components: {
    ISRow, ISInterval, ISTrayTicks, NiceButton,
  },
  props: [
    'unit',
  ],
  data() {
    return {
      buttonMsg: [
        'Take Next Interval',
        'Remove any Overlaps',
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
    }),
    ...mapGetters([
      'solving',
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
</style>
