<template>
  <div>
    <div class="row">
    <contest-header v-if="contest" />
    <div v-if="page" class="full-width">
      <h1 class="text-center">{{ page.title }}</h1>
      <div v-html="page.content" class="card" />
      <div v-if="page.slug === 'purchase-complete'" class="card">
        <div class="card-block">
          <div class="card-text text-center">
            <h4>Share with your friends!</h4>
            <div class="thank-you-share text-center">
              <a class="share-icon" :href="'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl + '&amp;quote=' + shareQuote" target="_blank">
                <div class="facebook-icon">
                    <svg viewBox="0 0 64 64" width="32" height="32" class="social-icon social-icon--facebook ">
                        <g>
                            <circle cx="32" cy="32" r="31" fill="#3b5998"></circle>
                        </g>
                        <g>
                            <path d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z" fill="white"></path>
                        </g>
                    </svg>
                </div>
              </a>

              <a class="share-icon" :href="'http://twitter.com/share?url=' + shareUrl + '&amp;text=' + shareQuote" target="_blank">
                <div>
                    <svg viewBox="0 0 64 64" width="32" height="32" class="social-icon social-icon--twitter ">
                        <g>
                            <circle cx="32" cy="32" r="31" fill="#00aced"></circle>
                        </g>
                        <g>
                            <path d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z" fill="white"></path>
                        </g>
                    </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import EntryForm from 'components/contests/EntryForm.vue';
import ContestHeader from 'components/contests/ContestHeader.vue';
import {ENV_URL, MAIN_URL, STRIPE_PUBLISHABLE, S3_URL} from '../../environment.js';
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
      S3_URL: S3_URL,
      // page: this.$route.query['page'] ? Number(this.$route.query['page']) : 1,
    }

  },
  created() {
    const uri = ENV_URL + this.$route.path;

    let url = ENV_URL + `/testsignin`;
    axios.get(url)
    .then((response)=>{
      console.log(response.data)
    })
    console.log('ContestsContestPage created', uri);
    this.$store.dispatch('GET_CONTEST_PAGE', {uri});
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    contest() {
      return this.$store.state.contest;
    },
    page() {
      return this.$store.state.page;
    },
    shareUrl() {
      return MAIN_URL + "/contests/" + this.contest.slug + "/enter";
    },
    shareQuote() {
      return "I just entered the " + this.contest.title + "!";
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
    return store.dispatch('GET_CONTEST_PAGE', {uri})

  },

  metaInfo () {

    const imageUrl = S3_URL + '/' + this.contest.media_id + '/conversions/large.jpg';

    return this.$seo('contest', this.page.title, imageUrl);
    
  },
  methods: {
    formSubmitted() {
    },
  },

  watch: {
    '$route' (to, from) {
      this.$store.dispatch('LOADING', true)
      const uri = ENV_URL + this.$route.path;
      console.log('changing route', uri);
      this.$store.dispatch('GET_CONTEST_PAGE', {uri}).then(() => {

        this.$store.dispatch('LOADING', false)

      })

    }
  },
}
</script>

<style lang="scss">
h2 {
    text-transform: uppercase;
    margin: 0 auto;
   
    font-size: 2.6em;
    line-height: 1.3em;
    font-weight: bold;
    color: #8d2890;

}

.content{

}

h3{
  font-size: 1.8em;
  font-weight: 300;
  line-height: 1.2em;
}
@media only screen and (max-width:600px){
  h2 {
    font-size: 2em;
    line-height: 1.6em;
  }
  h3 {
    font-size: 1em;
    font-weight: 300;
    line-height: 0.6;
  }
}
</style>
