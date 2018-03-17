<template lang="pug">
nice-second-nav(:saveId='saveId'  :loadId='loadId'  :namespace='namespace')
  div(slot='brand') Closest Pair of Points
  div(slot='modal')
    //- TODO - Save/Load for Closest Pair of Points
    CPOP-save-load(:saveId='saveId' :loadId='loadId')
</template>

<script>
import NiceSecondNav from '../nice-things/Nice-SecondNav';
import CPOPSaveLoad from './CPOP-SaveLoad'

export default {
  components: {
    NiceSecondNav,
    CPOPSaveLoad,
  },
  data() {
    return {
      saveId: 'savemodal',
      loadId: 'loadmodal',
      namespace: 'closestPairOfPoints',
    };
  },
};
</script>

<style scoped>

</style>
