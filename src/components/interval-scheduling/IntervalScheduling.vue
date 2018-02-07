<template lang='pug'>
div#is
  IS-navbar
  div.container-fluid
    div.row
      IS-instance-maker(
        :unit='unit'
        :trayStyle='trayStyle'
        :rowStyle='rowStyle'
        )
    hr
    div.row
      IS-solver(
        :unit='unit'
        :trayStyle='trayStyle'
        :rowStyle='rowStyle'
        )
    
</template>

<script>
import Vuex from 'vuex';
import store from './store';
import ISNavbar from './IS-Navbar';
import ISInstanceMaker from './IS-InstanceMaker';
import ISSolver from './IS-Solver';

export default {
  components: {
    ISNavbar,
    ISInstanceMaker,
    ISSolver,
  },
  store,
  data() {
    return {
      unit: 45,
    };
  },
  computed: {
    ...Vuex.mapState([
      'earliestTime', 'latestTime',
    ]),
    trayStyle() {
      return {
        'padding-left': `${this.unit}px`,
        border: '1px solid black',
        'user-select': 'none',
        'overflow-x': 'auto',
        width: '100%',
      };
    },
    rowStyle() {
      return {
        width: `${this.unit * (this.latestTime - this.earliestTime)}px`,
        position: 'relative',
        height: '50px',
      };
    },
  },
};
</script>

<style scoped>
  
</style>