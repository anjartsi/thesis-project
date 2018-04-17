<template lang='pug'>
div
  div.row
    div.col-xs-12.text-center
      h3 Next Proposal   
        br
        |({{proposalCount}} total)
    transition(name='fade' key='SMSolverProposal')
      div.col-xs-12(v-if='!solved')
        transition(name='slide' key='SMSolverProposalNextProposal' mode='out-in')
          div.row.text-center(v-if='proposingMan > -1' key='proposal')
            //- The proposing man
            SM-person-box(
              :gender='"m"'
              :index='proposingMan'
            ) 
            div#proposing(style='display: inline-block')
              i.fa.fa-arrow-right.fa-3x
            //- The woman he's proposing to
            SM-person-box(
              v-show='proposedToWoman > -1'
              :gender='"w"'
              :index='proposedToWoman'
            )
          div.row(v-else  key='noProposal')
              div.alert.alert-info.text-center
                h4 Waiting for a proposal
      div(v-else)
        div.row
          div.col-xs-12
            div.alert.alert-success.text-center
              h4 All people have been matched. Hooray!
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import SMPersonBox from './SM-PersonBox';

const { mapState, mapGetters } = createNamespacedHelpers('stableMarriage');

export default {
  components: {
    SMPersonBox,
  },
  // end components
  data() {
    return {
    };
  }, // end data
  computed: {
    ...mapGetters([
      'solving',
    ]),
    ...mapState([
      'preferences',
      'rejections',
      'solved',
      'proposalCount',
    ]),
    ...mapState({
      n: 'problemSize',
    }),
    proposingMan() { return this.$store.state.stableMarriage.proposal.man; },
    proposedToWoman() { return this.$store.state.stableMarriage.proposal.woman; },
  },
  methods: {
    getMansPreference(man, index) {
      const arr = this.preferences.m[man];
      return arr[index];
    },
  }, // end methods
};
</script>

<style scoped>
i.rejected {
  display: inline-block;
  font-size: 49px;
  opacity: 0.8;
  color: red;
  position: absolute;
  left: 22px;
}

div#proposing {
  position: relative;
  top: 10px;
  display: block;
  margin-left: 10px;
  margin-right: 10px;
}

.alert > h4, .alert > h3 {
  margin: 0px;
}
.alert-info {
  height: 60px;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.1s;
}

.slide-enter{
  opacity: 0;
  transform: translateY(-50%);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(50%);
}
</style>