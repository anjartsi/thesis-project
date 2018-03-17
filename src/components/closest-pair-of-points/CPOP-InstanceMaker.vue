<template lang="pug">
div
  div.row
    h2 Instance Maker
  div.row
    p To add a point, type in a x-value, followed by a space, followed by a y-value
  div.row
    div.col-xs-6
      h4.verticalCenter(for='addPoint') Add Point: 
    div.col-xs-6
      input.form-control.text-center(
        type='text'
        name='addPoint'
        v-model.lazy='point'
        @keyup.enter='vueAddPoint(point)'
      )
  div.row
    div.col-xs-12
      label() x-coordinate 
      vue-slider(
        :min='valueRange.min'
        :max='valueRange.max'
        v-model='coordX'
        tooltipDir='right'
        :dotSize='30'
      )
    div.col-xs-12
      label() y-coordinate 
      vue-slider(
        :min='valueRange.min'
        :max='valueRange.max'
        v-model='coordY'
        tooltipDir='right'
        :dotSize='30'
      )
    nice-button.btn.btn-primary(@click='vueAddPoint(point)') Add Point
    br
  div.row
    nice-button.btn.btn-warning(@click='addRandomPoint') Add a Random Point
  div.row
    h3 Add Multiple Points
    div.row
      label How Many? 
      div.col-xs-10.offset-xs-2
        vue-slider(
          :min='this.problemSize.min'
          :max='this.problemSize.max - this.problemSize.current'
          v-model='howMany'
          :dotSize='30'
          tooltipDir='right'
        )
    div.row
      label Range (x) 
      div.col-xs-10.offset-xs-2
        vue-slider#xSlider(
          :min='valueRange.min'
          :max='valueRange.max'
          v-model='sliderX'
          :dotSize='30'
          :tooltipDir='["left", "right"]'
        )
    br      
    div.row
      label Range (y)
      div.col-xs-10.offset-xs-2
        vue-slider#ySlider(
          :min='valueRange.min'
          :max='valueRange.max'
          v-model='sliderY'
          :dotSize='30'
          :tooltipDir='["left", "right"]'
        )
    br
    nice-button.prevent.btn-primary(@click='addMultiplePoints' ) Add Multiple Points
    hr
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NiceButton from '../nice-things/Nice-Button';
import VueSlider from 'vue-slider-component';
import { randomNum } from '../../scripts/stuff';
const { mapState, mapActions } = createNamespacedHelpers('closestPairOfPoints');

export default {
  components: {
    NiceButton,
    VueSlider,
    VueSlider,
  },
  data() {
    return {
      point: '',
      howMany: 50,
      sliderX: [0, 500],
      sliderY: [0, 500],
    };
  },
  computed: {
    ...mapState([
      'points',
      'messages',
      'valueRange',
      'problemSize',
    ]),
    alertColor() {
      return 'alert-info';
    },
    coordX: {
      get() {
        return this.point.split(' ')[0] || 0;
      },
      set(newVal) {
        let str = '';
        str += newVal + ' ' + this.coordY;
        this.point = str;
      }
    },
    coordY: {
      get() {
        return this.point.split(' ')[1] || 0;
      },
      set(newVal) {
        let str = '';
        str += this.coordX + ' ' + newVal;
        this.point = str;
      }
    }
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
      const x = randomNum(this.valueRange.min, this.valueRange.max);
      const y = randomNum(this.valueRange.min, this.valueRange.max);
      this.point = `${x} ${y}`;
      this.addPoint({ point: { x, y } });
    },
    addMultiplePoints() {
      for (let i = 0; i < this.howMany; i++) {
        const [ xmin, xmax ] = this.sliderX;
        const [ ymin, ymax ] = this.sliderY;
        const x = randomNum(xmin, xmax);
        const y = randomNum(ymin, ymax);
        this.addPoint({ point: { x, y } });
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.points.length > 0) return;
      for (let i = 0; i < 50; i++) {
        this.addRandomPoint();
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
#xSlider, #ySlider {
  width: 100%;
}

</style>
