<template lang="pug">
div
  h2 Canvas
  div.canvas-wrapper
    canvas(
      ref='the-canvas' 
      :class='{highlightable: solving && !selected, selected: selected}'
      @click='selectMe'
    )
    CPOP-canvas-point(
      v-for='(point, index) in points'
      :key='index'
      :index='index'
      @drawEvent='redrawFrame'
      )
    slot
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NiceCanvas from '../nice-things/Nice-canvas';
import CPOPCanvasController from './CPOP-CanvasController';
import CPOPCanvasPoint from './CPOP-CanvasPoint';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('closestPairOfPoints');

export default {
  mixins: [NiceCanvas],
  components: {
    CPOPCanvasController,
    CPOPCanvasPoint,
  },
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
    ...mapActions([
      'selectCanvas',
    ]),
    selectMe() {
      if (this.solving) this.selectCanvas({ canvasNum: this.canvasNum });
    },
    redrawFrame() {
      // erase the canvas
      this.provider.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      // all your children redraw themselves
      this.$children.forEach(canvasItem => {
        canvasItem.draw();
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.ctx = this.$refs['the-canvas'].getContext('2d');
      this.ctx.translate(0, this.canvasHeight);
      this.ctx.scale(1, -1);
      this.redrawFrame();
    });
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
