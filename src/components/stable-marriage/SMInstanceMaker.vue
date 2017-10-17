<template lang='pug'>
div.row
  //- Problem Size
  div.col-xs-2(v-if='!locked')
    div.row
      problem-size-control(
        v-model='problemSize' 
        @input='changeProblemSize'
        :problemSize='problemSize'
        min='1'
        max='10'
      )
    br
    div.row
      div.col-xs-12
        nice-button(v-on:click.native='randomize') Randomize
    br
    div.row
      div.col-xs-12
        nice-button(v-on:click.native='reset') Reset
  div.col-xs-2(v-else)
  //- Preference Lists
  div.col-xs-10
    h3(style="text-align:center") Preference Lists
    div.row
      div.col-xs-6
        h4(style="text-align:center") Men
        SM-preference-list(
          isGender='m'
          likesGender='w'
          :n='n'
          :locked='locked'
          :preference-list='preferences["m"]'
          v-on:reorderBoxes='swap'
          )
      div.col-xs-6
        h4(style="text-align:center") Women
        SM-preference-list(
          isGender='w'
          likesGender='m'
          :n='n'
          :locked='locked'
          :preference-list='preferences["w"]'
          v-on:reorderBoxes='swap'
        )
</template>

<script>
import NiceButton from '../generic/NiceButton'
import ProblemSizeControl from '../generic/ProblemSizeControl'
import SMPreferenceList from './SMPreferenceList'
export default {
  components: {
    NiceButton, ProblemSizeControl, SMPreferenceList
  },
  // end components
  props: [
    'preferences', 'locked', 'n'
  ],
  // end props
  data () {
    return {
      problemSize: this.n
    }
  },
  // end data
  methods: {
    changeProblemSize: function () {
      this.$emit('update:n', this.problemSize)
      this.problemSize = Math.min(10, this.problemSize)
      this.problemSize = Math.max(1, this.problemSize)
      // for the men and women
      for (let mf in this.preferences) {
        let list = this.preferences[mf]
        // check to see if there are the correct number of rows
        this.checkNumRows(list)
        // check to see if each row has the correct number of preferences
        for (let i = 0; i < this.problemSize; i++) {
          this.checkPreferenceRow(list[i])
        }
      }
    },
    // end changeProblemSize
    checkNumRows (arr) {
      // Check to see that an array has exactly n arrays
      // If there are too many remove them from the end
      // If there are not enough, add empty arrays at the end
      if (arr.length < this.problemSize) {
        for (let i = arr.length; i < this.problemSize; i++) {
          arr.push([])
        }
      } else if (arr.length > this.problemSize) {
        arr.splice(this.problemSize)
      }
    },
    // end checkNumRows()
    checkPreferenceRow (arr) {
      // Check to see that an array has exactly n numbers between [1, n]
      // If any numbers are too large, remove them
      // If there are too few numbers, add them
      if (arr.length < this.problemSize) {
        for (let i = arr.length; i < this.problemSize; i++) {
          arr.push(i + 1)
        }
      } else if (arr.length > this.problemSize) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] > this.problemSize) {
            arr.splice(i, 1)
            i--
          }
        }
      }
    },
    // end checkPreferenceRow()
    swap (gender, person, pref1, pref2) {
      if (!this.locked) {
        let arr = this.preferences[gender][person]
        let temp = arr[pref1]
        arr[pref1] = arr[pref2]
        arr.splice(pref2, 1, temp)
      }
    },
    // end swap
    randomize: function () {
      let gender, person, a, b
      let min, max
      min = 0
      max = this.problemSize - 1
      for (let i = 0; i < this.problemSize * this.problemSize; i++) {
        if (Math.random() >= 0.5) {
          gender = 'm'
        } else {
          gender = 'w'
        }
        person = Math.floor(min + (1 + max - min) * Math.random())
        a = Math.floor(min + (1 + max - min) * Math.random())
        b = Math.floor(min + (1 + max - min) * Math.random())

        this.swap(gender, person, a, b)
      }
    },
    // end randomize()
    reset: function () {
      let num = this.problemSize
      this.problemSize = 1
      this.changeProblemSize()
      this.problemSize = num
      this.changeProblemSize()
    }
  }
  // end methods
}
</script>

<style>
  
</style>
