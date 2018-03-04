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
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('closestPairOfPoints');

export default {
  computed: {
    ...mapState([
      'points',
      'pointRadius',
    ]),
  },
  data() {
    return {
      ctx: null,
      canvas_height: 500,
      canvas_width: 500,
    };
  },
  methods: {
    draw() {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, 500, 500);
      this.ctx.fillStyle = 'black';
      for (let i = 0; i < this.points.length; i++) {
        this.drawPoint(i);
      }
    },
    drawPoint(index) {
      const point = this.points[index];
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, this.pointRadius, 0, Math.PI * 2, true);
      this.ctx.fillStyle = 'black';
      this.ctx.fill();
      this.ctx.restore();
    },
  },
  mounted() {
    this.ctx = this.$refs.can.getContext('2d');
    this.ctx.translate(0, this.canvas_height);
    this.ctx.scale(1, -1);
    this.draw();
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
