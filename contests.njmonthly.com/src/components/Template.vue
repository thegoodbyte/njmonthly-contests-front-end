<template>
</template>
<script>
import EntryForm from 'components/contests/EntryForm.vue';
import {ENV_URL, MAIN_URL, STRIPE_PUBLISHABLE} from '../../environment.js';
import axios from 'axios';
export default {
  name: 'directory-view',

  components: {
    EntryForm,
    ContestHeader,
  },
  data () {
    console.log('current page', this.$route)
    return {
      places: null,
      displayMobileFilters: false,
      MAIN_URL: MAIN_URL,

      // page: this.$route.query['page'] ? Number(this.$route.query['page']) : 1,
    }

  },
  created() {
    let entryForm = this.$store.state.entryForm;
    let contest = this.$store.state.contest;
    if (!entryForm || (contest && contest.slug !== this.$route.params.id)) {
      console.log('Getting new data')
      const uri = ENV_URL + this.$route.path;
      this.$store.dispatch('CONTESTS_CONTEST_ENTRIES_CREATE', {uri: uri})
    }
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  mounted() {

    if (typeof window !== "undefined") {

      this.$ga.set(this.$route.fullPath);
      this.$ga.page(this.$route.fullPath);
    }
  },

  serverAsyncData({store, to, from}) {

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
      route = state.route.from
    }
    // return store.dispatch('FETCH_DIRECTORY', {route})

    const uri = ENV_URL + route.path;
    return store.dispatch('CONTESTS_CONTEST_ENTRIES_CREATE', {uri: uri})

  },
  methods: {
    formSubmitted() {
    },
  },

  watch: {
    '$route' (to, from) {
      this.$store.dispatch('TOGGLE_LOADING', {loading: this.$store.state.loading})
      this.$store.dispatch('FETCH_DIRECTORY', { route: this.$route }).then(() => {

        this.$store.dispatch('TOGGLE_LOADING', {loading: this.$store.state.loading})

      }, this)

    }
  },
}
</script>

<style lang="scss">

</style>
