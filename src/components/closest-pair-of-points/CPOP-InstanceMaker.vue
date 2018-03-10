<template lang="pug">
div
  div.row
    h2 Instance Maker
  div.row
    p To add a point, type in a x-value, followed by a space, followed by a y-value
    p For Example to add the point (50, 100) type: 50 100 
  div.row
    div.col-xs-5
      h4(for='addPoint') Add Point: 
    div.col-xs-7
      input.form-control(
        type='text'
        name='addPoint'
        v-model='point'
        @keyup.enter='vueAddPoint(point)'
        )
    div.col-xs-12
      p x- and y- coordinates must be between 0 and 500 (inclusive)
    br
    nice-button.btn.btn-primary(@click='vueAddPoint(point)') Add Point
    nice-button.btn.btn-warning(@click='addRandomPoint') Add Random Point
  div.row
    div {{text}}
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NiceButton from '../nice-things/Nice-Button';
import { randomInt } from '../../scripts/stuff';

const { mapState, mapActions } = createNamespacedHelpers('closestPairOfPoints');

export default {
  components: {
    NiceButton,
  },
  data() {
    return {
      point: '',
    };
  },
  computed: {
    text() {

    },
    ...mapState([
      'points',
      'messages',
      'valueRange',
    ]),
    alertColor() {
      return 'alert-info';
    },
  },
  methods: {
    ...mapActions([
      'addPoint',
    ]),
    vueAddPoint(pointStr) {
      const x = pointStr.split(' ').map(Number)[0];
      const y = pointStr.split(' ').map(Number)[1];
      this.addPoint({ point: { x, y } });
    },
    addRandomPoint() {
      const x = randomInt(this.valueRange.min, this.valueRange.max);
      const y = randomInt(this.valueRange.min, this.valueRange.max);
      this.point = `${x} ${y}`;
      this.addPoint({ point: { x, y } });
    },
  },
  mounted() {
    this.$nextTick(() => {
      // todo - remove this before deploy
      if (this.points.length === 0) {
        for (let i = 0; i <= 5; i++) {
          let str = '';
          str += 50 * i;
          str += ' ';
          str += 50 * i;
          this.vueAddPoint(str);
        }
        for (let i = 2; i <= 5; i++) {
          let str = '';
          str += 100 * i;
          str += ' ';
          str += 100 * i;
          this.vueAddPoint(str);
        }
        // this.vueAddPoint('1 1');
        // this.vueAddPoint('150 150');
        // this.vueAddPoint('150 350');
        // this.vueAddPoint('210 210');
        // this.vueAddPoint('10 10');
        // this.vueAddPoint('350 250');
        // this.vueAddPoint('450 450');
        // this.vueAddPoint('410 410');
        // this.vueAddPoint('350 350');
        for (let i = 0; i < 10; i++) {
          this.addRandomPoint();
        }
      }
    });
  },
};
</script>

<style scoped>

div#addPointAlert {
  position: absolute;
  width: 100%;
  z-index: 1;
  opacity: 0.9;
}
</style>
