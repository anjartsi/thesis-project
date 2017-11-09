<template lang='pug'>
  div
    | [{{interval.start}} - {{interval.end}}]
</template>

<script>
import NiceButton from '../nice-things/NiceButton';

export default {
  components: {
    NiceButton,
  },
  props: [
    'index',
  ],
  computed: {
    interval() {
      return this.$store.getters.getInterval(this.index);
    },
  },
  methods: {
  },
};
</script>

<style scoped>
  
</style>