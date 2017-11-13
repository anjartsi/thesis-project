<template lang='pug'>
div
  div.row
    h2 Solver
  div.row.text-center
    div.col-xs-6.col-md-4.text-center
      div.col-xs-12
        label Who proposes next?
      div(v-if='!solved')
        select.input-lg(v-model='nextMan.selected')
          option(
            v-for='option in nextMan.options'
            :value='option.value'
          ) {{option.text}}
    div.col-xs-4.col-md-3.col-xl-2
      div.col-xs-12
        label Next Step
      nice-button.btn-primary(
        @click='proposeDispose'
        :class='{disabled: locked}'
        v-if='!clickable && !solved'
      ) Propose / Dispose
    div.col-xs-12.col-md-5.col-xl-4
      div.col-xs-12
        label Message
      div.col-xs-12
        div.alert.alert-info
          h4 {{message}}    
  div.row
    div.col-xs-6.col-lg-4.col-xl-3
      SMSolver-tentative#solver(
        :n='problemSize'
        :colors='colors'
        :tentative='tentatives'
      )
    div.col-xs-6.col-lg-8.col-xl-9
      div.col-xs-12.col-lg-6
        SMSolver-unmatched(
          :n='problemSize'
          :colors='colors'
          :unmatched='unmatched'
          @nextManClickedEvent='nextManClickedEventHandler'
          :clickable='clickable'
        )
      div.col-xs-12.col-lg-6
        SMSolver-proposal(
          :n='problemSize'
          :colors='colors'
          :proposingMan='proposal.man'
          :proposedToWoman='proposal.woman'
          :preferences='preferences'
          :rejections='rejections'
          :solved='solved'
          :proposals='proposalCount'
        )  
  hr
  div.row
    nice-automator(
      v-if='!clickable'
      :funcs='[proposeDispose]'
      :speed='500'
      :finished='solved'
    )
</template>

<script>
import NiceButton from '../nice-things/NiceButton';
import NiceAutomator from '../nice-things/NiceAutomator';
import SMSolverUnmatched from './SMSolverUnmatched';
import SMSolverTentative from './SMSolverTentative';
import SMSolverProposal from './SMSolverProposal';

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
    this.$store.commit('resetSolver');
  },
  // end updated
  data() {
    return {
      ready: this.locked,
      nextMan: {
        // Different ways of deciding which man gets to propose next
        selected: 0,
        clickedMan: -1,
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
              return Math.floor(0 + (1 + max - 1) * Math.random());
            },
          },
          {
            text: 'Choose By Clicking',
            value: 3,
            whoProposes() { return -1; },
          },
        ],
        // end options
      },
    };
    // end nextMan
  },
  // end data
  computed: {
    locked() { return this.$store.getters.editing; },
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
  },
  // end computed
  watch: {},
  methods: {
    proposeDispose() {
      const proposingMan = this.unmatched.m[0];
      this.$store.dispatch('proposeDispose', { proposingMan });
    },
    // end proposeDispose
    changeNextManStyle() {
      this.nextManStyle += 1;
      this.nextManStyle %= this.nextMan.length;
    },
    nextManClickedEventHandler(man) {
      if (this.clickable) {
        this.nextMan.clickedMan = this.unmatched.men.indexOf(man);
        if (this.proposingMan === man) {
          // If the same man is clicked twice, move as normal
          this.proposeDispose();
        } else {
          // If a different man is clicked, reset the proposingMan to start over
          this.proposingMan = -1;
          this.proposeDispose();
        }
        this.nextMan.clickedMan = -1;
      }
    },
  },
  // end methods
};
</script>

<style scoped>
#solver {
  /*height: 300px;*/
}

.alert > h4 {
  margin: 0px;
}
</style>