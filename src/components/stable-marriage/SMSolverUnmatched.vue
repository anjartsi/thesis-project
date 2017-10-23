<template lang='pug'>
div
  div.row
    div.col-xs-12.text-center
      h3 Unmatched
  div.row
    div.col-xs-2
      h4 Men:
    div.col-xs-10
      div(
        style='display: inline-block'
        v-for='index in unmatched.men'
        @click='$emit("manClicked", index)'
        :class='{clickable}'
      )
        SM-person-box(
          :gender='"m"'
          :index='index'
        )
  div.row
    div.col-xs-2
      h4 Women:
    div.col-xs-10
      SM-person-box(
        v-for='index in unmatched.women' 
        :gender='"w"'
        :index='index'
        :key='index'
      )
</template>

<script>
import SMPersonBox from './SMPersonBox'
export default {
  components: {
    SMPersonBox
  },
  props: [
    'n',
    'colors',
    'unmatched',
    'clickable'
  ],
  // end props
  data () {
    return {
    }
  },
  // end data
  methods: {
    manClicked: function (index) {
      this.$emit('manClicked', index)
    }
  }
}
</script>

<style scoped>
h4 {
  padding-top: 8px;
  text-align-last: right;
}
div.row {
  margin-bottom: 5px;
}
.clickable {
  cursor: pointer
}
</style>