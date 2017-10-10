<template lang='pug'>
  div.row
    div(:style='{color: this.$parent.colors[i]}').col-xs-1 {{isGender}}
      sub {{i}}
    preference-box(
      v-for='j in n'
      :isGender='isGender' 
      :likesGender='likesGender'
      :n='n'
      :i='i'
      :j='j'
      :key='j'
      :preference-box='PreferenceListRow[j-1]'
      )
</template>

<script>
  import PreferenceBox from './PreferenceBox'
  export default {
    components: {
      PreferenceBox
    },
    // end components
    props: [
      'PreferenceListRow',
      'isGender',
      'likesGender',
      'n',
      'i'
    ],
    // end props
    data () {
      return {
      }
    }
    // end data
  }
</script>

<style scoped>
  div.row {
    height: 4em;
    border-bottom: 1px solid black;
    -webkit-user-select: none;
  }
</style>