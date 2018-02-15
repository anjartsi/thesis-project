<template lang='pug'>
div.container-fluid
  div.row
    h2 Solver
  div.col-xs-12#alertContainer
    transition(appear name='fade' key='solverAlert')
      div.alert.alert-info.text-center(v-show='!solving') 
        h3 You must be in 
          button.btn.btn-lg.btn-primary(@click='$store.dispatch("switchMode")') Solve Mode
          |  before trying to solve the problem
  div.row.text-center
    div.col-xs-6.col-md-4.text-center
      div.col-xs-12
        label Who proposes next?
      transition(appear name='fade' key='nextMan')
        div(v-show='solving && !solved')
          select.input-lg(v-model='nextMan.selected')
            option(
              v-for='option in nextMan.options'
              :value='option.value'
            ) {{option.text}}
    div.col-xs-4.col-md-3.col-xl-2
      div.col-xs-12
        label Next Step
      transition(appear name='fade' key='proposeDispose')
        nice-button.btn-primary(
          @click='proposeDispose'
          :class='{disabled: solved}'
          v-show='solving && !solved'
        ) Propose / Dispose
    div.col-xs-12.col-md-5.col-xl-4
      div.col-xs-12
        label Message
      div.col-xs-12
        div.alert.alert-info
          h4 {{message}}    
  div.row
    div.col-xs-6.col-lg-4
      SMSolver-tentative
    div.col-xs-6.col-lg-4
      SMSolver-unmatched(
        @nextManClickedEvent='nextManClickedEventHandler'
        :clickable='clickable'
      )
    div.col-xs-12.col-lg-4
      SMSolver-proposal
  hr
  div.row
    transition(name='fade' key='nice-automator')
      nice-automator(
        v-show='!clickable'
        :funcs='[proposeDispose]'
        :speed='500'
        :finished='solved'
      )
</template>

<script>
import NiceButton from '../nice-things/Nice-Button';
import NiceAutomator from '../nice-things/Nice-Automator';
import SMSolverUnmatched from './SM-SolverUnmatched';
import SMSolverTentative from './SM-SolverTentative';
import SMSolverProposal from './SM-SolverProposal';

export default {
  components: {
    SMSolverUnmatched, SMSolverTentative, SMSolverProposal, NiceButton, NiceAutomator,
  },
  // end components
  props: [
    'colors',
  ],
  // end props
  created() {
  },
  // end updated
  data() {
    return {
      ready: this.locked,
      nextMan: {
        // Different ways of deciding which man gets to propose next
        selected: 0,
        options: [
          {
            text: 'Least Recently Unmatched',
            value: 0,
            whoProposes() { return 0; },
          },
          {
            text: 'Most Recently Unmatched',
            value: 1,
            whoProposes(max) { return max - 1; },
          },
          {
            text: 'Random',
            value: 2,
            whoProposes(max) {
              return Math.floor(0 + (max - 1) * Math.random());
            },
          },
          {
            clickedMan: -1,
            text: 'Choose By Clicking',
            value: 3,
            whoProposes() { return this.clickedMan; },
          },
        ], // end options
      },
    }; // end nextMan
  }, // end data
  computed: {
    solving() { return this.$store.getters.solving; },
    problemSize() { return this.$store.state.problemSize; },
    preferences() { return this.$store.state.preferences; },
    unmatched() { return this.$store.state.unmatched; },
    tentatives() { return this.$store.state.tentatives; },
    rejections() { return this.$store.state.rejections; },
    proposal() { return this.$store.state.proposal; },
    solved() { return this.$store.state.solved; },
    proposalCount() { return this.$store.state.proposalCount; },
    message() { return this.$store.state.message; },
    clickable() {
      return this.nextMan.options[this.nextMan.selected].text.toLowerCase().includes('clicking');
    },
  }, // end computed
  methods: {
    proposeDispose() {
      const style = this.nextMan.selected;
      const index = this.nextMan.options[style].whoProposes(this.unmatched.m.length);
      const proposingMan = this.unmatched.m[index];
      this.$store.dispatch('proposeDispose', { proposingMan });
    }, // end proposeDispose
    nextManClickedEventHandler(man) {
      if (this.clickable) {
        this.nextMan.options[3].clickedMan = this.unmatched.m.indexOf(man);
        if (this.proposal.man === man) {
          // eslint-disable-next-line
          console.log('hi')
          // If the same man is clicked twice, move as normal
          this.proposeDispose();
        } else {
          // If a different man is clicked, reset the proposingMan to start over
          this.proposingMan = -1;
          this.proposeDispose();
        }
        this.nextMan.clickedMan = -1;
      }
    }, // end nextManClickedEventHandler
  }, // end methods
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
  height: 400px;
  width: 102%;
  z-index: 1;
}

</style>