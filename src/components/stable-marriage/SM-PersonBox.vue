<template lang='pug'>
transition(appear)
  div(
    :class='isGender'
    :style='boxStyle'
  )
    //- If the rejected flag is on, put a big red X on the box
    div.redExCont(v-if='rejected')
      i.fa.fa-times.redEx
    p(v-if='!tentative') {{ isGender }}
      sub {{index + 1}}
    p(v-else).matched
      i.fa.fa-diamond
</template>

<script>
  import stuff from '../../scripts/stuff.js';

  export default {
    props: [
      'gender', 'index', 'rejected', 'tentative',
    ],
    // end props
    data() {
      return {
        colors: stuff.colors,
      };
    },
    // end data
    computed: {
      likesGender() {
        if (this.gender === 'm') {
          return 'w';
        }
        return 'm';
      },
      // end likesGender
      isGender() {
        if (
          this.gender === '' ||
          this.gender === 'm' ||
          this.gender === 'man' ||
          this.gender === 'male'
        ) {
          return 'm';
        }
        return 'w';
      }, // end gender
      boxStyle() {
        return {
          'background-color': this.colors[this.index],
          height: `${this.unit}px`,
          width: `${this.unit}px`,
        };
      },
      unit() { return this.$store.state.stableMarriage.unit; },
    }, // end computed
    watch: {
      index() {
        // eslint-disable-next-line
        this.animate({
          timing: stuff.timingLinear,
          draw: this.draw,
          duration: 500,
        });
      },
    }, // end watch
    methods: {
      animate: stuff.animate,
      draw(progress) {
        // eslint-disable-next-line
        this.$el.style['transform'] = `rotate(${360 * progress}deg)`;
        if (progress === 1) {
          // do something?
        }
      },
    }, // end methods
  };
</script>

<style scoped>
  
  div {
    display: inline-block;
    text-align: center;
    border: 1px solid black;
    margin-left: 2px
  }
  
  div > p {
    font-weight: bold;
    display: inline-block;
    background-color: white;
    width: 30px;
    height: 30px;
    padding: 3px;
    margin-top: 10px;
    border-radius: 50px;
  }
  div.m {
  }
  div.w {
    border-radius: 100%;
  }
  div.redExCont {
    position: absolute;
    border: none;
    margin-left: -10px;
    opacity: 0.75;
  }
  i.redEx {
    display: block;
    width: 50px;
    font-size: 50px;
    color: red;
  }

  .matched {
    background-color: black;
  }
  .matched i {
    color: white;
    border-radius: 10px;
  }

  .v-enter-active, .v-leave-active {
    transition-property: all;
    transition-duration: 125ms;
    transition-timing-function: ease;
    transition-delay: 0ms;
  }
  .v-enter {
    opacity: 0;
    transform: translateY(-50%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateY(50%);
  }
</style>