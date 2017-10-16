<template lang='pug'>
div.container-fluid
  div.row
    div.row
      h1 Stable Marriage
    div.row
      h2.col-xs-12(style="text-align:center") The Problem Instance
      //- Main UI Here
      div.row
        stable-marriage-instance-maker(
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
</template>

<script>
import NiceButton from '../generic/NiceButton'
import StableMarriageInstanceMaker from './StableMarriageInstanceMaker'

export default {
  components: {
    StableMarriageInstanceMaker, NiceButton
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
  
</style>
