<template lang="pug">
div
  h2 Points ({{problemSize.current}} total)
  div.scrollable
    table.text-center.table.table-striped.table-hover
      thead
        tr
          th.border-right Index
          th x
          th y
          th(v-if='editing') Delete
          th(v-else)
      tbody
        tr(
          v-for='(point, index) in points'
          :key='index'
          @mouseenter='vueHighlightPoint(index)'
          @mouseleave='vueUnhighlightPoint(index)'
          )
          td.border-right {{index}}
          td {{point.x}}
          td {{point.y}}
          td.danger(@click='deletePoint({ index })' v-if='editing')
            span.fa.fa-times.text-danger
          td(v-else)
      
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('closestPairOfPoints');

export default {
  computed: {
    ...mapState([
      'points',
      'problemSize',
    ]),
    ...mapGetters([
      'editing',
    ]),
  },
  methods: {
    ...mapActions([
      'deletePoint',
      'highlightPoint',
      'unhighlightPoint',
    ]),
    vueHighlightPoint(index) {
      this.highlightPoint({ index });
    },
    vueUnhighlightPoint(index) {
      this.unhighlightPoint({ index });
    },
  },
};
</script>

<style scoped>
ul{
  list-style-type: none;
}
div {
  height: 500px;
}
table {
  font-size: 16px;
}
.scrollable {
  height: 500px;
  overflow-y: scroll;
}
tr {
  width: 100%;
}
td, th {
  width: 25%;
  text-align: center;
}
td.danger {
  cursor: pointer;
}
td.border-right {
  border-right: 1px solid lightgray;
}
</style>

