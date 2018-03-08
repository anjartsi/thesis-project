<script>
import { createNamespacedHelpers } from 'vuex';
import NiceCanvasItem from '../nice-things/Nice-CanvasItem';

const { mapState } = createNamespacedHelpers('closestPairOfPoints');
export default {
  mixins: [NiceCanvasItem],
  props: [
    'canvasHeight',
    'canvasWidth',
  ],
  computed: {
    ...mapState([
      'points',
    ]),

  },
  methods: {
    draw() {
      // rotate the canvas so that (0, 0) is on the bottom-right
      const ctx = this.provider.context;
      ctx.save();
      ctx.translate(0, this.canvasHeight);
      ctx.scale(1, -1);
    },
    clearCanvas() {
      // clear the entire canvas so that things can be redrawn
      const ctx = this.provider.context;
      ctx.clearRect(0, 0, this.canvasHeight, this.canvasWidth);
    },
  },
  watch: {
    points() {
      // this.clearCanvas();
    },
  },
};
</script>
