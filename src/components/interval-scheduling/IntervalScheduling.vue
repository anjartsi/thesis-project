<template lang='pug'>
div#is
  IS-navbar
  div.container-fluid
    div.row
      IS-instance-maker(
        :unit='unit'
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
      unit: 30,
    };
  },
  computed: {
    ...Vuex.mapState([
      'earliestTime', 'latestTime',
    ]),
  },
};
</script>

<style scoped>
  
</style>