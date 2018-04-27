<template lang='pug'>
div#sm
  SM-navbar.cant-highlight-text
  div.container-fluid
    div.row.cant-highlight-text
      SM-instance-maker
    //- Solver goes here
    div.row.cant-highlight-text
      SM-solver
  nice-pseudocode(namespace='stableMarriage')#pseudo
    ul
      li While there is an unmatched man:
        ul 
          li A man proposes to his highest-ranked woman who has not rejected him yet 
          li The woman: 
            ul 
              li Accepts if she is currently unmatched
              li Accepts if she prefers him over her current tentative match
              li Rejects if she prefers her current tentative match over him
  nice-problem(namespace='stableMarriage')#problem
    ul
      li 
        strong Given: 
        |  a set of n men and n women,
        |  each of whom has a <em>preference list</em> where they rank all the members of the opposite gender
      li 
        strong Find: 
        |  a matching with no <em>instabilities</em>
      ul
        li A <em>matching</em> is a list of length n that pairs each man with a unique woman.
        li An <em>instability</em> occurs in a matching when a man and a woman
          |   both prefer each other over their currently matched partner
</template>

<script>
// TODO - figure out if these can go anywhere else
import SMNavbar from './SM-Navbar';
import NiceButton from '../nice-things/Nice-Button';
import NicePseudocode from '../nice-things/Nice-Pseudocode';
import NiceProblem from '../nice-things/Nice-Problem';
import SMInstanceMaker from './SM-InstanceMaker';
import SMSolver from './SM-Solver';
import SMPersonBox from './SM-PersonBox';
import stuff from '../../scripts/stuff.js';

export default {
  components: {
    SMInstanceMaker,
    NiceButton,
    NicePseudocode,
    NiceProblem,
    SMSolver,
    SMPersonBox,
    SMNavbar,
  },
  // end components
  data() {
    return {
      colors: stuff.colors,
    };
  },
  // end data
  methods: {
  }, // end methods
};
</script>

<style>

html {
  overflow: scroll;
}
#problem ul li {
  list-style-type: none;
}
#problem em {
  color: black;
  background-color: white;
}
</style>
