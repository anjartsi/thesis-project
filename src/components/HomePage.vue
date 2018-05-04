<template lang='pug'>
  div
    div.row
      div.col-xs-12
        h1.hello Welcome to Fun with Algorithms!
    div.row
      div.col-xs-4
        div.col-xs-12
          h2 Lessons
        div.col-xs-12
          h3(v-for='chapter in chapters') {{chapter.name}}
            ul
              li(v-for='topic in topics' v-if='topic.chapter === chapter.abbreviation')
                h4
                  router-link(v-if='topic.link' :to='topic.link') {{topic.name}}
                  p(v-else) {{topic.name}}
      div.col-xs-8
        div.col-xs-12
          h2 Description
        div.col-xs-12
          p.desc This website is an Algorithm Visualization 
            |  tool designed to help teachers to use their 
            |  time in class for interesting lectures 
            |  and engaging discussions, not drawing
            |  complex diagrams on the whiteboard while their students browse the Facebook.
          p.desc You can create instances of a problem, and run an algorithm to solve it, step by step.
            |  You can also save instances onto your local machine as a text file to load later. 
            |  You can even load some prebuilt examples right from the page! 
            |  This site has been designed to be easy to learn, and fun to use (hopefully)! 
        div.col-xs-12  
        div.col-xs-12
          h2 How to Host a Local Version
          ul
            li This requires node.js (version 4+) and NPM (version 3+)
            li Download and unzip the following 
              a(href='static/fun-with-algorithms.zip') ZIP file
            li Open a terminal and move into the directory of the unzipped file
            li Run 
              code npm install
              | wait until it completes
            li Then run 
              code node server
            li The app can then be accessed on your localhost:5000


</template>

<script>
  import Vue from 'vue';
  import VueRouter from 'vue-router';

  Vue.use(VueRouter);

  export default {
    components: {
    },
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
          { name: 'Stable Marriage', chapter: 'intro', link: 'stable-marriage' },
          { name: 'Interval Scheduling', chapter: 'greedy', link: 'interval-scheduling' },
          { name: 'Minimize Lateness', chapter: 'greedy' },
          { name: 'Huffman Code', chapter: 'greedy' },
          { name: 'Counting Inversions', chapter: 'divide' },
          { name: 'Closest Pair of Points', chapter: 'divide', link: 'closest-pair-of-points' },
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
  h3 a {
    font-size: 25px;
    text-decoration: underline;
  }

  p.desc {
    font-size: 20px;
  }

  ul li {
    list-style: none;
    font-size: 20px;
  }
</style>
