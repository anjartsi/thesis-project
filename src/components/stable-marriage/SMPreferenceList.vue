<template lang='pug'>
div.container-fluid
  SM-preference-row(
  v-for='i in n' 
  :isGender='isGender' 
  :likesGender='likesGender'
  :n='n'
  :i='i'
  :key='i'
  :locked='locked'
  :preference-list-row='preferenceList[i-1]'
  :colors='colors'
  v-on:reorderBoxes='reorderBoxes'
  )
</template>

<script>
  import SMPreferenceRow from './SMPreferenceRow';

  export default {
    components: {
      SMPreferenceRow,
    },
    // end components
    props: [
      'preferenceList',
      'isGender',
      'likesGender',
      'n',
      'locked',
      'colors',
    ],
    // end props
    data() {
      return {
      };
    },
    // end data
    methods: {
      reorderBoxes(gender, person, pref1, pref2) {
        // Forward the emitted event to parent
        this.$emit('reorderBoxes', gender, person, pref1, pref2);
      },
    },
  };
</script>

<style scoped>
  div.container-fluid {
    border: 1px solid black;
  }
</style>