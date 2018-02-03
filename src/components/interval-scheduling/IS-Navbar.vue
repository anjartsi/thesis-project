<template lang="pug">
nice-second-nav(:saveId='saveId'  :loadId='loadId')
  div(slot='brand') Interval Scheduling
  div(slot='modal')
    IS-save-load(:saveId='saveId' :loadId='loadId')
</template>

<script>
import NiceSecondNav from '../nice-things/Nice-SecondNav';
import ISSaveLoad from './IS-SaveLoad';

export default {
  components: {
    NiceSecondNav, ISSaveLoad,
  },
  data() {
    return {
      saveId: 'savemodal',
      loadId: 'loadmodal',
    };
  },
};
</script>

<style scoped>

</style>
