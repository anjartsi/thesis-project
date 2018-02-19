<template lang='pug'>
div.preferenceBox(
  :class='{red: touched && editing}'
  @mousedown='$emit("boxMouseDown", j)'
  @mouseup='$emit("boxMouseUp", j)'
  @mouseenter='$emit("boxMouseEnter", j)'
  @mouseleave='$emit("boxMouseLeave", j)'
  
  @touchstart.prevent='daTouchStart'
  @touchend.prevent='daTouchEnd'
  @touchmove.prevent='daTouchMove'
)
  SM-person-box(
  :gender='likesGender'
  :index='preferenceBox'
  :rejected='hasRejected' 
  :tentative='isEngaged'
  )
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import SMPersonBox from './SM-PersonBox';

const { mapState, mapGetters } = createNamespacedHelpers('stableMarriage');

export default {
  components: { SMPersonBox },
  props: [
    'isGender',
    'likesGender',
    'i',
    'j',
    'colors',
  ],
  // end props
  data() {
    return {
      touched: false,
    };
  },
  // end data
  computed: {
    ...mapState([
      'rejections',
      'tentatives',
    ]),
    ...mapGetters([
      'editing',
    ]),
    preferenceBox() {
      const gender = this.isGender;
      const personIndex = this.i - 1;
      const preferenceIndex = this.j - 1;
      return this.$store.getters['stableMarriage/getPreference'](gender, personIndex, preferenceIndex);
    },
    myPreferenceList() {
      return this.$store.state.stableMarriage.preferences[this.isGender][this.i - 1];
    },
    man() {
      if (this.isGender === 'm') return this.i - 1;
      return this.myPreferenceList[this.j - 1];
    },
    woman() {
      if (this.isGender === 'w') return this.i - 1;
      return this.myPreferenceList[this.j - 1];
    },
    hasRejected() {
      if (this.rejections[this.man] === undefined) return false;
      return this.rejections[this.man][this.woman];
    },
    isEngaged() {
      const arr = this.tentatives.filter((value) =>
        value.man === this.man && value.woman === this.woman);
      if (arr.length > 0) {
        return true;
      }
      return false;
    },
  },
  methods: {
    daTouchStart() {
      if (this.editing) this.$emit('boxTouchStart', this.j);
    },
    daTouchMove() {
    },
    daTouchEnd() {
    },
  },
};
</script>

<style scoped>
  .unlocked {
    cursor: move;
  }
  div.preferenceBox {
    display: inline-block;
  }

  .red {
    background-color: #444;
  }
  .red * {
    opacity: 0.6
  }
</style>