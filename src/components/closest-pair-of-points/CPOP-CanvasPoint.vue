<script>
import { createNamespacedHelpers } from 'vuex';
import NiceCanvasItem from '../nice-things/Nice-CanvasItem';

const { mapState } = createNamespacedHelpers('closestPairOfPoints');
export default {
  mixins: [NiceCanvasItem],
  props: [
    'index',
    'frameNum',
  ],
  computed: {
    ...mapState([
      'pointRadius',
      'points',
    ]),
    pointX() {
      return this.points[this.index].x;
    },
    pointY() {
      return this.points[this.index].y;
    },
    pointColor() {
      return this.points[this.index].color;
    },
  },
  methods: {
    draw() {
      const ctx = this.provider.context;
      let pointSize = 1;
      ctx.save();
      ctx.beginPath();
      if (this.pointColor) {
        ctx.fillStyle = this.pointColor;
        pointSize = this.pointColor === 'red' ? 3 : 1;
      }
      ctx.arc(this.pointX, this.pointY, pointSize * this.pointRadius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.restore();
    },
  },
  watch: {
    // When you need to redraw, emit a drawEvent
    // Then wait for the canvas to erase everything and update frameNum,
    // Then you can draw again
    points() {
      this.$emit('drawEvent');
    },
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
