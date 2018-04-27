<template lang="pug">
  div.hint
    transition(name='fade' key='hint')
      div.alert.alert-success(v-if='show && hint')
        slot
</template>
<script>
export default {
  props: [
    'namespace', 
    'show',
  ],
  computed: {
    hint() { return this.$store.state[this.namespace].hints;}
  }
}
</script>

<style scoped>
.hint {
  position: absolute;
  opacity: 0.98;
}
</style>
