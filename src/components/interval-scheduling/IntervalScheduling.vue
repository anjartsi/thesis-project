<template lang='pug'>
div#is.noselect
  IS-navbar
  div.container-fluid
    div.row#controls
      div.col-xs-12
        transition(appear name='fade' mode='out-in')
          div(v-if='editing' key='instanceMaker')
            IS-instance-maker
          div(v-else)
            IS-solver
    hr
    div.row#display(ref='display')
      div.col-xs-12
        h3 Intervals ({{problemSize}} total)
      div.col-xs-12
        IS-tray
    div.row
      transition(name='fade' key='nice-automator')
        nice-automator(
          :funcs='[eft]'
          :speed='500'
          :disableIf='solved || !solving'
        )
    nice-pseudocode(namespace='intervalScheduling')#pseudo
      ul 
        li While there are intervals left
          ul
            li Take the interval with the earliest Finish Time
            li Remove any intervals that overlap with it
    nice-problem(namespace='intervalScheduling')#problem
      ul
        li
          strong Given: 
          |  A list of intervals <em>(StartTime, FinishTime)</em>
        li
          strong Find: 
          em The maximum number
          |   of intervals that can be scheduled without having any two intervals 
          em overlap
          ul 
            li Two intervals are said to <em>overlap</em> if one interval starts after the other starts, but before the other is finished

</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ISNavbar from './IS-Navbar';
import ISInstanceMaker from './IS-InstanceMaker';
import ISSolver from './IS-Solver';
import ISTray from './IS-Tray';
import NiceAutomator from '../nice-things/Nice-Automator';
import NicePseudocode from '../nice-things/Nice-Pseudocode';
import NiceProblem from '../nice-things/Nice-Problem';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('intervalScheduling');

export default {
  components: {
    ISNavbar,
    ISInstanceMaker,
    ISSolver,
    ISTray,
    NiceAutomator,
    NicePseudocode,
    NiceProblem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      'earliestTime',
      'latestTime',
      'solved',
      'problemSize',
      'intervals',
      'unitHeight',
      'scrollToRow'
    ]),
    ...mapGetters([
      'solving',
      'editing'
    ]),
  },
  methods: {
    ...mapActions(['eft']),
    dosomething() {
      this.$store.dispatch('eft');
    },
  },
  watch: {
    scrollToRow(row) {
      const displayElem = this.$refs.display
      if (this.intervals.length === 0) return;
      let top = (row + 1) * this.unitHeight;
      displayElem.scrollTo({top, behavior: 'smooth' })
    }
  },
};
</script>

<style scoped>
#controls {
  height: 160px;
}
#display {
  height: 340px;
  overflow-y: scroll;
}
.noselect {
  user-select: none;
}
#problem em {
  background-color: white;
  color: black;
}
</style>