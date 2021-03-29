<template>
  <div>
      <div class='container'>
        
        <div :class="['single-article', listing.section]">

          <div class='row article-content-wrapper'>
            <div class='col-md-8 col-sm-12'>
              <div class="row">
                <div class="col-md-12">
                  <a class="go-back" @click="$router.go(-1)">&lt; Go back</a>
                </div>
              </div>
              <div v-if="sponsored" class='row article-head'>
                
                <div class="col-md-12">
                  <!-- <div class="breadcrumbs"><a :href="'/search?section=' + listing.section">{{ listing.section }}</a> > {{ listing.title }}</div> -->
                  <div v-if="listing.image" class='hit-image'>
                    <div class='image'>
                      <img :src="listing.image" />
                    </div>
                  </div>
                  <randomo v-if="listing.video" :video-id="listing.video" :title="listing.title"></randomo>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  
                  <div class="dir-block">
                    <div v-if="sponsored" class="sponsored">
                      Sponsored
                    </div>
                    <div class="listing-location">
                      <h1 class="dir-title" v-html="listing.title"></h1>
                      
                      <!-- Category -->
                      <div v-if="cleanCategories" class='dir-categories dir-block__categories'>
                        
                        <h3 class='dir-block__categories-title'>{{ cleanCategories.length > 1 ? 'Categories': 'Category' }}:&nbsp;</h3>
                          <span v-for="(category, index) in cleanCategories" :key="index">
                            {{ category }}{{ index + 1 === cleanCategories.length ? '' : ','}}
                          </span>
                      </div>
                    
                      <p v-if="listing.company">
                        {{ listing.company }}
                      </p>
                      <p v-if="listing.address">
                        <span>{{ listing.address }}<br/>{{ listing.city }}, {{ listing.state }} {{ listing.zip }}</span><br />
                        <a  v-on:click="clicked('Listing Directions Clicked', listing.title)" target="_blank" :href="mapUrl">Get Directions</a>
                      </p>
                    </div>
                    <p>
                      Phone: <a v-on:click="clicked('Listing Phone Clicked', listing.title)" :href="phoneLink">{{ listing.phone }}</a>
                    </p>
                    <p class="dir-block_item website">
                      Website: <a class="website" v-on:click="clicked('Listing Website Clicked', listing.title)" :href="listing.website" target="_blank">{{listing.website}}</a>
                    </p>
                  
                  </div>

                  <div v-if="sponsored">
                      <h3 class="profile-title">Profile</h3>
                      <div v-if="listing.content" class="profile-content" v-html="listing.content"></div>
                  </div>

                </div>

              </div>
            </div>

            <div class='col-md-4 sidebar'>
              <div class='dir-blocks-main'>
                <div class='dir-blocks dir-blocks--1'>
                  <div>
                    
                    <no-ssr>
                      <div class="leaflet-map-container">
                        <simple-map :listing="listing"></simple-map>
                        <a  v-on:click="clicked('Listing Directions Clicked', listing.title)" target="_blank" :href="mapUrl">Directions</a>
                      </div>
                    </no-ssr>

                    <!-- Awards -->
                    <div v-if="awards" class='dir-categories dir-block__categories'>
                      <h3 class='dir-block__categories-title'>Awards:&nbsp;</h3>
                      <span v-for="(awards, index) in listing.awards" :key="index">
                        {{ awards }}{{ index + 1 === listing.awards.length ? '' : ','}}
                      </span>
                    </div>

                    <!-- Rating -->
                    <div v-if="listing.rating" class="dir-categories dir-block__categories rating">
                      <h3 class='dir-block__categories-title'>
                        Rating:</h3> <stars :rating="listing.rating"></stars>
                    </div>

                    <!-- Price Range -->
                    <div v-if="listing.price_range" class='dir-categories dir-block__categories'>
                        <h3 class='dir-block__categories-title'>Price:&nbsp;</h3>
                        {{ listing.price_range }}
                    </div>

                    <!-- Hours -->
                    <div v-if="listing.hours" class='dir-categories dir-block__categories'>
                        <h3 class='dir-block__categories-title'>Hours: </h3>
                        <div class="hours-content" v-html="listing.hours"></div>
                    </div>

                  </div>
                </div>
                <div class='dir-blocks dir-blocks--1'>
                    <div id="broadstreet-in-list">
                      <broadstreet-zone zone-id="66356"></broadstreet-zone>
                    </div>
                </div>
              </div>
            </div>

          </div>
        
        </div>

      </div>
  </div>
</template>

<script>

import SimpleMap from 'components/SimpleMap.vue';
import NoSSR from 'vue-no-ssr';
import Stars from 'components/Stars.vue';
// import {YoutubePlayer} from 'components/YouTube.js';
import Randomo from 'components/Randomo.vue';



export default {
  name: 'listing-view',

  components: {
    'simple-map': SimpleMap,
    'no-ssr': NoSSR,
    Stars,
    Randomo
  },
  data () {
    console.log('current page', this.$route.query['page'])
    return {
      mapUrl: '',

    }


  },


  // beforeCreate() {
  // 	this.$store.dispatch('FETCH_CURRENTLY_SELECTED_FACETS', {});
  // },


  computed: {
    listing () {
      return this.$store.state.listing
    },
    sponsored() {
      return this.listing.ad_level > 0;
    },
    phoneLink() {
      return 'tel:' + this.listing.phone;
    },
    // awards() {
    //   return this.listing.awards && this.listing.awards.count > 0;
    // },
    cleanCategories() {
      let categories = '';
      if (this.listing.hcategory) {
        if (this.listing.hcategory['lvl2']) {
          categories = this.listing.hcategory['lvl2'];
        } else if (this.listing.hcategory['lvl1']) {
          categories = this.listing.hcategory['lvl1'];
        } else if (this.listing.hcategory['lvl0']) {
          categories = this.listing.hcategory['lvl0'];
        }

        let cleanCategories = [];
        categories.map(function(category) {
          var parts = category.split(' > ');
          var cleanCategory = parts[parts.length - 1];
          cleanCategories.push(cleanCategory);
        })
  
        return cleanCategories;
      }

      return false;

    },

    awards() {
      let hawards = '';
      if (this.listing.hcategory) {
        if (this.listing.hawards['lvl1']) {
          hawards = this.listing.hawards['lvl1'];
        } else if (this.listing.hawards['lvl0']) {
          hawards = this.listing.hawards['lvl0'];
        }
        return hawards;
      }
      return false;

			// console.log('hawards', this.item.hawards.lvl0)
			// if (this.item.hawards !== undefined && this.item.hawards.lvl0 !== undefined && this.item.hawards.lvl0.length > 0) {
			// 	console.log('return awards', this.item.hawards);
			// 	return this.item.hawards.lvl0;
			// }
			// return false;
    }

  },

  mounted() {

    if (window !== undefined) {

      var broadstreetadsScript = document.createElement('script');
      broadstreetadsScript.setAttribute('src', 'https://cdn.broadstreetads.com/init-2.min.js');
      document.body.appendChild(broadstreetadsScript);
      const options = {
        networkId: 4933
      }
      
      window.onload = function() {
        const JSON_options = JSON.stringify(options);
        broadstreet.watch(options);
      }

      this.$ga.set(this.$route.path);
      this.$ga.page(this.$route.path);

      // ga('set', 'page', this.$route.path);
      // ga('send', 'pageview');

      let mapSite = '';
      let mapUrl = '';
      if (this.iOS()) {
        console.log('you are using iOS')
        mapSite = '//maps.apple.com/?q=';
      } else {
        console.log('not iOS');
        mapSite = '//maps.google.com/?q=';
      }
      mapUrl = mapSite + this.listing.address + ',' + this.listing.city + ',' + this.listing.state;
      this.mapUrl = mapUrl;
    }
    
  },


  asyncData ({ store, route }) {

    // console.log('listing route', route);
    const slug = route.params.id;
    // This should run each time the directory changes. It
    // should be included elsewhere
    // store.dispatch('FETCH_LISTING_METADATA', {});
    // Fetch directory runs whenever the route changes and
    // on first load (here).

    return store.dispatch('FETCH_LISTING', { slug })
    
  },

  serverAsyncData ({ store, route }) {

    // console.log('listing route', route);
    const slug = route.params.id;
    // This should run each time the directory changes. It
    // should be included elsewhere
    // store.dispatch('FETCH_LISTING_METADATA', {});
    // Fetch directory runs whenever the route changes and
    // on first load (here).

    return store.dispatch('FETCH_LISTING', { slug })
    
  },

  methods: {
    clicked: function(action, title) {
      
      if (window !== undefined) {
        console.log('clicked2', action, title, window, 'ga', this.$ga);
        this.$ga.event({
          eventCategory: 'Listing Events',
          eventAction: action,
          eventLabel: title,
        })
        // ga('send', {
        //   hitType: 'event',
        //   eventCategory: 'Listing Events',
        //   eventAction: action,
        //   eventLabel: title
        // });
      }
    },
    iOS: function() {
      if (window !== undefined) {
        var iDevices = [
          'iPad Simulator',
          'iPhone Simulator',
          'iPod Simulator',
          'iPad',
          'iPhone',
          'iPod'
        ];
      
        if (!!navigator.platform) {
          while (iDevices.length) {
            if (navigator.platform === iDevices.pop()){ return true; }
          }
        }
      }

      return false;
    }
  },

  

  watch: {
    $route (to, from) {
      console.log('route to from', to, from)
      const slug = to.id;
      this.$store.dispatch('FETCH_LISTING', {slug})
    }
  }

}


</script>

<style lang="scss">
@import "~base";

.container {
  font-family: "Open Sans";
}



</style>

