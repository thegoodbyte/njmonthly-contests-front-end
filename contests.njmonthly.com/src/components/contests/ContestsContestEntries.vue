<template>

  <div>
    <div v-if="contest">
      <contest-header />
    </div> 

    <div v-if="page && entriesData">

      <h1 class="text-center">{{ page.title }}</h1>

      <p class="text-center">{{ page.content }} {{category}}</p>

      <div class="filters">
        
      </div>
      <div id="query-functions">

        <div class="select-container">

          <div class="sorty">

            <v-select @input="(val) => changeItemOrder(val)" :value="orderBy" :options="selectOptions" :placeholder="'Sort entries by'"></v-select>
          
          </div>

        </div>

        <form class="search-form" v-on:submit="handleSearch">

          <input type="text"
            id="search-text"
            class="search-input"
            name="text-text"
            v-model="search_text"
            placeholder='Search...'
          />

          <button :style="'background-image: url(' + API_URL + '/images/magnifying-glass.png)'" class="search-button">Search</button>

        </form>

      </div>

      <div id="scrollTo">
      </div>

      <div id="card-deck-container">

        <div class="card-deck thumbnails" id="card-list">

          <entry-card 
            v-for="entry in entriesData.data" 
            :key="entry.id" 
            :entry="entry"
            imageSize="thumb">
          </entry-card>

        </div>

      </div>

      <paginate
        :value="pageNum"
        :page-count="pageCount"
        :page-range="3"
        :margin-pages="2"
        :click-handler="changePage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'">
      </paginate>

      <div id="vote-alert" style="opacity: 0;">
        <div class="text"></div>
      </div>

    </div>

  </div>

</template>

<script>
import {ENV_URL, API_URL, MAIN_URL, STRIPE_PUBLISHABLE, S3_URL} from '../../environment.js';
import EntryCard from 'components/contests/EntryCard.vue';
import ContestHeader from 'components/contests/ContestHeader.vue';
import Paginate from 'components/Paginate.vue';
import queryString from 'qs';
import vSelect from '../vue-select';
// import mediumZoom from '../../../node_modules/medium-zoom/dist/medium-zoom.js';
import mediumZoom from './medium-zoom.js';

var smoothScroll = require('smoothscroll');

export default {
  name: 'directory-view',

  components: {
    EntryCard,
    ContestHeader,
    Paginate,
    'v-select': vSelect,
  },

  data () {
    console.log('current page', this.$route.query['page'])
    return {
      places: null,
      displayMobileFilters: false,
      is_loading: false,
      MAIN_URL: MAIN_URL,
      API_URL: API_URL,
      search_text: '',
      selectOptions: [
        { value: 'created_at-desc', label: 'Newest to Oldest' },
        { value: 'created_at-asc', label: 'Oldest to Newest' },
      ],
      orderBy: '',
    }

  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    page() {
      return this.$store.state.page;
    },
    contest() {
      return this.$store.state.contest;
    },
    entriesData() {
      return this.$store.state.entriesData;
    },
    pageNum() {
      return this.$route.query['page'] ? Number(this.$route.query['page']) : 1;
    },
    pageCount() {
      return this.$store.state.entriesData.last_page ? this.$store.state.entriesData.last_page : 1;
    },
    category() {
      return this.$route.query['categories'] ? this.$route.query['categories'] : "";
    },
  },

  mounted() {
  
    // var mediumZoom = require('medium-zoom');
    // console.log('mediumZoom', mediumZoom);
    // import('../../../node_modules/medium-zoom/dist/medium-zoom.min.js').then(mediumZoom => {
    //   console.log('mediumZoom', mediumZoom);
    //   // mediumZoom('[data-zoomable]')
    //   // use code
    // })

    // var scriptSource = '../../../node_modules/medium-zoom/dist/medium-zoom.min.js';
    // var scriptElem = document.createElement('script');
    // scriptElem.type = 'text/javascript';
    // scriptElem.async = true;
    // scriptElem.onload = function() {

    // }
    // scriptElem.src = scriptSource;
    // document.head.appendChild(scriptElem);

  },

  created() {
    if (typeof window !== "undefined") {

      this.$ga.set(this.$route.fullPath);
      this.$ga.page(this.$route.fullPath);


        const zoom = mediumZoom()

        // zoom.attach('#image-1', '#image-2')
        zoom.attach(
          // document.querySelector('#image-3'),
          document.querySelectorAll('[data-zoomable]')
        )
      
    }
    let entriesData = this.$store.state.entriesData;
    let contest = this.$store.state.contest;
    // If entriesData is empty, or if we're switching the contest (e.g.,
    // the slug of the current contest does not match what's in state)
    console.log('entriesData', contest, contest === undefined, this.$route.params.id);
    // if (!entriesData || contest === undefined || (contest && contest.slug !== this.$route.params.id)) {
      // this.$store.dispatch('TOGGLE_LOADING', {loading: this.$store.state.loading})
      // this.$bar.start();
      this.$store.dispatch('LOADING', true);
      const uri = ENV_URL + this.$route.path;
      let query = Object.assign({}, this.$route.query);
      const search = '?' + queryString.stringify(query);
      this.$store.dispatch('CONTESTS_CONTEST_ENTRIES', {uri: uri, search: search}).then(() => {
        // this.$store.dispatch('TOGGLE_LOADING', {loading: this.$store.state.loading})
        this.$store.dispatch('LOADING', false);
        console.log('adding medium zoom');

        const zoom = mediumZoom()

        // zoom.attach('#image-1', '#image-2')
        zoom.attach(
          // document.querySelector('#image-3'),
          document.querySelectorAll('[data-zoomable]')
        )
      })
    // }
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

    const uri = ENV_URL + route.path;

    const search = '';

    console.log('serverAsyncData route', uri, route);
    return store.dispatch('CONTESTS_CONTEST_ENTRIES', {uri: uri, search: search})

  },

  metaInfo () {
   if(this.contest != null){
    const imageUrl = S3_URL + '/' + this.contest.media_id + '/conversions/large.jpg';
    return this.$seo('contest', this.contest.title, imageUrl);
   }
   
  },

  methods: {
  // changePage, changeItemOrder, and handleSearch all update the state and call queryDatabase
  // queryDatabase relies on the state to get the right items

    changePage(pageNum) {
      console.log('pageNum', pageNum)
      let query = Object.assign({}, this.$route.query);
      query['page'] = pageNum;

      this.$router.push({ path: this.$route.path, query: query})

      var destToScroll = document.getElementById('scrollTo');

      smoothScroll(destToScroll);

    },
    changeItemOrder(val) {
      console.log('val', val)
      let newVal = val.value;
      // this.orderBy = newVal;
      const order_values = newVal.split("-");
      const sort_order = order_values[0];
      const order_direction = order_values[1];
      
      let query = Object.assign({}, this.$route.query);

      query['order'] = sort_order;

      query['order_direction'] = order_direction;

      delete query['page'];

      this.$router.push({ path: this.$route.path, query: query})

    },

    // The input takes care of updating the data, so no need to update the state.search_text
    // Just call queryDatabase()
    handleSearch(e){

      e.preventDefault();

      let query = Object.assign({}, this.$route.query);

      query['search'] = this.search_text;

      delete query['page'];

      this.$router.push({ path: this.$route.path, query: query})

    },

  },


  watch: {
    '$route' (to, from) {
      
      console.log('watching route to from', to, from);

      this.$store.dispatch('LOADING', true);
      const uri = ENV_URL + this.$route.path;
      let query = Object.assign({}, this.$route.query);
      const search = '?' + queryString.stringify(query);
      console.log('qs search', search);
      this.$store.dispatch('CONTESTS_CONTEST_ENTRIES', { uri: uri, search: search }).then(() => {

          this.$store.dispatch('LOADING', false);
          const zoom = mediumZoom()

          // zoom.attach('#image-1', '#image-2')
          zoom.attach(
            // document.querySelector('#image-3'),
            document.querySelectorAll('[data-zoomable]')
          )
      }, this)

      
      console.log('route to from', to, from, this.$store.state.route)
      if (window !== undefined) {
        console.log('fullPath', to.fullPath);
        this.$ga.set(to.fullPath);
        this.$ga.page(to.fullPath);
  
      }

    }
  },


}


</script>

<style lang="scss">

</style>

