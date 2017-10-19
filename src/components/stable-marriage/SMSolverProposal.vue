<template lang='pug'>
div
  div.row
    div.col-xs-12.text-center
      h3 Next Proposal
  div(v-if='proposingMan > -1')
    div.row
      div.col-xs-1
        div.personBox.m(
          :style='{"background-color":colors[proposingMan]}'
        )
          p m
            sub {{romeo}}
      div.col-xs-11
        div.personBox.w(
        v-for="(w, index) in preference" 
        :style='{"background-color":colors[w]}'
        )
          i.fa.fa-times.rejected(v-if='rejection[index]')
          p w
            sub {{w + 1}}
    hr
    div.row
      div.col-xs-1
      div.col-xs-10
        div.personBox.m(:style='{"background-color":colors[romeo - 1]}') 
          p m
            sub {{romeo}} 
        div#proposing(style='display: inline-block')
          i.fa.fa-arrow-right.fa-3x
        div.personBox.w(:style='{"background-color":colors[juliet - 1]}') 
          p w
            sub {{juliet}} 
  div.row(v-else)
    div.alert.alert-info.text-center
      h4 Waiting for a proposal
</template>

<script>
export default {

  data () {
    return {
      romeo: this.proposingMan + 1,
      juliet: this.proposedToWoman + 1
    }
  },
  // end data
  watch: {
    proposingMan: function (newValue) {
      this.romeo = newValue + 1
    },
    proposedToWoman: function (newValue) {
      this.juliet = newValue + 1
    }
  },
  // end watch
  props: [
    'n', 'colors', 'proposingMan', 'proposedToWoman', 'preference', 'rejection'
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
  display: block;
  width: 49px;
  font-size: 49px;
  opacity: 0.8;
  position: absolute;
  color: red;
}

div#proposing {
  position: relative;
  top: 10px;
  display: block;
  margin-left: 10px;
  margin-right: 10px;
}
</style>