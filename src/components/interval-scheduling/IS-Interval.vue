<template lang='pug'>
  div.interval.clearfix(:style='style'  :class='{ highlight: latest, removed: removed }')
    //- p {{interval.start}} - {{interval.finish}}
    div.topRight(v-show='editing')
      i.fa.fa-window-close.fa-6(@click='remove')
    i.fa.fa-times.redEx(v-if='removed')
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
    editing() { return this.$store.getters.editing; },
    interval() { return this.$store.getters.getInterval(this.index); },
    removed() { return this.$store.getters.getRemoved(this.index); },
    latest() { return this.index === this.$store.state.latest; },
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
    bColor() {
      // if (this.removed) return '#424242';
      let index = this.interval.start;
      index %= this.colors.length - 2;
      return this.colors[index];
    },
    style() {
      return {
        'background-color': this.bColor,
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
.highlight {
  /* background-color: white!important; */
  border: 10px solid black;
}
.highlight p {
  background-color: black!important;
  color: white;
}

.removed {
  background-color: #424242!important;
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
i.fa.fa-window-close {
  font-size: 1.3em;
  color: white;
  background-color: black;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
}
i.fa:hover.fa-window-close {
  color: black;
  background-color: white;
}

i.redEx {
  display: block;
  width: 100%;
  font-size: 49px;
  opacity: 0.8;
  position: absolute;
  top:0px;
  color: red;
}

</style>