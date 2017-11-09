<template lang='pug'>
  div.row
    div.col-xs-1
      p(:style='{color: colors[i-1]}') {{isGender}}
        sub {{i}}
    div(
      @mouseup='dragStop'
      @mouseleave='dragStop'
      ).col-xs-11#boxContainer
      SM-preference-box(
        v-for='j in problemSize'
        :class='{unlocked: !locked}'
        :isGender='isGender' 
        :likesGender='likesGender'
        :i='i'
        :j='j'
        :key='j'
        :colors='colors'
        v-on:boxMouseDown='dragStart'
        v-on:boxMouseUp='dragStop'
        v-on:boxMouseEnter='dragCommence'
        v-on:boxMouseLeave=''
        )
</template>

<script>
  import SMPreferenceBox from './SMPreferenceBox';

  export default {
    components: {
      SMPreferenceBox,
    },
    // end components
    props: [
      'isGender',
      'likesGender',
      'i',
      'colors',
    ],
    // end props
    data() {
      return {
        dragging: false,
        boxToDrag: null,
      };
    },
    // end data
    computed: {
      locked() { return this.$store.state.locked; },
      problemSize() { return this.$store.state.problemSize; },
    },
    methods: {
      dragStart(j) {
        this.dragging = true;
        this.boxToDrag = j;
      },
      dragCommence(j) {
        if (this.dragging) {
          this.reorder(this.boxToDrag, j);
          this.boxToDrag = j;
        }
      },
      dragStop() {
        this.dragging = false;
        this.boxToDrag = null;
      },
      reorder(j1, j2) {
        this.$emit('reorderBoxes', this.isGender, this.i - 1, j1 - 1, j2 - 1);
      },
    },
  };
</script>

<style scoped>
  div.row {
    border-bottom: 1px solid black;
    -webkit-user-select: none;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  #boxContainer {
  }
  p {
    text-align-last: center;
    font-weight: bold;
    display: inline-block;
    background-color: white;
    width: 2em;
    height: 2em;
    padding: 3px;
    margin-top: 1em;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
  }
</style>