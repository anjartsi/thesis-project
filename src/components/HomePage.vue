<template lang='pug'>
  div
    div.row
      div.col-xs-12
        h1 Welcome to Fun with Algorithms!
    div.row
      div.col-xs-12.col-lg-6
        div.col-xs-12
          h2 Problems
        div.col-xs-12
          h3(v-for='chapter in chapters') {{chapter.name}}
            ul
              li(v-for='topic in topics' v-if='topic.type === chapter.abbreviation')
                h4
                  router-link(v-if='topic.link' :to='topic.link') {{topic.name}}
                  p(v-else) {{topic.name}}
      div.col-xs-12.col-lg-6
        div.col-xs-12
          h2 What is this?
        div.col-xs-12
          ul
            li 
              p This website is designed to help teach (and learn) the process of some algorithms (also makes them fun)
            li 
              p You can create an instance of a problem, and see how the solution is found, step by step!
      


</template>

<script>
  export default {
    data: function () {
      return {
        chapters: [
          {name: 'Intro', abbreviation: 'intro'},
          {name: 'Greedy Algorithms', abbreviation: 'greedy'},
          {name: 'Divide and Conquer', abbreviation: 'divide'},
          {name: 'Dynamic Programming', abbreviation: 'dynamic'},
          {name: 'Network Flow', abbreviation: 'network'}
        ],
        topics: [
          {name: 'Stable Marriage', link: 'stable-marriage', type: 'intro'},
          {name: 'Interval Scheduling', type: 'greedy'},
          {name: 'Minimize Lateness', type: 'greedy'},
          {name: 'Huffman Code', type: 'greedy'},
          {name: 'Counting Inversions', type: 'divide'},
          {name: 'Closest Pair of Points', type: 'divide'},
          {name: 'Weighted Interval Scheduling', type: 'dynamic'},
          {name: 'Segmented Least Squares', type: 'dynamic'},
          {name: 'Largest Common Subset', type: 'dynamic'},
          {name: 'Subset Sum', type: 'dynamic'},
          {name: 'Knapsack Problem', type: 'dynamic'},
          {name: 'Ford-Fulkerson', type: 'network'},
          {name: 'Preflow Push', type: 'network'}
        ]
      }
    }
  }
</script>

<style scoped>
  p, h3 a {
    font-size: 2rem;
  }
</style>
