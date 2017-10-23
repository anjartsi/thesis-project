<template lang='pug'>
div
  div.row
    div.col-xs-12.text-center
      h3 Next Proposal
  div(v-if='!solved')
    div(v-if='proposingMan > -1')
      div.row
        div.col-xs-1
          SM-person-box(
            :gender='"m"'
            :index='proposingMan'
          )
        div.col-xs-1
        div.col-xs-10
          div(v-for="(w, index) in preference" style='display: inline-block')
            SM-person-box(
            :gender='"w"'
            :index='w'
            :key='index'
            :rejected='rejection[index]'
            )
      hr
      div.row
        div.col-xs-1
        div.col-xs-10
          SM-person-box(
            v-if='proposingMan > -1'
            :gender='"m"'
            :index='proposingMan'
          ) 
          div#proposing(style='display: inline-block')
            i.fa.fa-arrow-right.fa-3x
          SM-person-box(
            v-if='proposedToWoman > -1'
            :gender='"w"'
            :index='proposedToWoman'
          ) 
            p w
              sub {{proposedToWoman}} 
    div.row(v-else)
      div.alert.alert-info.text-center
        h4 Waiting for a proposal
  div(v-else)
    div.row
      div.col-xs-12
        div.alert.alert-success.text-center
          h3 All people have been matched. Hooray!
</template>

<script>
import SMPersonBox from './SMPersonBox'
export default {
  components: {
    SMPersonBox
  },
  // end components
  data () {
    return {
    }
  },
  // end data
  props: [
    'n', 'colors', 'proposingMan', 'proposedToWoman', 'preference', 'rejection', 'solved'
  ],
  // end props
  methods: {
    getMansPreference: function (man, index) {
      let arr = this.preferences.m[man]
      console.log(arr[index])
      return arr[index]
    }
  }
}
</script>

<style scoped>
i.rejected {
  display: inline-block;
  font-size: 49px;
  opacity: 0.8;
  color: red;
  position: absolute;
  left: 22px;
}

div#proposing {
  position: relative;
  top: 10px;
  display: block;
  margin-left: 10px;
  margin-right: 10px;
}

.alert > h4, .alert > h3 {
  margin: 0px;
}

</style>