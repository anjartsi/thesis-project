<template lang='pug'>
div#sm
  SM-navbar.cant-highlight-text
  div.container-fluid
    div.row.cant-highlight-text
      SM-instance-maker
    hr
    //- Solver goes here
    div.row.cant-highlight-text
      SM-solver

</template>

<script>
// TODO - figure out if these can go anywhere else
import store from './store';
import SMNavbar from './SM-Navbar';
import NiceButton from '../nice-things/Nice-Button';
import SMInstanceMaker from './SM-InstanceMaker';
import SMSolver from './SM-Solver';
import SMPersonBox from './SM-PersonBox';
import stuff from '../../scripts/stuff.js';

export default {
  components: {
    SMInstanceMaker,
    NiceButton,
    SMSolver,
    SMPersonBox,
    SMNavbar,
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
  }, // end methods
};
</script>

<style>
  .cant-highlight-text {
    user-select: none;
  }

html {
  overflow: scroll;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
