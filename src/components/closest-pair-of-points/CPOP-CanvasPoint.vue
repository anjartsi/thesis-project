<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('closestPairOfPoints');
export default {
  abstract: true,
  props: [
    'ctx',
    'point',
  ],
  computed: {
    ...mapState([
      'pointRadius',
    ]),
  },
  methods: {
    drawPoint() {
      console.log('drawing!');
      this.ctx.beginPath();
      this.ctx.moveTo(this.point.x, this.point.y);
      this.ctx.arc(this.point.x, this.point.y, this.pointRadius, 0, Math.PI * 2, true);
      this.ctx.fill();
    },
  },
  render() {
    if (!this.ctx) return;
    this.drawPoint();
  },
};
</script>
