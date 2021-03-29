<template>
   <div>
     <broadstreet-zone zone-id="77572"></broadstreet-zone>
     <broadstreet-zone zone-id="77573"></broadstreet-zone>
     <div v-if="contest"  class="container">    
       <ContestDefaultHeader v-if="contest.slug !== 'scavenger-hunt'"  v-bind:contest="contest" />
       <ScavengerHuntHeader v-else v-bind:contest="contest" v-bind:user="user" />
     </div>
    </div>
</template>



<script>
import {ENV_URL, S3_URL, MAIN_URL, STRIPE_PUBLISHABLE} from '../../environment.js';
import ContestDefaultHeader from 'components/contests/ContestDefaultHeader.vue';
import ScavengerHuntHeader from 'components/contests/ScavengerHuntHeader.vue';
export default {
  name: 'ContestHeader',
  props: ['id'],
  components:{
    ContestDefaultHeader,
    ScavengerHuntHeader
  },
  
  computed: {
    user() {
      return this.$store.state.user;
    },
    contest () {
      return  this.$store.state.contest || this.$store.state.contests;
    },
    gallery_or_vote(){
      return this.gallery_or_vote_item();
    }
  },

 created() {
    let contests = this.$store.state.contests;

    if (!contests) {
      this.$store.dispatch("LOADING", true);
      const uri = ENV_URL + this.$route.path;
      this.$store.dispatch("CONTESTS", { uri: uri }).then(() => {
        this.$store.dispatch("LOADING", false);
      });
    }
  },

  mounted() {
    this.$ga.set(this.$route.fullPath);
    this.$ga.page(this.$route.fullPath);
  },

  serverAsyncData({ store, to, from }) {
    const state = store.state;

    // Set the rest of the searchOptions using the query.
    // to and from are undefined when coming from a different page
    // and when the page first loads, so use the query in the route
    let route = {};
    if (to !== undefined) {
      route = to;
    } else if (from === undefined) {
      route = state.route;
    } else {
      route = state.route.from;
    }
    // return store.dispatch('FETCH_DIRECTORY', {route})

    const uri = ENV_URL + route.path;
    return store.dispatch("CONTESTS", { uri: uri });
  },
}
</script>