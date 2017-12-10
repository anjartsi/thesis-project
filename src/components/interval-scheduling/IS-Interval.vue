<template lang='pug'>
div.interval.clearfix(
  :style='{"background-color": colors[colorIndex]}'
  )
  button.btn.pull-left ...
  p {{interval.start}} - {{interval.finish}}
  button.btn.btn-danger.pull-right(@click='remove') &times;
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
      colorIndex: this.index,
      colors: stuff.colors,
    };
  },
  computed: {
    interval() {
      return this.$store.getters.getInterval(this.index);
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
  width: 150px;
  text-align: center;
  border: 1px solid black;
  border-radius: 6px;
}
.interval * {
  display: inline-block;
}
.interval p {
  background-color: #fff;
  border-radius: 7px;
  padding: 2px;
  margin-top: 7px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 0px;
}
</style>