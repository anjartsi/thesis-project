<template lang="pug">
div#cpop
  CPOP-navbar
  div.container-fluid
    div.row
      div.col-xs-2#left.noselect
        div(v-if='editing')
          div.col-xs-12
            CPOP-instance-maker
          nice-message-output(
            namespace='closestPairOfPoints'
            :messages='messages.instanceMaker'
            :displayHistory='true'
            :height='200'
            v-if='false'
            ) Messages
        div(v-else)
          div.col-xs-12
            CPOP-solver
          nice-message-output(
            namespace='closestPairOfPoints'
            :messages='messages.solver'
            :displayHistory='true'
            :height='200'
            v-if='false'
            ) Messages
      div.col-xs-8#middle.noselect
        CPOP-canvas-container
      div.col-xs-2#right
        CPOP-points
    nice-pseudocode(namespace='closestPairOfPoints')#pseudo
      ul 
        li Sort the points by x-value
        li Sort the points by y-value (in a separate array)
        li If n &#8805; 3, 
          strong Divide
          |  the problem into two subproblems 
          ul
            li Each subproblem will have a size of n / 2 (the left half and the right half)
            li Find the closest pair of points in each subproblem
            li Also record the minimum distance of each subproblem: d<sub>left</sub> and d<sub>right</sub>
        li To 
          strong Conquer: 
          ul 
            li Take the minimum of the two distances d<sub>min</sub> = Min(d<sub>left</sub>, d<sub>right</sub>)
            li Look at the strip of points that are no further than d<sub>min</sub> units from the dividing line
              ul 
                li Use the array that is sorted by y-value to get these points
            li Compare each point with the next 8 points to see if their distance is less than d<sub>min</sub>
          
    nice-problem(namespace='closestPairOfPoints')#problem
      ul
        li
          strong Given: 
          |  A set of n points <em>(x, y)</em> in a 2-dimensional plane
        li
          strong Find:  
          |  the pair of points with the smallest 
          em distance
          |  between them
          ul 
            li distance is calculated as 
              em &radic; 
                  span (x<sub>1</sub> - x<sub>2</sub>)<sup>2</sup> + 
                    |  (y<sub>1</sub> - y<sub>2</sub>)<sup>2</sup> )
            li If two pairs of points are equally far apart, either pair is acceptable

</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import CPOPNavbar from './CPOP-Navbar';
import CPOPInstanceMaker from './CPOP-InstanceMaker';
import CPOPSolver from './CPOP-Solver';
import CPOPCanvasContainer from './CPOP-CanvasContainer';
import CPOPPoints from './CPOP-Points';
import NiceMessageOutput from '../nice-things/Nice-MessageOutput';
import NicePseudocode from '../nice-things/Nice-Pseudocode';
import NiceProblem from '../nice-things/Nice-Problem';


const { mapState, mapGetters } = createNamespacedHelpers('closestPairOfPoints');

export default {
  components: {
    CPOPNavbar,
    CPOPInstanceMaker,
    CPOPSolver,
    CPOPCanvasContainer,
    CPOPPoints,
    NiceMessageOutput,
    NicePseudocode,
    NiceProblem,
  },
  computed: {
    ...mapState([
      'valueRange',
      'points',
      'messages',
    ]),
    ...mapGetters([
      'editing',
    ]),
  },
};
</script>


<style scoped>
#cpop {
  height: 665;
  overflow-y: hidden;
}
#left {
  z-index: 1;
}
#middle, #right {
  height: 630px;
  overflow-x: scroll;
  z-index: 0;
}

.noselect {
  user-select: none;
}

#problem em {
  background-color: white;
  color: black;
}
#problem em span {
  border-top: 1px solid black;
}
</style>
