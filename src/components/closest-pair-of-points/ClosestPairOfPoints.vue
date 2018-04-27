<template lang="pug">
div#cpop
  CPOP-navbar
  div.container-fluid
    div.row
      div.col-xs-2#left.noselect
        div(v-if='editing')
          div.col-xs-12
            CPOP-instance-maker
          nice-message-output(
            namespace='closestPairOfPoints'
            :messages='messages.instanceMaker'
            :displayHistory='true'
            :height='200'
            v-if='false'
            ) Messages
        div(v-else)
          div.col-xs-12
            CPOP-solver
          nice-message-output(
            namespace='closestPairOfPoints'
            :messages='messages.solver'
            :displayHistory='true'
            :height='200'
            v-if='false'
            ) Messages
      div.col-xs-8#middle.noselect
        CPOP-canvas-container
      div.col-xs-2#right
        CPOP-points
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import CPOPNavbar from './CPOP-Navbar';
import CPOPInstanceMaker from './CPOP-InstanceMaker';
import CPOPSolver from './CPOP-Solver';
import CPOPCanvasContainer from './CPOP-CanvasContainer';
import CPOPPoints from './CPOP-Points';
import NiceMessageOutput from '../nice-things/Nice-MessageOutput';

const { mapState, mapGetters } = createNamespacedHelpers('closestPairOfPoints');

export default {
  components: {
    CPOPNavbar,
    CPOPInstanceMaker,
    CPOPSolver,
    CPOPCanvasContainer,
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
#cpop {
  height: 665;
  overflow-y: hidden;
}
#leftNav, #rightNav {
  background-color: #fff;
  position: fixed;
  width: 15%;
  height: 90%;
  min-height: max-content;
}
#rightNav {
  right: 0px;
}

#middle, #right {
  height: 630px;
  overflow-x: scroll;
}

.noselect {
  user-select: none;
}
</style>
