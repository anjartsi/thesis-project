<script>
import { createNamespacedHelpers } from 'vuex';
import NiceCanvasItem from '../nice-things/Nice-CanvasItem';

const { mapState } = createNamespacedHelpers('closestPairOfPoints');
export default {
  mixins: [NiceCanvasItem],
  props: [
    'index',
    'point',
    'canvasNum',
  ],
  computed: {
    ...mapState([
      'pointRadius',
      'colors',
    ]),
    ...mapState({
      pointColor(state) { return state.problemTree[this.canvasNum].colors[this.index]; },
    }),
    pointX() { return this.point.x; },
    pointY() { return this.point.y; },
  },
  methods: {
    draw() {
      const ctx = this.provider.context;
      let pointSize = 1;
      ctx.save();
      ctx.beginPath();
      if (this.pointColor) {
        ctx.fillStyle = this.pointColor;
        switch (this.pointColor) {
          case this.colors.highlight:
            pointSize = 1.75;
            break;
          case this.colors.checking_i:
            pointSize = 2;
            break;
          case this.colors.checked_j:
            pointSize = 1.5;
            break;
          case this.colors.checked_done:
            pointSize = 1;
            break;
          case this.colors.closest:
            pointSize = 2.5;
            break;
          case this.colors.strip:
            pointSize = 2;
            break;
          default:
            pointSize = 1;
            break;
        }
      }
      ctx.arc(this.pointX, this.pointY, pointSize * this.pointRadius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    },
  },
  watch: {
    // When you need to redraw, emit a drawEvent
    // Then wait for the canvas to erase everything and update frameNum,
    // Then you can draw again
    pointX() {
      this.$emit('drawEvent');
    },
    pointY() {
      this.$emit('drawEvent');
    },
    pointColor() {
      this.$emit('drawEvent');
    },
  },
};
</script>
