<template lang='pug'>
div(
  :class='isGender'
  :style='{"background-color": colors[index]}'
)
  p(v-if='!tentative') {{ isGender }}
    sub {{index + 1}}
  p(v-else).matched
    i.fa.fa-diamond
  //- If the rejected flag is on, put a big red X on the box
  i.fa.fa-times.rejected(v-if='rejected')
</template>

<script>
  import stuff from '../../stuff.js';

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
    }, // end computed
    watch: {
      index() {
        // eslint-disable-next-line
        this.animate({
          timing: stuff.timingLinear,
          draw: this.draw,
          duration: 150,
        });
      },
    }, // end watch
    methods: {
      animate: stuff.animate,
      draw(progress) {
        const len = this.colors.length;
        // eslint-disable-next-line
        this.$el.style['background-color'] = this.colors[len - 1];
        if (progress === 1) {
          this.$el.style['background-color'] = this.colors[this.index];
        }
      },
    }, // end methods
  };
</script>

<style scoped>
  
  div {
    display: inline-block;
    text-align: center;
    width: 50px;
    height: 50px;
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
    border-radius: 18px;
  }
  i.rejected {
    display: block;
    width: 49px;
    font-size: 49px;
    opacity: 0.8;
    position: absolute;
    top:0px;
    color: red;
  }

  .matched {
    background-color: black;
  }
  .matched i {
    color: white;
    border-radius: 10px;
  }
</style>