<template lang='pug'>
div#is
  IS-navbar
  div.container-fluid
    div.row
      IS-instance-maker(
        :unit='unit'
        )
    div.row
      transition(name='fade' key='nice-automator')
        nice-automator(
          :funcs='[dosomething]'
          :speed='500'
          :finished='solved || !solving'
        )
    
</template>

<script>
import Vuex from 'vuex';
import store from './IS-store';
import ISNavbar from './IS-Navbar';
import ISInstanceMaker from './IS-InstanceMaker';
import ISSolver from './IS-Solver';
import NiceAutomator from '../nice-things/Nice-Automator';

export default {
  components: {
    ISNavbar,
    ISInstanceMaker,
    ISSolver,
    NiceAutomator,
  },
  store,
  data() {
    return {
      unit: 30,
    };
  },
  computed: {
    ...Vuex.mapState([
      'earliestTime', 'latestTime', 'solved',
    ]),
    ...Vuex.mapGetters([
      'solving',
    ]),
  },
  methods: {
    dosomething() {
      this.$store.dispatch('eft');
    },
  },
};
</script>

<style scoped>
  
</style>