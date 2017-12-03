<template lang='pug'>
  div
    div.row
      div.col-xs-12
        h1.hello Welcome to Fun with Algorithms!
    div.row
      div.col-xs-12.col-lg-6
        div.col-xs-12
          h2 Problems
        div.col-xs-12
          h3(v-for='chapter in chapters') {{chapter.name}}
            ul
              li(v-for='topic in topics' v-if='topic.chapter === chapter.abbreviation')
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
  import Vue from 'vue';
  import VueRouter from 'vue-router';

  Vue.use(VueRouter);

  export default {
    data() {
      return {
        chapters: [
          { name: 'Intro', abbreviation: 'intro' },
          { name: 'Greedy Algorithms', abbreviation: 'greedy' },
          { name: 'Divide and Conquer', abbreviation: 'divide' },
          { name: 'Dynamic Programming', abbreviation: 'dynamic' },
          { name: 'Network Flow', abbreviation: 'network' },
        ],
        topics: [
          { name: 'Stable Marriage', link: 'stable-marriage', chapter: 'intro' },
          { name: 'Interval Scheduling', link: 'interval-scheduling', chapter: 'greedy' },
          { name: 'Minimize Lateness', chapter: 'greedy' },
          { name: 'Huffman Code', chapter: 'greedy' },
          { name: 'Counting Inversions', chapter: 'divide' },
          { name: 'Closest Pair of Points', chapter: 'divide' },
          { name: 'Weighted Interval Scheduling', chapter: 'dynamic' },
          { name: 'Segmented Least Squares', chapter: 'dynamic' },
          { name: 'Largest Common Substring', chapter: 'dynamic' },
          { name: 'Subset Sum', chapter: 'dynamic' },
          { name: 'Knapsack Problem', chapter: 'dynamic' },
          { name: 'Ford-Fulkerson', chapter: 'network' },
          { name: 'Preflow Push', chapter: 'network' },
        ],
      };
    },
  };
</script>

<style scoped>  
  p, h3 a {
    font-size: 2rem;
  }

  ul li {
    list-style: none;
  }
</style>
