<template lang="pug">
div#cpop
  CPOP-navbar
  div.container-fluid
    div.row
      div.col-xs-3
        div.col-xs-12
          CPOP-instance-maker()
        div.col-xs-12
          CPOP-points
      div.col-xs-9
        CPOP-canvas
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
