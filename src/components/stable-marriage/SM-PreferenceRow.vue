<template lang='pug'>
transition(name='fade' key='SMPreferenceRow')
  div.row(:class='{highlight}')
    div.rowOwner
      SM-person-box(
        :gender='isGender'
        :index='i-1'
      )
    div.rowPreferences(
      @mouseup='dragStop'
      @mouseleave='dragStop'
      ).boxContainer
      SM-preference-box(
        v-for='j in problemSize'
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
        v-on:boxTouchStart='touchAction'
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
        touch1: null,
        touch2: null,
        boxToDrag: null,
      };
    },
    // end data
    computed: {
      editing() { return this.$store.getters.editing; },
      problemSize() { return this.$store.state.problemSize; },
      unit() { return this.$store.state.unit; },
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
        if (this.dragging) {
          this.dragging = false;
          this.boxToDrag = null;
        }
      },
      touchAction(j) {
        if (this.touch1 === null) {
          this.touch1 = j;
          this.$children[j].touched = true;
        } else {
          this.touch2 = j;
          this.reorder(this.touch1, this.touch2);
          this.$children[this.touch1].touched = false;
          this.touch1 = null;
          this.touch2 = null;
        }
      },
      reorder(j1, j2) {
        const payload = {
          gender: this.isGender,
          person: this.i - 1,
          pref1: j1 - 1,
          pref2: j2 - 1,
        };
        this.$store.dispatch('swap', payload);
        // this.$emit('reorderBoxes', this.isGender, this.i - 1, j1 - 1, j2 - 1);
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
      editing(newVal) {
        if (!newVal && this.touch1 !== null) {
          this.$children[this.touch1].touched = false;
          this.touch1 = null;
        }
      },
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

  div.rowOwner {
    display: inline-block;
  }
  div.rowPreferences {
    display: inline-block;
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