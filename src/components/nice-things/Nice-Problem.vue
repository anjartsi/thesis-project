<template lang="pug">
  div.problem
    transition(name='fade' key='pseudocode')
      div.alert.alert-info#pseudo(v-if='show')
        button.btn.pull-right(@click='closeAll')
          i.fa.fa-times
        h2 Problem
        div#slot
          slot
</template>
<script>
export default {
  props: [
    'namespace', 
  ],
  computed: {
    show() { return this.$store.state[this.namespace].showProblem;}
  },
  methods: {
    closeAll() {
      this.$store.dispatch(`${this.namespace}/unshowAll`);
    }
  },
}
</script>

<style scoped>
.problem {
  z-index: 10000;
  position: fixed;
  width: 1024px;
  top: 150px;
}
#slot {
  font-size: 20px;
}
</style>
