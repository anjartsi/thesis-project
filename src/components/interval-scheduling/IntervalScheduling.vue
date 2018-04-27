<template lang='pug'>
div#is
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
    
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ISNavbar from './IS-Navbar';
import ISInstanceMaker from './IS-InstanceMaker';
import ISSolver from './IS-Solver';
import ISTray from './IS-Tray';
import NiceAutomator from '../nice-things/Nice-Automator';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('intervalScheduling');

export default {
  components: {
    ISNavbar,
    ISInstanceMaker,
    ISSolver,
    ISTray,
    NiceAutomator,
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
  
</style>