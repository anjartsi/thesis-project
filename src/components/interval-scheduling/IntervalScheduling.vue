<template lang='pug'>
div#is
  IS-navbar
  div.container-fluid
    div.row
      IS-instance-maker
    hr
    div.row
      IS-solver
    
</template>

<script>
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
    return {};
  },
};
</script>

<style scoped>
  
</style>