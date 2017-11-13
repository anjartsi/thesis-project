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