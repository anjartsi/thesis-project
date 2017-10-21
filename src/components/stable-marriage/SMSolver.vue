<template lang='pug'>
div
  div.row
    div.col-xs-12
      h2 Solver
  div.row
    div.col-xs-2
      nice-button(
        @click='proposeDispose'
        :class='{disabled: !locked}'
      ) Propose / Dispose
    div.col-xs-5
      div.alert.alert-info.text-center
        h4 {{message}}
  div.row
    div.col-xs-3
      SMSolver-tentative#solver(
        :n='n'
        :colors='colors'
        :tentative='tentatives'
      )
    div.col-xs-9
      div.col-xs-6
        SMSolver-unmatched(
          :n='n'
          :colors='colors'
          :unmatched='unmatched'
        )
      div.col-xs-6
        SMSolver-proposal(
          :n='n'
          :colors='colors'
          :proposingMan='proposingMan'
          :proposedToWoman='proposedToWoman'
          :preference='preferences.m[proposingMan]'
          :rejection='rejections[proposingMan]'
          :solved='solved'
        )
</template>

<script>
import NiceButton from '../generic/NiceButton'
import SMSolverUnmatched from './SMSolverUnmatched'
import SMSolverTentative from './SMSolverTentative'
import SMSolverProposal from './SMSolverProposal'

export default {
  components: {
    SMSolverUnmatched, SMSolverTentative, SMSolverProposal, NiceButton
  },
  // end components
  props: [
    'locked', 'n', 'preferences', 'colors'
  ],
  // end props
  created: function () {
    this.reset()
  },
  // end updated
  data () {
    return {
      ready: this.locked,
      unmatched: {
        men: [],
        women: []
      },
      tentatives: [],
      rejections: [],
      proposingMan: -1,
      proposedToWoman: -1,
      message: 'Click here to perform the next step of the algorithm'
    }
  },
  // end data
  computed: {
    solved: function () {
      return this.tentatives.length === this.n
    }
  },
  // end computed
  watch: {
    locked: function (newValue) {
      // When the instance is unlocked,
      this.ready = newValue
      if (this.ready) {
        // make sure to clear all previous data
        this.reset()
      }
    }
  },
  methods: {
    reset: function () {
      this.unmatched.men = []
      this.unmatched.women = []
      // this.tentative = []
      for (let i = 0; i < this.n; i++) {
        // Make every person unmatched
        this.$set(this.unmatched.men, i, i)
        this.$set(this.unmatched.women, i, i)
      }
      // Remove any previous rejections
      this.rejections = []
      for (let i = 0; i < this.n; i++) {
        this.rejections.push([])
        for (let j = 0; j < this.n; j++) {
          this.rejections[i].push(false)
        }
      }
      // Remove any tentative matches
      this.tentatives = []
    },
    // end reset()
    removeFromArray: function (arr, item) {
      // Remove an item from an array
      // Using this.$delete will update Vue components
      let index = arr.indexOf(item)
      if (index !== -1) {
        this.$delete(arr, index)
      }
    },
    // end removeFromArray()
    proposeDispose: function () {
      if (this.proposingMan === -1) {
        this.propose(0)
      } else if (this.proposedToWoman !== -1) {
        this.respond()
      } else {
        this.propose(0)
      }
      if (this.solved) {
        this.message = 'All people have been matched. The algorithm terminates'
      }
    },
    propose: function (man) {
      if (!man) {
        man = 0
      }
      // only propose if there are unmatched men left
      if (this.unmatched.men.length > 0) {
        this.proposingMan = this.unmatched.men[man]
        let i = 0
        let rejected = true
        while (rejected) {
          // Propose to the next woman on his preference list who has not yet rejected him
          this.proposedToWoman = this.preferences.m[this.proposingMan][i]
          rejected = this.rejections[this.proposingMan][i]
          i++
        }
        this.message = 'Man ' + (this.proposingMan + 1) + ' proposes to Woman ' + (this.proposedToWoman + 1)
      } // end if()
    },
    // end propose
    respond: function () {
      if (this.proposingMan === -1 || this.proposedToWoman === -1) {
        return
      }
      let herPref = this.preferences.w[this.proposedToWoman]
      let currentMatch
      let index = -1
      for (let i = 0; i < this.tentatives.length; i++) {
        // If she is tentatively matched
        if (this.tentatives[i].woman === this.proposedToWoman) {
          currentMatch = this.tentatives[i].man
          index = i
        }
      }
      // If she is unmatched she accepts
      if (index === -1) {
        this.tentatives.push({man: this.proposingMan, woman: this.proposedToWoman})
        this.removeFromArray(this.unmatched.women, this.proposedToWoman)
        this.removeFromArray(this.unmatched.men, this.proposingMan)
        this.message = 'Woman ' + (this.proposedToWoman + 1) + ' is unmatched so she accepts'
        this.proposingMan = -1
      } else { // She IS tentatively matched
        // if she prefers her tentative match
        if (herPref.indexOf(currentMatch) < herPref.indexOf(this.proposingMan)) {
          // reject the proposer
          this.$set(this.rejections[this.proposingMan], this.preferences.m[this.proposingMan].indexOf(this.proposedToWoman), true)
          this.message = 'Woman ' + (this.proposedToWoman + 1) + ' prefers her current tentative match'
        } else { // if she prefers the new proposal
          // The proposer is no longer unmatched
          this.removeFromArray(this.unmatched.men, this.proposingMan)
          // reject the ex-match
          this.$set(this.rejections[currentMatch], this.preferences.m[currentMatch].indexOf(this.proposedToWoman), true)
          // her ex-match is now unmatched
          this.unmatched.men.push(currentMatch)
          // remove the old tentative match and add the new one
          this.$delete(this.tentatives, index)
          this.tentatives.push({man: this.proposingMan, woman: this.proposedToWoman})
          this.message = 'Woman ' + (this.proposedToWoman + 1) + ' likes him more than her tentative match, she accepts'
          this.proposingMan = -1
        } // end else (accepted the proposal)
      }
      this.proposedToWoman = -1
    }
    // end respond()
  }
  // end methods
}
</script>

<style scoped>
#solver {
  height: 220px;
}

.alert > h4 {
  margin: 0px;
}
</style>