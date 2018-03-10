<template lang="pug">
div#cpop
  CPOP-navbar
  //- Left navbar
  div#leftNav.nav.nav-pills.nav-stacked
    div(v-if='editing')
      div.col-xs-12
      CPOP-instance-maker
      nice-message-output(
        namespace='closestPairOfPoints'
        :messages='messages.instanceMaker'
        :displayHistory='true'
        :height='200'
        ) Messages
    div(v-else)
      CPOP-solver
      nice-message-output(
        namespace='closestPairOfPoints'
        :messages='messages.solver'
        :displayHistory='true'
        :height='200'
        ) Messages
  //- Right Navbar
  div#rightNav.nav.nav-pills.nav-stacked
    CPOP-points
  div.container-fluid
    div.row
      div.col-xs-2
      div.col-xs-10
        div.canvasWrapper.text-center
          CPOP-canvas(
            :canvasNum='0' 
            :parentCanvasNum='null',
          )
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import CPOPNavbar from './CPOP-Navbar';
import CPOPMessage from './CPOP-Message';
import CPOPInstanceMaker from './CPOP-InstanceMaker';
import CPOPSolver from './CPOP-Solver';
import CPOPCanvas from './CPOP-Canvas';
import CPOPPoints from './CPOP-Points';
import NiceMessageOutput from '../nice-things/Nice-MessageOutput';

const { mapState, mapGetters } = createNamespacedHelpers('closestPairOfPoints');

export default {
  components: {
    CPOPNavbar,
    CPOPMessage,
    CPOPInstanceMaker,
    CPOPSolver,
    CPOPCanvas,
    CPOPPoints,
    NiceMessageOutput,
  },
  computed: {
    ...mapState([
      'valueRange',
      'points',
      'messages',
    ]),
    ...mapGetters([
      'editing',
    ]),
  },
};
</script>


<style scoped>
#leftNav, #rightNav {
  position: fixed;
  width: 15%;
  height: 90%;
  min-height: max-content;
  z-index: 1;
}
#rightNav {
  right: 0px;
}

div.canvasWrapper {
  max-width: 10000px;
  min-width: 100%;
  overflow-x: scroll;
  height: max-content;
  min-height: max-content;
}
</style>
