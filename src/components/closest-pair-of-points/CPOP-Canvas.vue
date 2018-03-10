<template lang="pug">
div
  hr
  div.canvas-wrapper(:style='{"min-height": 1.5 * canvasHeight + "px"}')
    canvas(
      ref='the-canvas' 
      :class='{highlightable: solving && !selected, selected: selected}'
      @click='selectMe'
    )
      CPOP-canvas-point(
        v-for='(point, index) in myPoints'
        :key='index'
        :index='index'
        :point='point'
        :canvasNum='canvasNum'
        :offset='problem.offset'
        @drawEvent='redrawFrame'
        )  
    div.children
      div.leftChild
        CPOP-canvas(
          v-if='leftChild'
          :canvasNum='getLeftChildCanvasNum(canvasNum)'
          :parentCanvasNum='canvasNum'
        )
      div.rightChild
        CPOP-canvas(
          v-if='rightChild'
          :canvasNum='getRightChildCanvasNum(canvasNum)'
          :parentCanvasNum='canvasNum'
        )
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NiceCanvas from '../nice-things/Nice-canvas';
import CPOPCanvasController from './CPOP-CanvasController';
import CPOPCanvasPoint from './CPOP-CanvasPoint';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('closestPairOfPoints');

export default {
  mixins: [NiceCanvas],
  name: 'CPOP-canvas',
  components: {
    CPOPCanvasController,
    CPOPCanvasPoint,
  },
  props: [
    'canvasNum',
    'parentCanvasNum',
  ],
  computed: {
    ...mapState([
      'points',
      'pointRadius',
      'valueRange',
      'solver',
      'problems',
    ]),
    ...mapGetters([
      'solving',
      'getLeftChildCanvasNum',
      'getRightChildCanvasNum',
    ]),
    canvasHeight() {
      return this.valueRange.max - this.valueRange.min;
    },
    canvasWidth() {
      if (this.canvasNum === 0) {
        // The root problem has the whole range as its width
        return this.valueRange.max - this.valueRange.min;
      }
      return this.problem.rightX - this.problem.leftX;
    },
    problem() {
      return this.problems[this.canvasNum];
    },
    myPoints() {
      const start = this.problem.firstPointIndex;
      const end = this.problem.lastPointIndex;
      return this.points.slice(start, end + 1);
    },
    selected() { return this.canvasNum === this.solver.canvasNum; },
    leftChild() {
      const childCanvasNum = this.getLeftChildCanvasNum(this.canvasNum);
      return this.problems[childCanvasNum] !== undefined;
    },
    rightChild() {
      const childCanvasNum = this.getRightChildCanvasNum(this.canvasNum);
      return this.problems[childCanvasNum] !== undefined;
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
      // eslint-disable-next-line
      const a = this.valueRange.max;
      this.provider.context.clearRect(0, 0, a, a);
      // all your children redraw themselves
      this.$children.forEach(child => {
        if (typeof child.draw === 'function') child.draw();
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.ctx = this.$refs['the-canvas'].getContext('2d');
      this.ctx.translate(-this.problem.leftX, this.canvasHeight);
      this.ctx.scale(1, -1);
      console.log(`translating by ${this.problem.leftX}`);
      this.redrawFrame();
    });
  },
};
</script>


<style scoped>
canvas {
  outline: 1px solid black;
}
canvas.highlightable:hover {
  cursor: pointer;
  background-color: lightgray;
}
canvas.selected {
  background-color: gray;
}
div.leftChild, div.rightChild {
  display: inline-block;
  vertical-align: top;
}
div.canvas-wrapper {
  overflow-x: visible;
  min-height: max-content;
}
</style>
