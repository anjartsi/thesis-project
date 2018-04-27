<template lang="pug">
  div
    transition(name='fade' key='pseudocode')
      div.alert.alert-warning#pseudo(v-if='show')
        button.btn.pull-right 
          i.fa.fa-times(@click='closeAll')
        h2 Pseudo Code
        div#slot
          slot#slot
</template>
<script>
export default {
  props: [
    'namespace', 
  ],
  computed: {
    show() { return this.$store.state[this.namespace].pseudocode;}
  }, 
  methods: {
    closeAll() {
      this.$store.dispatch(`${this.namespace}/unshowAll`);
    }
  }
}
</script>

<style scoped>
#pseudo {
  z-index: 1000;
  position: fixed;
  width: 1024px;
  top: 150px;
}
#slot {
  font-size: 20px;
}
</style>
