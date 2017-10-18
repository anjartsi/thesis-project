<template lang='pug'>
div
  div.row
    nice-button(@click='pd')
  div.row
    div.col-xs-4
      SMSolver-tentative(
        :n='n'
        :colors='colors'
        :tentative='tentative'
      )
    div.col-xs-8
      div.row
        SMSolver-unmatched(
          :n='n'
          :colors='colors'
          :unmatched='unmatched'
        )
      div.row
        SMSolver-proposal(
          :n='n'
          :colors='colors'
          :proposingMan='proposingMan'
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
  updated: function () {
    if (!this.locked) {
      this.reset()
    }
  },
  // end updated
  data () {
    return {
      unmatched: {
        men: [],
        women: []
      },
      tentative: [{man: 1, woman: 1}, {man: 2, woman: 2}, {man: 3, woman: 3}],
      proposingMan: null
    }
  },
  // end data
  computed: {
  },
  // end computed
  methods: {
    reset: function () {
      this.unmatched.men = []
      this.unmatched.women = []
      // Make every person unmatched
      for (let i = 0; i < this.n; i++) {
        this.$set(this.unmatched.men, i, i + 1)
        this.$set(this.unmatched.women, i, i + 1)
      }
      // Remove any tentative matches
      for (let i = 0; i < this.tentative.length; i++) {
        this.tentative.pop()
      }
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
    pd: function () {
      this.proposingMan = this.unmatched.men[0]
      this.unmatched.men.shift()
    }
  }
  // end methods
}
</script>

<style scoped>
</style>