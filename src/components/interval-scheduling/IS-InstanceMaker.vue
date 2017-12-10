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

      transition(appear name='fade' key='instanceMaker')
        div.row(v-show='locked')
          div.col-xs-12
            h4 Add New Interval
          div.col-xs-12
            IS-add-interval
    div.col-xs-9.col-lg-10
      h3 Tray
      IS-tray
  div.row
    div.col-xs-12
      ul
</template>

<script>
import ProblemSizeControl from '../nice-things/Nice-ProblemSizeControl';
import NiceButton from '../nice-things/Nice-Button';
import ISAddInterval from './IS-AddInterval';
import ISTray from './IS-Tray';


export default {
  components: {
    NiceButton,
    ProblemSizeControl,
    ISAddInterval,
    ISTray,

  },
  data() {
    return {
      startTime: 0,
      finishTime: 2,
    };
  },
  computed: {
    problemSize() { return this.$store.state.problemSize; },
    earliestTime() { return this.$store.state.earliestTime; },
    latestTime() { return this.$store.state.latestTime; },
    locked() {
      return this.$store.getters.editing;
    },
    intervals() {
      return this.$store.state.intervals;
    },
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
