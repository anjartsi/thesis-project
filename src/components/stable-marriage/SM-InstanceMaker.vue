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
              problem-size-control(:namespace='namespace')
          transition(appear name='fade' key='SMinstanceMaker')
            div.row(v-show='locked')#buttonContainer
              div.col-xs-12
                nice-button.btn-warning(v-on:click.native='randomize') Randomize
              div.col-xs-12
                nice-button.btn-danger(v-on:click.native='reset') Reset
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
import { createNamespacedHelpers } from 'vuex';
import stuff from '../../scripts/stuff';
import NiceButton from '../nice-things/Nice-Button';
import NiceButtonLock from '../nice-things/Nice-ButtonLock';
import ProblemSizeControl from '../nice-things/Nice-ProblemSizeControl';
import SMPreferenceList from './SM-PreferenceList';

const { mapState, mapGetters } = createNamespacedHelpers('stableMarriage');

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
      namespace: 'stableMarriage',
    };
  },
  // end data
  computed: {
    ...mapState([
      'problemSize',
      'min',
      'max',
      'preferences',
    ]),
    ...mapGetters({
      locked: 'editing',
    }),
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
      this.$store.dispatch('stableMarriage/updateProblemSize', { n });
    },
    // end checkPreferenceRow()
    swap(gender, person, pref1, pref2) {
      // eslint-disable-next-line
      let payload = { gender, person, pref1, pref2 };
      this.$store.dispatch('stableMarriage/swap', payload);
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
      this.$store.dispatch('stableMarriage/switchMode');
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
