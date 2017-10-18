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
      :colors='colors'
    )
  //- Buttons
  div.row.cant-highlight-text
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
      :colors='colors'
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
      },
      colors: [
        '#DDDDDD',
        '#0074D9',
        '#FF4136',
        '#2ECC40',
        '#FFDC00',
        '#7FDBFF',
        '#F012BE',
        '#01FF70',
        '#FF851B',
        '#39CCCC',
        '#B10DC9',
        '#AAAAAA'
      ]
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

  div.personBox {
    display: inline-block;
    text-align: center;
    width: 9.5%;
    height: 4em;
    border: 1px solid black;
    border-radius: 10px;
    margin-left: 2px
  }
  
  div.personBox p {
    font-weight: bold;
    display: inline-block;
    background-color: white;
    width: 2em;
    height: 2em;
    padding: 3px;
    margin-top: 1em;
    border-radius: 50px;
  }
</style>
