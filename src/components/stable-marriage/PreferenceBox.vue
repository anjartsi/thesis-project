<template lang='pug'>
  div(
  :style='{"background-color": this.$parent.$parent.colors[preferenceBox]}'
  @mousedown='$emit("boxMouseDown", j)'
  @mouseup='$emit("boxMouseUp", j)'
  @mouseenter='$emit("boxMouseEnter", j)'
  @mouseleave='$emit("boxMouseLeave", j)'
  ) {{likesGender}}
    sub {{ this.preferenceBox }}
</template>

<script>
  export default {
    props: [
      'isGender',
      'likesGender',
      'n',
      'j',
      'preferenceBox'
    ],
    // end props
    data () {
      return {
        clicked: false
      }
    },
    // end data
    methods: {
      boxMouseDown () {
      },
      // end boxMouseDown()
      boxMouseUp () {
      },
      boxMouseLeave () {
      },
      boxMouseEnter () {
      }
    }
  }
</script>

<style scoped>
  div {
    display: inline-block;
    width: 10%;
    text-align: center;
    cursor: move;
    height: 100%;
    line-height: 50px;
    white-space: nowrap;
    border-radius: 10px;
  }
</style>