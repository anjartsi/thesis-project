<template lang='pug'>
div.container-fluid
  preference-row(
  v-for='i in n' 
  :isGender='isGender' 
  :likesGender='likesGender'
  :n='n'
  :i='i'
  :key='i'
  :preference-list-row='preferenceList[i-1]'
  v-on:reorderBoxes='reorderBoxes'
  )
</template>

<script>
  import PreferenceRow from './PreferenceRow'

  export default {
    components: {
      PreferenceRow
    },
    // end components
    props: [
      'preferenceList',
      'isGender',
      'likesGender',
      'n'
    ],
    // end props
    data () {
      return {
        colors: [
          '#DDDDDD',
          '#0074D9',
          '#FF4136',
          '#2ECC40',
          '#FFDC00',
          '#7FDBFF',
          '#F012BE',
          '#01FF70',
          '#FF851B',
          '#39CCCC',
          '#B10DC9',
          '#AAAAAA'
        ]
      }
    },
    // end data
    methods: {
      reorderBoxes (gender, person, pref1, pref2) {
        // Forward the emitted event to parent
        this.$emit('reorderBoxes', gender, person, pref1, pref2)
      }
    }
  }
</script>

<style scoped>
  div.container-fluid {
    border: 1px solid black;
  }
</style>