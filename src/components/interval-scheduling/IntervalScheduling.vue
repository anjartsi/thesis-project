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
          :funcs='[eft]'
          :speed='500'
          :disableIf='solved || !solving'
        )
    
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ISNavbar from './IS-Navbar';
import ISInstanceMaker from './IS-InstanceMaker';
import ISSolver from './IS-Solver';
import NiceAutomator from '../nice-things/Nice-Automator';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('intervalScheduling');

export default {
  components: {
    ISNavbar,
    ISInstanceMaker,
    ISSolver,
    NiceAutomator,
  },
  data() {
    return {
      unit: 30,
    };
  },
  computed: {
    ...mapState([
      'earliestTime', 'latestTime', 'solved',
    ]),
    ...mapGetters([
      'solving',
    ]),
  },
  methods: {
    ...mapActions(['eft']),
    dosomething() {
      this.$store.dispatch('eft');
    },
  },
};
</script>

<style scoped>
  
</style>