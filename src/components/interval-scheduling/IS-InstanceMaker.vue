<template lang="pug">
div.container-fluid
  div.row
    h2.pull-left The Problem Instance
  div.row
    div.col-xs-3.col-lg-2
      div.row.text-center#problemSizeDisplay
        div.col-xs-12
          h3 ProblemSize
        div.col-xs-12
          label n = {{problemSize}}

      transition(appear name='fade' mode='out-in')
        div.row(v-if='locked' key='instanceMaker')
          div.col-xs-12
            h4 Add New Interval
          div.col-xs-12
            IS-add-interval
        div.row(v-else key='solver')
          div.col-xs-12
            IS-solver
    div.col-xs-9.col-lg-10
      h3 Intervals
      IS-tray(
        :unit='unit'
        :trayStyle='trayStyle'
        :rowStyle='rowStyle'
      )
  div.row
    div.col-xs-12
      ul
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ProblemSizeControl from '../nice-things/Nice-ProblemSizeControl';
import NiceButton from '../nice-things/Nice-Button';
import ISAddInterval from './IS-AddInterval';
import ISTray from './IS-Tray';
import ISSolver from './IS-Solver';

const { mapState, mapGetters } = createNamespacedHelpers('intervalScheduling');

export default {
  components: {
    NiceButton,
    ProblemSizeControl,
    ISAddInterval,
    ISTray,
    ISSolver,
  },
  props: ['unit', 'trayStyle', 'rowStyle'],
  data() {
    return {
      startTime: 0,
      finishTime: 2,
    };
  },
  computed: {
    ...mapState([
      'problemSize',
      'earliestTime',
      'latestTime',
      'intervals',
    ]),
    ...mapGetters({
      locked: 'editing',
    }),
  }, // end computed
  methods: {
  },
};
</script>

<style scoped>

div#problemSizeDisplay label{
  font-size: 1.4em;
}

#buttonContainer div {
  margin-top: 2em;
}

</style>
