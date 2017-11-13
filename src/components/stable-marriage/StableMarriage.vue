<template lang='pug'>
div.container-fluid
  //- Title 
  div.row.cant-highlight-text
    h1 Stable Marriage
    div.col-xs-2
  //- Create Instance
  hr
  div.row.cant-highlight-text
    SM-instance-maker(
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
      :colors='colors'
    )

</template>

<script>
// TODO - figure out if these can go anywhere else
import Vuex from 'vuex';
import store from './store';
import NiceButton from '../nice-things/NiceButton';
import SMInstanceMaker from './SMInstanceMaker';
import SMSolver from './SMSolver';
import SMPersonBox from './SMPersonBox';
import stuff from '../../stuff.js';

export default {
  components: {
    SMInstanceMaker, NiceButton, SMSolver, SMPersonBox,
  },
  // end components
  store,
  data() {
    return {
      colors: stuff.colors,
    };
  },
  // end data
  methods: {
  },
  // end methods
  computed: Vuex.mapState({
    problemSize: 'problemSize',
    locked: 'locked',
    preferences: 'preferences',
  }),
};
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
