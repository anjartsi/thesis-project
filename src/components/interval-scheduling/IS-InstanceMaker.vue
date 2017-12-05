<template lang="pug">
div.container-fluid
  div.row
    h2.pull-left The Problem Instance
  div.row
    div.col-xs-3.col-lg-2
      //- Problem Size
      div.row
        problem-size-control
      transition(appear name='fade' key='instanceMaker')
    div.col-xs-4
      div.col-xs-6
        nice-button.btn-primary(@click='addInterval') Add Interval
      div.col-xs-6
        nice-button.btn-danger(@click='removeInterval') Remove Interval
  div.row
    div.col-xs-12
      ul
        IS-interval(
          v-for='(interval, index) in intervals'
          :key='index'
          :index='index'
        ) 
</template>

<script>
import ProblemSizeControl from '../nice-things/Nice-ProblemSizeControl';
import NiceButton from '../nice-things/Nice-Button';
import ISInterval from './IS-Interval';

export default {
  components: {
    NiceButton,
    ProblemSizeControl,
    ISInterval,
  },
  computed: {
    locked() {
      return this.$store.getters.editing;
    },
    intervals() {
      return this.$store.state.intervals;
    },
  }, // end computed
  methods: {
    addInterval() {
      this.$store.commit('addInterval');
    },
    removeInterval() {
      this.$store.commit('removeInterval', { index: 0 });
    },
  },
};
</script>

<style scoped>

#buttonContainer div {
  margin-top: 2em;
}
</style>
