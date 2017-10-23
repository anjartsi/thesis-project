<template lang='pug'>
div
  div.row
    div.col-xs-12.text-center
      h3 Next Proposal
  div(v-if='!solved')
    div(v-if='proposingMan > -1')
      div.row
        div.col-xs-1
          //- The man who will propose next
          SM-person-box(
            :gender='"m"'
            :index='proposingMan'
          )
        div.col-xs-1
        div.col-xs-10
          //- His preference list (with X's on the women who rejected him)
          SM-person-box(
          v-for="(woman, index) in preferences.m[proposingMan]"
          :gender='"w"'
          :index='woman'
          :key='index'
          :rejected='rejections[proposingMan][woman]'
          )
      hr
      div.row
        div.col-xs-1
        div.col-xs-10
          //- The proposing man (again)
          SM-person-box(
            v-if='proposingMan > -1'
            :gender='"m"'
            :index='proposingMan'
          ) 
          div#proposing(style='display: inline-block')
            i.fa.fa-arrow-right.fa-3x
          //- The woman he's proposing to
          SM-person-box(
            v-if='proposedToWoman > -1'
            :gender='"w"'
            :index='proposedToWoman'
          ) 
            p w
              sub {{proposedToWoman}} 
      hr
      div.row(v-if='proposedToWoman > -1')
        div.col-xs-1
          //- The woman he's proposing to (again)
          SM-person-box(:gender='"w"'  :index='proposedToWoman')
        div.col-xs-1
        div.col-xs-10
          //- The woman's preference list (and all the men she's rejected)
          SM-person-box(
            v-for="(man, index) in preferences.w[proposedToWoman]"
            :gender='"m"'
            :index='man'
            :key='index'
            :rejected='rejections[man][proposedToWoman]'
          )
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
    'n', 'colors', 'proposingMan', 'proposedToWoman', 'preferences', 'rejections', 'solved'
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