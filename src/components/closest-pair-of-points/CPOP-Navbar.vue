<template lang="pug">
nice-second-nav(:saveId='saveId'  :loadId='loadId'  :namespace='namespace')
  div(slot='brand') Closest Pair of Points
  div(slot='modal')
    //- TODO - Save/Load for Closest Pair of Points
    //- CPOP-save-load(:saveId='saveId' :loadId='loadId')
</template>

<script>
import NiceSecondNav from '../nice-things/Nice-SecondNav';

export default {
  components: {
    NiceSecondNav,
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
