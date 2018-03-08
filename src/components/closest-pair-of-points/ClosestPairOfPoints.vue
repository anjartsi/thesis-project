<template lang="pug">
div#cpop
  CPOP-navbar
  div.container-fluid
    div.row
      div.col-xs-2
        CPOP-instance-maker(v-if='editing')
        CPOP-solver(v-else)
      div.col-xs-8.text-center
        CPOP-canvas(:canvasNum='0')
      div.col-xs-2
        CPOP-points      
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import CPOPNavbar from './CPOP-Navbar';
import CPOPMessage from './CPOP-Message';
import CPOPInstanceMaker from './CPOP-InstanceMaker';
import CPOPSolver from './CPOP-Solver';
import CPOPCanvas from './CPOP-Canvas2';
import CPOPPoints from './CPOP-Points';

const { mapState, mapGetters } = createNamespacedHelpers('closestPairOfPoints');

export default {
  components: {
    CPOPNavbar,
    CPOPMessage,
    CPOPInstanceMaker,
    CPOPSolver,
    CPOPCanvas,
    CPOPPoints,
  },
  computed: {
    ...mapState([
      'valueRange',
      'points',
    ]),
    ...mapGetters([
      'editing',
    ]),
  },
};
</script>


<style scoped>

</style>
