<template lang="pug">
  div
    div.row
    h2 Canvas
    div.row
      canvas(
        ref='can'
        :width='canvasHeight'
        :height='canvasWidth'
        :class='{highlightable: solving && !selected, selected: selected}'
        @click='selectMe'
      )
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('closestPairOfPoints');

export default {
  props: [
    'canvasNum',
  ],
  computed: {
    ...mapState([
      'points',
      'pointRadius',
      'refresh',
      'valueRange',
      'solver',
    ]),
    ...mapGetters([
      'solving',
    ]),
    canvasHeight() { return this.valueRange.max; },
    canvasWidth() { return this.valueRange.max; },
    selected() {
      return this.canvasNum === this.solver.canvasNum;
    },
  },
  data() {
    return {
      ctx: null,
    };
  },
  methods: {
    draw() {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, this.canvasHeight, this.canvasWidth);
      this.ctx.fillStyle = 'black';
      for (let i = 0; i < this.points.length; i++) {
        this.drawPoint(i);
      }
    },
    drawPoint(index) {
      const point = this.points[index];
      let times = 1;
      this.ctx.save();
      this.ctx.beginPath();
      if (point.color) this.ctx.fillStyle = point.color;
      if (point.color === 'red') times = 2;
      this.ctx.arc(point.x, point.y, times * this.pointRadius, 0, Math.PI * 2, true);
      this.ctx.fill();
      this.ctx.restore();
    },
    ...mapActions([
      'selectCanvas',
    ]),
    selectMe() {
      if (this.solving) this.selectCanvas({ canvasNum: this.canvasNum });
    },
  },
  mounted() {
    this.ctx = this.$refs.can.getContext('2d');
    this.ctx.translate(0, this.canvasHeight);
    this.ctx.scale(1, -1);
    this.draw();
  },
  watch: {
    refresh() {
      this.draw();
    },
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
canvas.highlightable:hover {
  cursor: pointer;
  outline: 4px solid yellow;
}
canvas.selected {
  outline: 4px solid blue;
}
</style>
