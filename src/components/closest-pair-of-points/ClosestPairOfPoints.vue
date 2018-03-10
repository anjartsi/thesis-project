<template lang="pug">
div#cpop
  CPOP-navbar
  div.container-fluid
    div.row
      div.col-xs-3
        div.nav.nav-pills.nav-stacked#leftNav
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
      div.col-xs-6.text-center
        CPOP-canvas(
          :canvasNum='0' 
          :parentCanvasNum='null',
        )
      div.col-xs-3#rightNav
        CPOP-points      
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
  width: 25%;
}
#rightNav {
  right: 0px;
}
</style>
