<template lang='pug'>
div.container-fluid
  //- Title 
  div.row.cant-highlight-text
    h1 Stable Marriage
    div.col-xs-2
      nice-button(@click='increment')
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
  div.row.cant-highlight-text
    SM-solver(
      v-if='locked'
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
import SMPersonBox from './SMPersonBox'

// TODO - figure out if these can go anywhere else
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// TODO: use store instead of many many props
const store = new Vuex.Store({
  state: {
  },
  mutations: {
  }
})

export default {
  components: {
    SMInstanceMaker, NiceButton, SMSolver, SMPersonBox
  },
  // end components
  store,
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
    increment () {
      store.commit('increment')
    }
  },
  // end methods
  computed: {
    count () {
      return store.state.count
    }

  }
}
</script>

<style>
  .cant-highlight-text {
    user-select: none;
  }

  strong#second-lock {
    
  }
  strong#second-lock:hover {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
