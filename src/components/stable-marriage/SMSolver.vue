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
        :class='{disabled: !locked}'
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
        :n='n'
        :colors='colors'
        :tentative='tentatives'
      )
    div.col-xs-6.col-lg-8.col-xl-9
      div.col-xs-12.col-lg-6
        SMSolver-unmatched(
          :n='n'
          :colors='colors'
          :unmatched='unmatched'
          @nextManClickedEvent='nextManClickedEventHandler'
          :clickable='clickable'
        )
      div.col-xs-12.col-lg-6
        SMSolver-proposal(
          :n='n'
          :colors='colors'
          :proposingMan='proposingMan'
          :proposedToWoman='proposedToWoman'
          :preferences='preferences'
          :rejections='rejections'
          :solved='solved'
          :proposals='proposals'
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
    'locked', 'n', 'preferences', 'colors',
  ],
  // end props
  created() {
    this.reset();
  },
  // end updated
  data() {
    return {
      ready: this.locked,
      unmatched: {
        men: [],
        women: [],
      },
      tentatives: [],
      rejections: [],
      proposingMan: -1,
      proposedToWoman: -1,
      proposals: 0,
      message: 'Click to perform the next step of the algorithm',
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
    solved() {
      const slvd = this.tentatives.length === this.n;
      if (slvd) {
        // do something
      }
      return slvd;
    },
    clickable() {
      return this.nextMan.options[this.nextMan.selected].text.toLowerCase().includes('clicking');
    },
  },
  // end computed
  watch: {
    locked(newValue) {
      // When the instance is unlocked,
      this.ready = newValue;
      if (this.ready) {
        // make sure to clear all previous data
        this.reset();
      }
    },
  },
  methods: {
    reset() {
      this.unmatched.men = [];
      this.unmatched.women = [];
      // this.tentative = []
      for (let i = 0; i < this.n; i++) {
        // Make every person unmatched
        this.$set(this.unmatched.men, i, i);
        this.$set(this.unmatched.women, i, i);
      }
      // Remove any previous rejections
      this.rejections = [];
      for (let i = 0; i < this.n; i++) {
        this.rejections.push([]);
        for (let j = 0; j < this.n; j++) {
          this.rejections[i].push(false);
        }
      }
      // Remove any tentative matches
      this.tentatives = [];
    },
    // end reset()
    removeFromArray(arr, item) {
      // Remove an item from an array
      // Using this.$delete will update Vue components
      const index = arr.indexOf(item);
      if (index !== -1) {
        this.$delete(arr, index);
      }
    },
    // end removeFromArray()
    proposeDispose() {
      if (this.proposingMan === -1) {
        this.propose();
      } else if (this.proposedToWoman !== -1) {
        this.respond();
      } else {
        this.propose();
      }
      if (this.solved) {
        this.message = 'All people have been matched. The algorithm terminates';
      }
    },
    // end proposeDispose
    propose() {
      let man = this.nextMan.options[this.nextMan.selected].whoProposes(this.unmatched.men.length);
      if (man === -1) {
        man = this.nextMan.clickedMan;
      }
      if (man === -1) {
        return;
      }
      // only propose if there are unmatched men left
      if (this.unmatched.men.length > 0) {
        this.proposingMan = this.unmatched.men[man];
        let i = 0;
        let rejected = true;
        while (rejected) {
          // Propose to the next woman on his preference list who has not yet rejected him
          this.proposedToWoman = this.preferences.m[this.proposingMan][i];
          rejected = this.rejections[this.proposingMan][this.proposedToWoman];
          i++;
        }
        this.message = `Man ${this.proposingMan + 1} proposes to Woman ${this.proposedToWoman + 1}`;
      } // end if()
    },
    // end propose
    respond() {
      if (this.proposingMan === -1 || this.proposedToWoman === -1) {
        return;
      }
      this.proposals += 1;
      const herPref = this.preferences.w[this.proposedToWoman];
      let currentMatch;
      let index = -1;
      for (let i = 0; i < this.tentatives.length; i++) {
        // If she is tentatively matched
        if (this.tentatives[i].woman === this.proposedToWoman) {
          currentMatch = this.tentatives[i].man;
          index = i;
        }
      }
      // If she is unmatched she accepts
      if (index === -1) {
        this.tentatives.push({ man: this.proposingMan, woman: this.proposedToWoman });
        this.removeFromArray(this.unmatched.women, this.proposedToWoman);
        this.removeFromArray(this.unmatched.men, this.proposingMan);
        this.message = `Woman ${this.proposedToWoman + 1} is unmatched, so she accepts.`;
        this.proposingMan = -1;
      } else if (herPref.indexOf(currentMatch) < herPref.indexOf(this.proposingMan)) {
        // She IS tentatively matched
        // if she prefers her tentative match
        // reject the proposer
        this.$set(this.rejections[this.proposingMan], this.proposedToWoman, true);
        this.message = `Woman ${this.proposedToWoman + 1} prefers her current tentative match`;
      } else { // if she prefers the new proposal
        // The proposer is no longer unmatched
        this.removeFromArray(this.unmatched.men, this.proposingMan);
        // reject the ex-match
        this.$set(this.rejections[currentMatch], this.proposedToWoman, true);
        // her ex-match is now unmatched
        this.unmatched.men.push(currentMatch);
        // remove the old tentative match and add the new one
        this.$delete(this.tentatives, index);
        this.tentatives.push({ man: this.proposingMan, woman: this.proposedToWoman });
        this.message = `Woman ${this.proposedToWoman + 1} likes ${this.proposingMan + 1} more than her tentative match (${currentMatch}), she accepts the proposal.`;
        this.proposingMan = -1;
      } // end else (accepted the proposal)

      // sort tentatives by the men's number
      this.tentatives.sort((a, b) => a.man - b.man);
      this.proposedToWoman = -1;
    },
    // end respond()
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