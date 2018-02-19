<template lang='pug'>
div.container-fluid
  SM-preference-row(
    v-for='i in problemSize' 
    :isGender='isGender' 
    :likesGender='likesGender'
    :i='i'
    :key='i'
    :locked='locked'
    :colors='colors'
  )
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  import SMPreferenceRow from './SM-PreferenceRow';

  const { mapState } = createNamespacedHelpers('stableMarriage');

  export default {
    components: {
      SMPreferenceRow,
    },
    // end components
    props: [
      'isGender',
      'likesGender',
      'colors',
    ],
    // end props
    computed: {
      ...mapState([
        'locked',
        'problemSize',
      ]),
    },
    data() {
      return {
      };
    },
    // end data
    methods: {
    },
  };
</script>

<style scoped>
  div.container-fluid {
    border: 1px solid black;
  }
</style>