<template lang='pug'>
div.container-fluid
  //- Title 
  div.row.cant-highlight-text
    h1 Stable Marriage
  //- Create Instance
  div.row.cant-highlight-text
    div.col-xs-12
      h2(style="text-align:center") The Problem Instance
    SM-instance-maker(
      :n.sync='n'
      :preferences='preferences'
      :locked='locked'
    )
  //- Buttons
  div.row
    h4.text-center Functions
    div.row(style="text-align: center")
      div.col-xs-2
        nice-button.btn-warning(v-if='locked' @click='lock') Unlock Instance 
          i.fa.fa-unlock
        nice-button.btn-warning(v-else @click='lock') Lock Instance 
          i.fa.fa-lock
      div.col-xs-2
        nice-button Propose-Dispose
  //- Solver goes here
  div.row
    SM-solver(
      :locked='locked'
      :preferences='preferences'
      :n='n'
    )
</template>

<script>
import NiceButton from '../generic/NiceButton'
import SMInstanceMaker from './SMInstanceMaker'
import SMSolver from './SMSolver'

export default {
  components: {
    SMInstanceMaker, NiceButton, SMSolver
  },
  // end components
  data () {
    return {
      n: 2,
      locked: false,
      preferences: {
        m: [[1, 2], [1, 2]],
        w: [[1, 2], [1, 2]]
      }
    }
  },
  // end data
  methods: {
    lock: function () {
      this.locked = !this.locked
    }
  }
  // end methods
}
</script>

<style>
  .cant-highlight-text {
    user-select: none;
  }
</style>
