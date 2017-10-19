<template lang='pug'>
  div.personBox(
  :style='{"background-color": colors[preferenceBox]}'
  :class='[isGender]'
  @mousedown='$emit("boxMouseDown", j)'
  @mouseup='$emit("boxMouseUp", j)'
  @mouseenter='$emit("boxMouseEnter", j)'
  @mouseleave='$emit("boxMouseLeave", j)'
  ) 
    p {{likesGender}}
      sub {{ this.preferenceBox + 1}}
</template>

<script>
  export default {
    props: [
      'isGender',
      'likesGender',
      'n',
      'j',
      'preferenceBox',
      'colors'
    ],
    // end props
    data () {
      return {
        clicked: false
      }
    },
    // end data
    methods: {
    }
  }
</script>

<style scoped>
  .unlocked {
    cursor: move;
  }
</style>