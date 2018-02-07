<template lang="pug">
div
  div.row 
    h1 Solver
  div.col-xs-12#alertContainer
    transition(appear name='fade' key='solverAlert')
      div.alert.alert-info.text-center(v-show='!solving') 
        h3 You must be in 
          button.btn.btn-lg.btn-primary(@click='$store.dispatch("switchMode")') Solve Mode
          |  before trying to solve the problem
  div.row
    div.col-xs-2
      nice-button.btn-primary(@click='dosomething') {{buttonMsg[step]}}
      br
      div.alert.alert-success.text-center
        h4 Total: {{rowData.length}}
    div.col-xs-10
      div#solverTray(:style='trayStyle')
        IS-tray-ticks(:unit='unit')
        div.trayRow(:style='rowStyle')
          IS-interval(
            v-for='(interval, index) in rowData'
            :key='index + "interval"'
            :index='interval'
            :unit='unit'
          )
        IS-tray-ticks(:unit='unit')

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
    'unit', 'trayStyle', 'rowStyle',
  ],
  data() {
    return {
      buttonMsg: [
        'Add Next Interval',
        'Remove Conflicts',
      ],
    };
  },
  computed: {
    ...Vuex.mapState([
      'earliestTime',
      'latestTime',
      'step',
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
      this.$store.dispatch('eft');
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
