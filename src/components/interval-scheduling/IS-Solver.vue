<template lang="pug">
div
  div.row 
    h1 Solver
  div.row
    div.col-xs-12
      nice-button.btn-primary(
        @click='dosomething'
        :class='{ disabled: solved }'
        ) Click Me! 
      h4.text-center(v-if='!solved') {{buttonMsg[step % maxSteps]}}
      h4.text-center(v-else) Finished!
  br
  div.row
    div.alert.alert-success.text-center
      h4 Total Intervals in Solution: {{rowData.length}}
    div.alert.alert-warning.text-center
      h4 Number of Steps Performed: {{step}}

</template>

<script>
import Vuex from 'vuex';
import ISRow from './IS-Row';
import ISInterval from './IS-Interval';
import ISTrayTicks from './IS-TrayTicks';
import NiceButton from '../nice-things/Nice-Button';

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
    ...Vuex.mapState([
      'earliestTime',
      'latestTime',
      'step',
      'maxSteps',
      'solved',
    ]),
    solving() {
      return this.$store.getters.solving;
    },
    rowData() {
      return this.$store.state.solution;
    },
  }, // end computed
  methods: {
    dosomething() {
      if (!this.solved) {
        this.$store.dispatch('eft');
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
