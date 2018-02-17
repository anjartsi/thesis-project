<template lang="pug">
  div
    div.row
    h2 Canvas
    div.row
      canvas(
      ref='can'
      width='500'
      height='500'
    )
</template>

<script>
import Vuex from 'vuex';

export default {
  computed: {
    ...Vuex.mapState({
      points: 'points',
      r: 'pointRadius',
    }),
  },
  data() {
    return {
      // ctx: this.$refs.can.getContext('2d'),
    };
  },
  methods: {
    draw() {
      const ctx = this.$refs.can.getContext('2d');
      const { r } = this;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 500, 500);
      ctx.fillStyle = 'black';
      for (let i = 0; i < this.points.length; i++) {
        const point = this.points[i];
        ctx.fillRect(point.x - r / 2, point.y - r / 2, r, r);
      }
    },
  },
  watch: {
    points() {
      this.draw();
    },
  },
};
</script>


<style scoped>
canvas {
  border: 1px solid black;
}
</style>
