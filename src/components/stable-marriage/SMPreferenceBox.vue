<template lang='pug'>
div.preferenceBox(
  @mousedown='$emit("boxMouseDown", j)'
  @mouseup='$emit("boxMouseUp", j)'
  @mouseenter='$emit("boxMouseEnter", j)'
  @mouseleave='$emit("boxMouseLeave", j)'
)
  SM-person-box(
  :gender='likesGender'
  :index='preferenceBox'
  :rejected='hasRejected' 
  :tentative='isEngaged'
  )
</template>

<script>
import SMPersonBox from './SMPersonBox';

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
    };
  },
  // end data
  computed: {
    preferenceBox() {
      const gender = this.isGender;
      const personIndex = this.i - 1;
      const preferenceIndex = this.j - 1;
      return this.$store.getters.getPreference(gender, personIndex, preferenceIndex);
    },
    rejections() {
      return this.$store.state.rejections;
    },
    tentatives() {
      return this.$store.state.tentatives;
    },
    man() {
      if (this.isGender === 'm') return this.i - 1;
      return this.j - 1;
    },
    woman() {
      if (this.isGender === 'w') return this.i - 1;
      return this.j - 1;
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
</style>