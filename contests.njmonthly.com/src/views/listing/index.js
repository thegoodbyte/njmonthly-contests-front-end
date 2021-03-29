import SimpleMap from '../../components/SimpleMap.vue';
import NoSSR from 'vue-no-ssr';
import Stars from '../../components/Stars.vue';
// import {YoutubePlayer} from '../../components/YouTube.js';
import Randomo from '../../components/Randomo.vue';



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

    console.log()
    if (window !== undefined) {


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
