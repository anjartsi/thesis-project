<template lang='pug'>
div.container-fluid
  div.row
    div.row
      h1 Stable Marriage
    div.row
      h2.col-xs-12(style="text-align:center") The Problem Instance
      div.row
        div.col-xs-2
          problem-size(v-model='n' @input='changeProblemSize')
        //- Preference Lists
        div.col-xs-10
          h3(style="text-align:center") Preference Lists
          div.row
            div.col-xs-6
              h4(style="text-align:center") Men
              preference-list(
                isGender='m'
                likesGender='w'
                :n='n'
                :preference-list='preferences["m"]'
                v-on:reorderBoxes='swap'
                )
            div.col-xs-6
              h4(style="text-align:center") Women
              preference-list(
                isGender='w'
                likesGender='m'
                :n='n'
                :preference-list='preferences["w"]'
                v-on:reorderBoxes='swap'
              )
      //- Buttons
      div.row
        h4(style="text-align: center") Functions
        div.row(style="text-align: center")
          div.col-xs-2
            button(
              @click='randomize'
              ).btn.btn-block.btn-lg Randomize
          div.col-xs-2
            button(
              @click='reset'
              ).btn.btn-block.btn-lg Reset
          div.col-xs-2
            button.btn.btn-block.btn-lg.disabled Propose-Dispose
</template>

<script>
import ProblemSize from '../generic/ProblemSize'
import PreferenceList from './PreferenceList'
export default {
  components: {
    ProblemSize, PreferenceList
  },
  // end components
  data () {
    return {
      n: 3,
      preferences: {
        m: [[1, 2, 3], [1, 2, 3], [1, 2, 3]],
        w: [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
      }
    }
  },
  // end data
  methods: {
    changeProblemSize: function () {
      // for the men and women
      for (let mf in this.preferences) {
        let list = this.preferences[mf]
        // check to see if there are the correct number of rows
        this.checkNumRows(list)
        // check to see if each row has the correct number of preferences
        for (let i = 0; i < this.n; i++) {
          this.checkPreferenceRow(list[i])
        }
      }
    },
    // end changeProblemSize
    checkNumRows (arr) {
      // Check to see that an array has exactly n arrays
      // If there are too many remove them from the end
      // If there are not enough, add empty arrays at the end
      if (arr.length < this.n) {
        for (let i = arr.length; i < this.n; i++) {
          arr.push([])
        }
      } else if (arr.length > this.n) {
        arr.splice(this.n)
      }
    },
    // end checkNumRows()
    checkPreferenceRow (arr) {
      // Check to see that an array has exactly n numbers between [1, n]
      // If any numbers are too large, remove them
      // If there are too few numbers, add them
      if (arr.length < this.n) {
        for (let i = arr.length; i < this.n; i++) {
          arr.push(i + 1)
        }
      } else if (arr.length > this.n) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] > this.n) {
            arr.splice(i, 1)
            i--
          }
        }
      }
    },
    // end checkPreferenceRow()
    swap (gender, person, pref1, pref2) {
      let arr = this.preferences[gender][person]
      let temp = arr[pref1]
      arr[pref1] = arr[pref2]
      arr.splice(pref2, 1, temp)
    },
    // end swap
    randomize: function () {
      let gender, person, a, b
      let min, max
      min = 0
      max = this.n - 1
      for (let i = 0; i < this.n * this.n; i++) {
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
      let num = this.n
      this.n = 1
      this.changeProblemSize()
      this.n = num
      this.changeProblemSize()
    }
  }
  // end methods
}
</script>

<style>
  
</style>
