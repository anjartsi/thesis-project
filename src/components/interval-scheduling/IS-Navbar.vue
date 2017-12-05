<template lang="pug">
nice-second-nav(:saveId='saveId'  :loadId='loadId')
  div(slot='brand') Interval Scheduling
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
    };
  },
};
</script>

<style scoped>

</style>
