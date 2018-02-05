<template lang='pug'>
  div.interval.clearfix(:style='style')
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
    'index', 'unit',
  ],
  data() {
    return {
      colors: stuff.colors,
    };
  },
  computed: {
    fontSize() {
      if (this.interval.finish - this.interval.start > 1) return '13px';
      return '11px';
    },
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
    colorIndex() {
      let index = this.interval.finish + this.interval.start;
      index %= this.colors.length - 1;
      return index;
    },
    style() {
      return {
        'background-color': this.colors[this.colorIndex],
        left: this.left,
        width: this.width,
        // 'font-size': this.fontSize,
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
  max-width: 60px;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  padding: 3px;
  border: 1px solid black;
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