<template lang="pug">
div
  div.row
    h2 Instance Maker
  div.row
  //- div.row
  //-   div.col-xs-6
  //-     h4.verticalCenter(for='addPoint') Add Point: 
  //-   div.col-xs-6
  //-     input.form-control.text-center(
  //-       type='text'
  //-       name='addPoint'
  //-       v-model.lazy='point'
  //-       @keyup.enter='vueAddPoint(point)'
  //-     )
  //- div.row
  //-   div.col-xs-12
  //-     label() x-coordinate 
  //-     vue-slider(
  //-       :min='valueRange.min'
  //-       :max='valueRange.max'
  //-       v-model='coordX'
  //-       tooltipDir='right'
  //-       :dotSize='30'
  //-     )
  //-   div.col-xs-12
  //-     label() y-coordinate 
  //-     vue-slider(
  //-       :min='valueRange.min'
  //-       :max='valueRange.max'
  //-       v-model='coordY'
  //-       tooltipDir='right'
  //-       :dotSize='30'
  //-     )
  //-   nice-button.btn.btn-primary(@click='vueAddPoint(point)') Add Point
  //-   br
  div.row
    h4 Random Points
    div.row
      label Range (x) 
      vue-slider#xSlider(
        :min='valueRange.min'
        :max='valueRange.max'
        v-model='sliderX'
        :dotSize='30'
        :tooltipDir='["bottom", "right"]'
        @input='updateRange'
      )
    br      
    div.row
      label Range (y)
      vue-slider#ySlider(
        :min='valueRange.min'
        :max='valueRange.max'
        v-model='sliderY'
        :dotSize='30'
        :tooltipDir='["bottom", "right"]'
        @input='updateRange'
      )
    br
    nice-button.btn.btn-warning(@click='addRandomPoint') Add One
      br
      |Random Point
    nice-button.prevent.btn-primary(@click='addMultiplePoints' ) Add Multiple 
      br
      | Points
    div.row
      label How Many? 
      vue-slider(
        :min='this.problemSize.min'
        :max='this.problemSize.max - this.problemSize.current'
        v-model='howMany'
        :dotSize='30'
        tooltipDir='right'
      )
    nice-hint(namespace='closestPairOfPoints'  :show='editing').hint#hint1
      h4 To Add Random Points
      p Use the buttons to add either One or Multiple points
      p Use the sliders to select the narrow down the area where points can get added
    nice-hint(namespace='closestPairOfPoints'  :show='editing').hint#hint2
      h4 To Add Specific Points
      p Click or Tap on the image on below
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NiceButton from '../nice-things/Nice-Button';
import NiceHint from '../nice-things/Nice-Hint';
import VueSlider from 'vue-slider-component';
import { randomNum } from '../../scripts/stuff';
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('closestPairOfPoints');

export default {
  components: {
    NiceButton,
    VueSlider,
    VueSlider,
    NiceHint,
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
    ...mapGetters([
      'editing',
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
      'updateRandomRange'
    ]),
    vueAddPoint(pointStr) {
      const x = pointStr.split(' ').map(Number)[0];
      const y = pointStr.split(' ').map(Number)[1];
      this.addPoint({ point: { x, y } });
    },
    addRandomPoint() {
      const [ xmin, xmax ] = this.sliderX;
      const [ ymin, ymax ] = this.sliderY;
      const x = randomNum(xmin, xmax);
      const y = randomNum(ymin, ymax);
      this.point = `${x} ${y}`;
      this.addPoint({ point: { x, y } });
    },
    addMultiplePoints() {
      let count = this.howMany;
      let newNumberOfPoints = this.problemSize.current + count;
      this.howMany = Math.min(this.howMany, this.problemSize.max - newNumberOfPoints);
      for (let i = 0; i < count; i++) {
        const [ xmin, xmax ] = this.sliderX;
        const [ ymin, ymax ] = this.sliderY;
        const x = randomNum(xmin, xmax);
        const y = randomNum(ymin, ymax);
        this.addPoint({ point: { x, y } });
      }
    },
    updateRange() {
      this.updateRandomRange({
        x1: this.sliderX[0],
        y1: this.sliderY[0],
        x2: this.sliderX[1],
        y2: this.sliderY[1]
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.points.length > 0) return;
      for (let i = 0; i < 25; i++) {
        this.addRandomPoint();
      }
      this.point = '250 250';
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

label {
  width: 100%;
  text-align: center;
}

.hint {
  width: 200%;
  z-index: 100;
}
.hint h4 {
  text-align: center;
}
#hint2 {
  top: 60px;
  left: 250%;
}
#hint1 {
  width: 400%;
}
#hint1 ul li{
  margin-left: -25px;
  list-style-type: none;
}
</style>
