<template lang="pug">
div
  div.row
    h2 Instance Maker
  div.row
    input(type='text' v-model='point')
    button.btn.btn-primary(@click='addPoint') Click Me
</template>

<script>
export default {
  data() {
    return {
      point: '',
    };
  },
  methods: {
    addPoint() {
      const x = this.point.split(' ').map(Number)[0];
      const y = this.point.split(' ').map(Number)[1];
      this.$store.dispatch('addPoint', { point: { x, y } });
    },
  },
};
</script>

<style scoped>

</style>
