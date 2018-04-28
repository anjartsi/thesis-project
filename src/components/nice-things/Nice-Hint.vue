<template lang="pug">
  div.hint
    transition(name='fade' key='hint')
      div.alert.alert-success(v-if='show && hint && !hidden')
        //- button.pull-right(@click='hideMe')
        //-   i.fa.fa-times
        slot
</template>
<script>
export default {
  data() {
    return {
      hidden: false,
    };
  },
  props: [
    'namespace', 
    'show',
  ],
  computed: {
    hint() { 
      let a = this.$store.state[this.namespace].hints;
      this.hidden = !a;
      return a;
      }
  },
  methods: {
    hideMe() {
      this.hidden = true;
    },
  },
}
</script>

<style scoped>
.hint {
  position: absolute;
  opacity: 0.98;
}
</style>
