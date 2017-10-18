<template lang='pug'>
div
  div.row.row-eq-height
    div.col-xs-2.border
      SMSolver-tentative(
        :n='n'
        :colors='colors'
        :tentative='tentative'
      )
    div.col-xs-6.border
      SMSolver-unmatched(
        :n='n'
        :colors='colors'
        :unmatched='unmatched'
      )
    div.col-xs-4.border
      SMSolver-proposal(
        :n='n'
        :colors='colors'
      )
</template>

<script>
import SMSolverUnmatched from './SMSolverUnmatched'
import SMSolverTentative from './SMSolverTentative'
import SMSolverProposal from './SMSolverProposal'

export default {
  components: {
    SMSolverUnmatched, SMSolverTentative, SMSolverProposal
  },
  // end components
  props: [
    'locked', 'n', 'preferences', 'colors'
  ],
  // end props
  created: function () {
    this.reset()
  },
  // end created
  updated: function () {
    this.reset()
  },
  // end updated
  data () {
    return {
      unmatched: {
        men: [],
        women: []
      },
      tentative: [{man: 3, woman: 2}, {man: 1, woman: 3}]
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
      // this.tentative = []
    },
    // end reset()
    removeFromArray: function (arr, item) {
      // Remove an item from an array
      // Using this.$delete will update Vue components
      let index = arr.indexOf(item)
      if (index !== -1) {
        this.$delete(arr, index)
      }
    }
  }
  // end methods
}
</script>

<style scoped>

.row.row-eq-height {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}

.row.row-eq-height > [class*='col-'] {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
}

.border:nth-child(2) {
  border-right: 1px solid black;
  border-left: 1px solid black;
}
</style>