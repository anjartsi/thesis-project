<template lang="pug">
div#cpop
  CPOP-navbar
  div.container-fluid
    div.row
      div.col-xs-4
        CPOP-instance-maker()
      div.col-xs-4
        CPOP-canvas
      div.col-xs-4
        CPOP-points
</template>

<script>
import CPOPNavbar from './CPOP-Navbar';
import CPOPInstanceMaker from './CPOP-InstanceMaker';
import CPOPCanvas from './CPOP-Canvas';
import CPOPPoints from './CPOP-Points';

export default {
  components: {
    CPOPNavbar,
    CPOPInstanceMaker,
    CPOPCanvas,
    CPOPPoints,
  },
};
</script>


<style scoped>

</style>
