<template lang='pug'>
div
  div.row
    div.col-xs-12
      h2 The Problem Instance
    div.col-xs-5
    div.col-xs-2
      //- nice-button-lock(:isLocked='isLocked' @click='lock')
  div.row
    div.col-xs-2
      div.row
        div.col-xs-12
          nice-button-lock(:isLocked='locked' @click='lock')
      br
      div.row
        div(v-if='!locked')
          //- Problem Size
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
        div(v-else) 
          div.alert.alert-warning.text-center
            h4 You must unlock the instance to change it
            h4 
              strong Warning:
              |  Unlocking the instance will erase all progress made in the solver

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
            :colors='colors'
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
            :colors='colors'
            v-on:reorderBoxes='swap'
          )
</template>

<script>
import NiceButton from '../generic/NiceButton'
import NiceButtonLock from '../generic/NiceButtonLock'
import ProblemSizeControl from '../generic/ProblemSizeControl'
import SMPreferenceList from './SMPreferenceList'
export default {
  components: {
    NiceButton, NiceButtonLock, ProblemSizeControl, SMPreferenceList
  },
  // end components
  props: [
    'preferences', 'locked', 'n', 'colors'
  ],
  // end props
  data () {
    return {
      problemSize: this.n,
      isLocked: this.locked
    }
  },
  // end data
  watch: {
    locked: function (newValue) {
      this.isLocked = newValue
    }
  },
  // end computed
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
          arr.push(i)
        }
      } else if (arr.length > this.problemSize) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] >= this.problemSize) {
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
        // Leave Man 1 alone, this causes no loss of generality
        if (!(gender === 'm' && person === 0)) {
          this.swap(gender, person, a, b)
        }
      }
    },
    // end randomize()
    reset: function () {
      let num = this.problemSize
      this.problemSize = 1
      this.changeProblemSize()
      this.problemSize = num
      this.changeProblemSize()
    },
    // End reset()
    lock: function () {
      this.isLocked = !this.isLocked
      this.$emit('update:locked', this.isLocked)
    }
  },
  // end methods
  created: function () {
    this.problemSize = 3
    this.changeProblemSize()
  }
}
</script>

<style>
  
</style>
