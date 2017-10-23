<template lang='pug'>
div(
  :class='isGender'
  :style='{"background-color": colors[index]}'
)
  p {{ isGender }}
    sub {{index + 1}}

  //- If the rejected flag is on, put a big red X on the box
  i.fa.fa-times.rejected(v-if='rejected')
</template>

<script>
  export default {
    props: [
      'gender', 'index', 'rejected'
    ],
    // end props
    data: function () {
      return {
        colors: [
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
          '#DDDDDD',
          '#AAAAAA'
        ]
      }
    },
    // end data
    computed: {
      likesGender: function () {
        if (this.gender === 'm') {
          return 'w'
        } else {
          return 'm'
        }
      },
      // end likesGender
      isGender: function () {
        if (
            this.gender === '' ||
            this.gender === 'm' ||
            this.gender === 'man' ||
            this.gender === 'male'
          ) {
          return 'm'
        } else {
          return 'w'
        }
      }
      // end gender
    }
    // end computed
  }
</script>

<style scoped>
  
  div {
    display: inline-block;
    text-align: center;
    width: 50px;
    height: 50px;
    border: 1px solid black;
    margin-left: 2px
  }
  
  div > p {
    font-weight: bold;
    display: inline-block;
    background-color: white;
    width: 30px;
    height: 30px;
    padding: 3px;
    margin-top: 10px;
    border-radius: 50px;
  }
  div.m {
  }
  div.w {
    border-radius: 18px;
  }

  i.rejected {
    display: block;
    width: 49px;
    font-size: 49px;
    opacity: 0.8;
    position: absolute;
    top:0px;
    color: red;
  }

</style>