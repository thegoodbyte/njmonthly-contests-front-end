<template>

  <div>

  <div class="row" v-if="contest">
    <div class="col-md-12">
      <contest-header />

    </div>
  </div>
  
  <div  v-if="(contest && contest.status !== 'submit' ) && (user && user.admin_level <= 10 || !user ) ">
    <h2 style = "text-align:center" >The entry period has ended. Public voting on all entrants takes place February 4-14 on the Gallery page.</h2>
  </div>
  <div v-else>
    <div class="row">

      <div v-if="page" class="enter-text col-md-5">
        <h1>{{ page.title }}</h1>
        <div v-html="page.content"></div>

        <div class="share-container">
          <h4>Share with your friends!</h4>
          <div class="share-buttons-container">
            <a class="share-icon" :href="'https://www.facebook.com/sharer/sharer.php?u=' + MAIN_URL + '/contests/' + contest.slug + '/entries/' + '&quote=' + share_text" target="_blank">
              <div class="facebook-icon">
                <facebook-icon />
              </div>
            </a>

            <a class="share-icon" :href="'http://twitter.com/share?url=' + MAIN_URL + '/contests/' + this.contest.slug + '/entries/' + '&text=' + share_text" target="_blank">
              <div>
                <twitter-icon />
              </div>
            </a>

            <a class="link-icon-container share-icon" :href="'mailto:?subject=' + share_text + '&body=' + share_text">
              <email-icon />
            </a>

          </div>
        </div>
      </div> <!--end of left column-->
      <div v-if="user && entryForm" style="display:inline-block; vertical-align:top;" class="pet-info-form enter col-md-7 ">
        <entry-form  :id ="user.id" v-bind:category="this.category" @submitted="formSubmitted"></entry-form>
      </div>
      <div v-else style="display:inline-block; vertical-align:top;" class="pet-info-form enter col-md-7 ">
        <!-- <p> The page is loading</p> -->
        <entry-form @submitted="formSubmitted"></entry-form>
      </div><!--end of right column-->

      

    </div><!--end of row-->




  </div> <!-- end of else statement -->

  </div>
  


</template>

<script>
import {ENV_URL, MAIN_URL, STRIPE_PUBLISHABLE, S3_URL} from '../../environment.js';
import EntryForm from 'components/contests/EntryForm.vue';
import ContestHeader from 'components/contests/ContestHeader.vue';
import PageDisplay from 'components/contests/PageDisplay.vue';
import axios from 'axios';
import Loader from 'components/ui/Loader.vue';
import FacebookIcon from 'components/ui/FacebookIcon.vue';
import TwitterIcon from 'components/ui/TwitterIcon.vue';
import EmailIcon from 'components/ui/EmailIcon.vue';
var smoothScroll = require('smoothscroll');


export default {
  name: 'directory-view',

  components: {
    EntryForm,
    ContestHeader,
    FacebookIcon,
    TwitterIcon,
    EmailIcon,
  },



  data () {

    return {
      places: null,
      displayMobileFilters: false,
      MAIN_URL: MAIN_URL,
      S3_URL: S3_URL,
      category:'',
      enteredInContest:false
      // page: this.$route.query['page'] ? Number(this.$route.query['page']) : 1,
    }

  },



  // beforeCreate() {
  // 	this.$store.dispatch('FETCH_CURRENTLY_SELECTED_FACETS', {});
  // },


  computed: {
    user() {

      return this.$store.state.user;
    },
    entryForm() {

      return this.$store.state.entryForm;
    },
    contest() {
      return this.$store.state.contest;
    },
    share_text() {
      return this.$store.state.contest ? "Check out the " + this.contest.title + " Contest!" : '';
    },

    page() {
    	return this.$store.state.page;
    }

  },

  mounted() {
    this.$nextTick(() => {
      this.checkIfPageNeedsRefresh();
          console.log("the parameters");
    console.dir(this.$route);

      console.log("page is being mounted");
      console.dir(this.$store.state.page)
    this.$ga.set(this.$route.fullPath);
    this.$ga.page(this.$route.fullPath);
    this.category = this.$route.query.cat ? this.$route.query.cat : "" ;
 
    
    window.addEventListener('beforeunload', function (e) {
        // Cancel the event
        e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = '';
      });
    });


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

  metaInfo () {

    const imageUrl = S3_URL + '/' + this.contest.media_id + '/conversions/large.jpg';

    return this.$seo('contest', this.contest.title, imageUrl);
    
  },

  methods: {

    checkIfPageNeedsRefresh() {
    console.log("First mounted function")
    let entryForm = this.$store.state.entryForm;
    let contest = this.$store.state.contest;
    if (!entryForm || (contest && contest.slug !== this.$route.params.id) || this.$store.state.page.slug !== 'create') {
      console.log('Getting new data ', this.user)
      this.$store.dispatch('LOADING', true);
      const uri = ENV_URL + this.$route.path;
      this.$store.dispatch('CONTESTS_CONTEST_ENTRIES_CREATE', {uri: uri}).then(() => {
        this.$store.dispatch('LOADING', false);
      });
    }
  },
    userHasEntered(callback){
      let uri = ENV_URL + `/items/contests/${this.contest.id}/${this.user.id}`;
      axios.get(uri,callback)
      .then(function(response){
        let hasEntered = Object.keys(response.data).length
        let result =  callback( hasEntered > 0 )
        return result;
      })
      .catch(function(){})

    },
    setNameIfEmpty(){
      let item_name = document.getElementById('item_name');
      item_name.value = this.category != '' && item_name.value.trim() === "" && item_name.required === false? this.category : item_name.value;
      console.dir(item_name)
    },

    formSubmitted() {
      
        
        
  
        // var uniqueId = Math.random().toString(36).substring(2)
        // + (new Date()).getTime().toString(36);
        
        const item_data = {
          item: this.entryForm.fields,
          // uniqueId: uniqueId,
        }
        
        item_data.contest_id = this.contest.id;
        
        if (this.user) {
          item_data.user_id = this.user.id;
        }
        
        var exampleDestination = document.getElementById('payment-form');
        const redirectPage =  '/contests/' + this.contest.slug + '/entries/complete';
        console.log(redirectPage)

        smoothScroll(exampleDestination);
          this.$router.push({ path: redirectPage, query: {}})


    },
    catchError(err) {
      alert(err.response.status + ': ' + err.response.data.message);
      this.is_loading = false;
      return err.response;
    },

  },




  watch: {
    category:function(){
     
    },
    hasEntered:function(){
     console.log("change has been updated")
    },
    '$route': function (to, from) {
      console.log("The Route has changed")

      console.log('watching route to from', to, from);

      // this.$bar.start();

      // if (to.path === from.path) {
        this.$store.dispatch('TOGGLE_LOADING', {loading: this.$store.state.loading})
        // let loader = window.document.getElementById('loader')
        // if (loader) {
        //   loader.class = 'loader active';
        // }
      // }


      this.$store.dispatch('FETCH_DIRECTORY', { route: this.$route }).then(() => {

        this.$store.dispatch('TOGGLE_LOADING', {loading: this.$store.state.loading})

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




