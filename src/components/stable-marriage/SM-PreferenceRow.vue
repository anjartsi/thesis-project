<template lang='pug'>
transition(name='fade' key='SMPreferenceRow')
  div.row(:class='{highlight}')
    div.col-xs-1.border-right
      SM-person-box(
        :gender='isGender'
        :index='i-1'
      )
    div.col-xs-10(
      @mouseup='dragStop'
      @mouseleave='dragStop'
      ).boxContainer
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
  import stuff from '../../scripts/stuff';
  import SMPersonBox from './SM-PersonBox';
  import SMPreferenceBox from './SM-PreferenceBox';

  export default {
    components: {
      SMPreferenceBox, SMPersonBox,
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
      highlight() {
        if (this.isGender === 'm') {
          return this.$store.state.proposal.man === this.i - 1;
        }
        return this.$store.state.proposal.woman === this.i - 1;
      },
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
      darken(progress) {
        const num = Math.floor((1 - progress) * 255);
        if (progress < 1) {
          this.$el.style['background-color'] = `rgb(${num},${num},${0})`;
        } else {
          this.$el.style['background-color'] = '';
        }
      },
      lighten(progress) {
        const num = Math.floor((progress) * 255);
        if (progress < 1) {
          this.$el.style['background-color'] = `rgb(${num},${num},${0})`;
        } else {
          // Remove this style after when finished
          this.$el.style['background-color'] = '';
        }
      },
    }, // end methods
    watch: {
      highlight(newVal) {
        const todo = (newVal) ? this.darken : this.lighten;
        stuff.animate({
          duration: 200,
          draw: todo,
        });
      },
    }, // end watch
  };
</script>

<style scoped>
  .border-right {
    padding: 0px 0px 0px 0px;
  }

  div.row {
    border-bottom: 1px solid black;
    -webkit-user-select: none;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  .boxContainer {
    margin-left: 5px;
    border-left: 2px solid black;
  }
  .highlight {
    background-color: black;
  }
  .highlight .boxContainer {
    border-left: 2px solid white;
  }
</style>