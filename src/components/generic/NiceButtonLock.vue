<template lang='pug'>
div
  nice-button.btn-warning(
    v-if='isLocked' 
    @click='$emit("click")'
  ) Unlock Instance 
    i.fa.fa-unlock
  nice-button.btn-warning(
    v-else
    @click='$emit("click")'
  ) Lock Instance 
    i.fa.fa-lock
</template>

<script>
import NiceButton from './NiceButton'
export default {

  name: 'NiceButtonLock',
  components: {
    NiceButton
  },
  props: [
    'isLocked'
  ],
  // end props
  data () {
    return {
    }
  }
  // end data
}
</script>

<style scoped>
</style>