<template lang='pug'>
div
  nice-second-nav(:saveId='saveId'  :loadId='loadId'  :namespace='namespace')
    div(slot='brand') Stable Marriage
    div(slot='modal')
      SM-save-load(:saveId='saveId'  :loadId='loadId')
</template>

<script>
import NiceSecondNav from '../nice-things/Nice-SecondNav';
import SMSaveLoad from './SM-SaveLoad';

export default {
  data() {
    return {
      // The saveId and laodId are passed to the second navBar and sm save load
      // the menu buttons to their respectival modals
      saveId: 'saveModal',
      loadId: 'loadModal',
      namespace: 'stableMarriage',
    };
  },
  components: {
    NiceSecondNav, SMSaveLoad,
  },
};
</script>

<style scoped>
</style>