<template lang='pug'>
div.container-fluid
  div.row
    h2.pull-left The Problem Instance
  div.row
    div.col-xs-2
      div.row
      br
      div.row
        div
          //- Problem Size
          div.row
            div.col-xs-12
              problem-size-control
          transition(appear name='fade' key='SMinstanceMaker')
            div.row(v-show='locked')#buttonContainer
              div.col-xs-12
                nice-button(v-on:click.native='randomize') Randomize
              div.col-xs-12
                nice-button(v-on:click.native='reset') Reset
    //- Preference Lists
    div.col-xs-10
      h3(style="text-align:center") Preference Lists
      div.row
        div.col-xs-6
          h4(style="text-align:center") Men
          SM-preference-list(
            isGender='m'
            likesGender='w'
            :colors='colors'
            v-on:reorderBoxes='swap'
            )
        div.col-xs-6
          h4(style="text-align:center") Women
          SM-preference-list(
            isGender='w'
            likesGender='m'
            :colors='colors'
            v-on:reorderBoxes='swap'
          )
</template>

<script>
import stuff from '../../scripts/stuff';
import NiceButton from '../nice-things/Nice-Button';
import NiceButtonLock from '../nice-things/Nice-ButtonLock';
import ProblemSizeControl from '../nice-things/Nice-ProblemSizeControl';
import SMPreferenceList from './SM-PreferenceList';

export default {
  components: {
    NiceButton, NiceButtonLock, ProblemSizeControl, SMPreferenceList,
  },
  // end components
  props: [
    'colors',
  ],
  // end props
  data() {
    return {
    };
  },
  // end data
  computed: {
    locked() { return this.$store.getters.editing; },
    problemSize() { return this.$store.state.problemSize; },
    min() { return this.$store.state.min; },
    max() { return this.$store.state.max; },
    preferences() { return this.$store.state.preferences; },
  },
  watch: {
    problemSize(newValue) {
      this.n = newValue;
    },
    locked(newValue) {
      this.isLocked = newValue;
    },
  },
  // end computed
  methods: {
    changeProblemSize(n) {
      this.$store.dispatch('updateProblemSize', { n });
    },
    // end checkPreferenceRow()
    swap(gender, person, pref1, pref2) {
      // eslint-disable-next-line
      let payload = { gender, person, pref1, pref2 };
      this.$store.dispatch('swap', payload);
    },
    // end swap
    randomize() {
      let gender;
      let person;
      let a;
      let b;
      const min = 0;
      const max = this.problemSize - 1;
      for (let i = 0; i < this.problemSize * this.problemSize; i++) {
        // eslint-disable-next-line
        Math.random() >= 0.5 ? gender = 'm' : gender = 'w';
        person = stuff.randomInt(min, max);
        a = stuff.randomInt(min, max);
        b = stuff.randomInt(min, max);
        // Leave Man 1 alone, this causes no loss of generality
        if (!(gender === 'm' && person === 0)) {
          this.swap(gender, person, a, b);
        }
      }
    },
    // end randomize()
    reset() {
      const num = this.problemSize;
      this.changeProblemSize(1);
      this.changeProblemSize(num);
    },
    // End reset()
    lock() {
      this.$store.commit('lockUnlock');
    },
  },
  // end methods
  created() {
    this.changeProblemSize(4);
  },
};
</script>

<style scoped>
#buttonContainer div {
  margin-top: 2em;
}
</style>
