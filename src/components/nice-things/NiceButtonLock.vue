<template lang='pug'>
div
  nice-button.btn-warning(
    v-if='isLocked' 
    @click='$emit("click")'
  ) Edit Problem Instance 
  nice-button.btn-success(
    v-else
    @click='$emit("click")'
  ) Solve Problem Instance  
</template>

<script>
import NiceButton from './NiceButton';

export default {
  name: 'NiceButtonLock',
  components: {
    NiceButton,
  },
  props: [
    'isLocked',
  ],
  // end props
  data() {
    return {
    };
  },
  // end data
};
</script>

<style scoped>
</style>