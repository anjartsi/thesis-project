<template lang='pug'>
div.interval.clearfix(
  :style='style'
  )
  p {{interval.start}} - {{interval.finish}}
  div.topRight
    i.fa.fa-window-close.fa-6(@click='remove')
</template>

<script>
import NiceButton from '../nice-things/Nice-Button';
import stuff from '../../scripts/stuff';

export default {
  components: {
    NiceButton,
  },
  props: [
    'index',
  ],
  data() {
    return {
      // colorIndex does not get updated, so the interval's color
      // won't change if other intervals get added/removed
      colorIndex: this.index,
      colors: stuff.colors,
      unit: 60,
    };
  },
  computed: {
    interval() {
      return this.$store.getters.getInterval(this.index);
    },
    left() {
      let num = this.interval.start * this.unit;
      num += 'px';
      return num;
    },
    width() {
      let num = this.interval.finish - this.interval.start;
      num *= this.unit;
      num += 'px';
      return num;
    },
    style() {
      return {
        'background-color': this.colors[this.colorIndex % this.colors.length],
        left: this.left,
        width: this.width,
      };
    },
  },
  methods: {
    remove() {
      this.$store.dispatch('removeInterval', { index: this.index });
    },
  },
};
</script>

<style scoped>
.interval {
  height: 50px;
  position: absolute;
  text-align: center;
  border: 1px solid black;
  border-radius: 6px;
}
div.values {
  position: relative;
  bottom: 0px;
  height: 100%;
}
p {
  position: relative;
  top: 20px;
  width: 50px;
  margin: auto;
  background-color: #fff;
  border-radius: 7px;
  padding: 3px;
}

div.topRight {
  position: absolute;
  top: 0px;
  right: 0px;
}
i.fa {
  font-size: 1.3em;
  color: white;
  background-color: black;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
}
i.fa:hover {
  color: black;
  background-color: white;
}
</style>