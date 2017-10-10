<template lang='pug'>
  div(
  :style='{"background-color": this.$parent.$parent.colors[preferenceBox]}'
  @click='foo'
  ) {{likesGender}}
    sub {{ this.preferenceBox }}
</template>

<script>
  export default {
    props: [
      'isGender',
      'likesGender',
      'n',
      'i',
      'j',
      'preferenceBox'
    ],
    // end props
    data () {
      return {
      }
    },
    // end data
    methods: {
      foo () {
        console.log(this.i)
        console.log()
      }
    }
  }
</script>

<style scoped>
  div {
    display: inline-block;
    width: 4em;
    text-align: center;
    height: 100%;
    cursor: pointer;
  }
</style>