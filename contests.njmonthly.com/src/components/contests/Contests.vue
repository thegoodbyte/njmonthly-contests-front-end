<template>

  <div>
    <main class="container" id="main-container">
    <h1 class="text-center">Contests</h1>


    <div v-if="contests" class="card-deck thumbnails">

      <div v-for="contest in contests" :key="contest.id" class="card one-third" :id="'card_' + contest.id">
        <div>
          <div class="visible-card">
            <div class="card-image">
              <img 
                :src="S3_URL + '/' + contest.media_id + '/conversions/thumb.jpg'" 
                :data-zoom-src="S3_URL + '/' + contest.media_id + '/conversions/large.jpg'"
                data-zoomable="true"
              />
            </div>

            <div class="card-block-container">
              <div class="card-block">
                <div class="card-content">
                  <router-link :to="'/contests/' + contest.slug + '/entries'"> 
                    <h4 class="card-title">{{ contest.title }}</h4>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    </main>

  </div>

</template>

<script>
import {ENV_URL, S3_URL, MAIN_URL, STRIPE_PUBLISHABLE} from '../../environment.js';
// import EntryForm from 'components/contests/EntryForm.vue';


export default {
  name: 'directory-view',

  components: {
    // EntryForm,
  },



  data () {
    return {
      S3_URL: S3_URL,
    }

  },

  // beforeCreate() {
  // 	this.$store.dispatch('FETCH_CURRENTLY_SELECTED_FACETS', {});
  // },


  computed: {
    user() {
      return this.$store.state.user;
    },
    contests() {
      return this.$store.state.contests;
    }

  },

  created() {

    let contests = this.$store.state.contests;
    
    if (!contests) {
      this.$store.dispatch('LOADING', true);
      const uri = ENV_URL + this.$route.path;
      this.$store.dispatch('CONTESTS', {uri: uri}).then(() => {
        this.$store.dispatch('LOADING', false);
      })
    }
  },


  mounted() {

    this.$ga.set(this.$route.fullPath);
    this.$ga.page(this.$route.fullPath);

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
    return store.dispatch('CONTESTS', {uri: uri})

  },

  metaInfo () {
    console.log('metaInfo directory', this.$store.state.searchOptions.currentlySelectedFacets)
    let title = '';
    let query = Object.assign({}, this.$route.query);

    if (query['hcategory.lvl1']) {
      const categories = query['hcategory.lvl1'].split(',');
      const categorySections = categories[0].split(' > ');
      title = categorySections[1] + ' ' + categorySections[0]
    } else {
      title = this.section;
    }


    if (query['city']) {
      title += ' in ' + query['city'];
    }

    return this.$seo('item', title)
  },

  methods: {

    catchError(err) {
      alert(err.response.status + ': ' + err.response.data.message);
      this.is_loading = false;
      return err.response;
    },

  },

}


</script>

<style lang="scss">

</style>

