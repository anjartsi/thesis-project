<template lang='pug'>
div.container-fluid
  //- Title 
  div.row.cant-highlight-text
    h1 Stable Marriage
  //- Create Instance
  hr
  div.row.cant-highlight-text
    SM-instance-maker(
      :n.sync='n'
      :preferences='preferences'
      :locked.sync='locked'
      :colors='colors'
    )
  hr
  div.alert.alert-warning.text-center(v-if='!locked') 
    h3 You must 
      strong#second-lock.text-warning(@click='locked = !locked') lock the instance
      |  before trying to solve it
  //- Solver goes here
  div.row(v-else)
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
        m: [[0, 1], [0, 1]],
        w: [[0, 1], [0, 1]]
      },
      colors: [
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
        '#DDDDDD',
        '#AAAAAA'
      ],
      needsUpdate: true
    }
  },
  // end data
  methods: {
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
    width: 50px;
    height: 50px;
    border: 1px solid black;
    margin-left: 2px
  }
  
  div.personBox p {
    font-weight: bold;
    display: inline-block;
    background-color: white;
    width: 30px;
    height: 30px;
    padding: 3px;
    margin-top: 10px;
    border-radius: 50px;
  }
  div.personBox.m {

  }
  div.personBox.w {
    border-radius: 18px;

  }
  strong#second-lock {
    
  }
  strong#second-lock:hover {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
