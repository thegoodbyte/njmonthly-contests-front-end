import FacetMulti from 'components/FacetMulti.vue';
// import Facets from 'components/Facets.vue';
import Paginate from 'components/Paginate.vue';
import Mappp from 'components/Mappp.vue';
import SearchPlaces from 'components/SearchPlaces.vue';
import Search from 'components/Search.vue';
import NoSSR from 'vue-no-ssr';
import DownArrow from 'components/ui/DownArrow.vue';
import ListItem from 'components/ListItem.vue';
import DirectorySwitcher from 'components/DirectorySwitcher.vue';
import Loader from 'components/ui/Loader.vue';
var smoothScroll = require('smoothscroll');
// import SelectedFilters from 'components/SelectedFilters.vue';
// import Paginate from 'vuejs-paginate';
// import {Pagination} from 'vue-pagination-2';




export default {
  name: 'directory-view',

  components: {
    'facet-multi': FacetMulti,
    // Facets,
    Paginate,
    'search-places': SearchPlaces,
    'search': Search,
    Mappp,
    Loader,
    'no-ssr': NoSSR,
    'down-arrow': DownArrow,
    'list-item': ListItem,
    'directory-switcher': DirectorySwitcher,
    // 'selected-filters': SelectedFilters,
  },



  data () {
    console.log('current page', this.$route.query['page'])
    return {
      places: null,
      displayMobileFilters: false,


      // page: this.$route.query['page'] ? Number(this.$route.query['page']) : 1,
    }

  },

  // beforeCreate() {
  // 	this.$store.dispatch('FETCH_CURRENTLY_SELECTED_FACETS', {});
  // },


  computed: {
    displayMobileFiltersClass() {
      return this.displayMobileFilters ? 'filter mobile' : 'filter';
    },

    directory () {
      return this.$store.state.directory.hits
    },
    sponsoredDirectory () {
      return this.$store.state.sponsoredDirectory.hits;

      // return limitedShuffledItems;
    },
    facets () {
    	return this.$store.state.directory.facets;
    },
    hitsCount() {
      return this.$store.state.directory.nbHits;
    },
    page () {
      console.log('computing page', this.$route.query['page'])
      return this.$route.query['page'] ? Number(this.$route.query['page']) : 1;
    },
    isBrowser() {
      console.log('isBrowser', typeof window !== 'undefined')
      return typeof window !== 'undefined';
    },

    facetsToShow() {
      let section = '';
      if (this.$route.query.section) {
        section = this.$route.query.section.toLowerCase();
      }
      
      console.log('facetsToShow', this.$store.state.searchOptions.facetsToShow, this.$store.state.searchOptions.facetsToShow[this.section])
      if (this.$store.state.searchOptions.facetsToShow[section] !== undefined){
        return this.$store.state.searchOptions.facetsToShow[section];
      }
      return this.$store.state.searchOptions.facetsToShow.default;
    },
    pointDown() {
      return this.displayMobileFilters ? true : false;
    },

    pageCount() {
      return this.$store.state.directory.nbPages ? this.$store.state.directory.nbPages : 1;
    },
    // Temporary function to check if the section heading section shoudl show
    isSelects() {
      if (this.$route.query['hcategory.lvl0']){
        return this.$route.query['hcategory.lvl0'].toLowerCase() === 'select' ? true : false;
      } 
      else if (this.$route.params.cat === 'select') {
        return true;
      }
      
    },
    searchContentClass: function() {
			return this.$route.query['hcategory.lvl0'] ? this.$route.query['hcategory.lvl0'].toLowerCase() : '';
    },
    section: function() {
      if (this.$route.query['hcategory.lvl0']) {
        return this.$route.query['hcategory.lvl0'].toLowerCase();
      }
      if (this.$route.params.cat) {
        return this.$route.params.cat;
      }
      return '';
    },
    currentlySelectedFacets: function() {
      return this.$store.state.searchOptions.currentlySelectedFacets;
    },
    shouldClearFilters: function() {
      // let shouldClearFilters = false;
      let query = Object.assign({}, this.$route.query);
			const shouldClearFilters = this.$store.state.searchOptions.facetsForAlgolia.filter(function(facet) {
				if (query[facet] && facet !== 'hcategory.lvl0') {
					return true;
        }
      })
      console.log('shouldClearFilters', shouldClearFilters);
      return shouldClearFilters.length > 0;
    }

  },

  mounted() {

		var broadstreetadsScript = document.createElement('script');
		broadstreetadsScript.setAttribute('src', 'http://cdn.broadstreetads.com/init-2.min.js');
		document.body.appendChild(broadstreetadsScript);
		const options = {
			networkId: 4933
		}
		const JSON_options = JSON.stringify(options);
    this.broadstreet.watch(options);
    

    this.$store.dispatch('FETCH_DIRECTORY', { route: this.$route })

    // this.places = require('places.js');

    // var placesAutocomplete = this.places({
    //   container: document.querySelector('#address-input'),
    //   useDeviceLocation: false,
    //   //aroundLatLng: "40.7627,-74.4208",
    //  aroundLatLngViaIP: true
    // });

    if (typeof window !== "undefined") {

      console.log('path', this.$route);

      this.$ga.set(this.$route.fullPath);
      this.$ga.page(this.$route.fullPath);



      
    }

  },

  serverAsyncData({store, to, from}) {
    // const state = store.state;
    // return store.dispatch('FETCH_SEARCH_OPTIONS_SERVER', {to, state}).then(function() {
    //   return store.dispatch('FETCH_DIRECTORY', {to, state})
    // });
    // return store.dispatch('FETCH_DIRECTORY_METADATA', {to, state});
    // store.dispatch('FETCH_DIRECTORY_METADATA', {});
    // return store.dispatch('FETCH_DIRECTORY', {to, state})

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
    return store.dispatch('FETCH_DIRECTORY', {route})

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

  // asyncData ({ store, to, from }) {

  //   console.log('asyncData store to from', store.state, to, from);

  //   // const state = store.state;

  //   // // Set the rest of the searchOptions using the query.
  //   // // to and from are undefined when coming from a different page
  //   // // and when the page first loads, so use the query in the route
  //   // let query = {};
  //   // if (to !== undefined) {
  //   //   query = to.query;
  //   // } else if (from === undefined) {
  //   //   query = state.route.query;
  //   // } else {
  //   //   query = state.route.from.query
  //   // }

  //   // console.log('asyncData query', query, state.route.query, Object.keys(state.route.query).length);

  //   // // to and from are undefined when coming from a different page
  //   // // and when the page first loads
  //   // // if (to === undefined && from === undefined) {
  //   // //   query = state.route.query;
  //   // // }




  //   // if (typeof window !== 'undefined' && window.document) {
  //   //   // this.$bar.start();
  //   //   let loader = window.document.getElementById('loader')
  //   //   if (loader) {
  //   //     loader.className = 'loader active';
  //   //   }
  //   // }

  //   // return store.dispatch('FETCH_DIRECTORY', {query}).then(function() {
  //   //   if (typeof window !== 'undefined' && window.document) {
  //   //     // this.$bar.finish();
  //   //     let loader = window.document.getElementById('loader')
  //   //     if (loader) {
  //   //       loader.className = 'loader';
  //   //     }
  //   //   }
  //   // })

  //   // return store.dispatch('FETCH_SEARCH_OPTIONS_SERVER', {to, state}).then(function(data) {

  //   //   console.log('state after FETCH_SEARCH_OPTIONS_SERVER', data);



  //   // });






  //   // // I have to check state.searchOptions, first, and use the query
  //   // // if searchOptions is blank.

  //   // let query = '';
  //   // // Get the currently selected facets from the URL
  //   // // so that FETCH_DIRECTORY can use it. This only happens
  //   // // once. The directory search options never changes. There
  //   // // is no need to include the dispatch anywhere else.

  //   // // store.dispatch('FETCH_DIRECTORY_SEARCH_OPTIONS', {});

  //   // // This should run each time the directory changes. It
  //   // // should be included elsewhere
  //   // // store.dispatch('FETCH_DIRECTORY_METADATA', {});

  //   // console.log('asyncData called', to, from, store.state);


  //   // const state = store.state;
    
  //   // // to and from are undefined when the page first loads
  //   // if (to === undefined && from === undefined) {
  //   //   query = state.route.query;
  //   // } else if (to === undefined && Object.keys(state.route.query).length === 0) {
  //   //   query = state.route.from.query;
  //   // }

  //   // // Update the currentlySelectedFacets
  //   // const searchOptions = Object.assign({}, store.state.searchOptions);

  //   // const facetsForAlgolia = searchOptions.facetsForAlgolia;

  //   // let currentlySelectedFacets = {};

  //   // // currentlySelectedFacets[facet.taxonomy] = [facet.category];
  //   // // Loop through all the possible facets (hcategory.lvl0, hawards.lvl0, etc)
  //   // // and use the values from the query to update the currentlySelectedFaets
  //   // facetsForAlgolia.map(function(facet) {
  //   //   if (query[facet]) {
  //   //     const categories = query[facet].split(',');
  //   //     categories.map(function(category) {
  //   //       currentlySelectedFacets[facet] = [category];
  //   //     })
  //   //   }
  //   // })

  //   // searchOptions.currentlySelectedFacets = currentlySelectedFacets;

  //   // console.log('asyncData currentlySelectedFacets', searchOptions)

  //   // if (query['page']) {
  //   //   searchOptions.page = query['page'];
  //   // }
  //   // if (query['q']) {
  //   //   searchOptions.directoryQuery = query['q'];
  //   // }
  //   // if (query['lat']) {
  //   //   searchOptions.lat = query['lat'];
  //   //   searchOptions.lng = query['lng'];
  //   // }

  //   // store.commit('SET_DIRECTORY_SEARCH_OPTIONS', {searchOptions});

    
  //   // // Fetch directory runs whenever the route changes and
  //   // // on first load (here).
  //   // return store.dispatch('FETCH_DIRECTORY', {to, state})
    
  // },

  methods: {
  	// initDirectory() {
  	// 	return this.$store.dispatch('FETCH_CURRENTLY_SELECTED_FACETS', {});
  	// },
    changePage(pageNum) {
      let query = Object.assign({}, this.$route.query);
      query['page'] = pageNum;


      this.$router.push({ path: this.$route.path, query: query})

      var destToScroll = document.getElementById('search-template');

      smoothScroll(destToScroll);

      console.log(pageNum)
    },
    toggleMobileFilters: function() {
      this.displayMobileFilters = !this.displayMobileFilters;
    },

    clearFilters: function() {
      let query = Object.assign({}, this.$route.query);
			this.$store.state.searchOptions.facetsForAlgolia.map(function(facet) {
				if (query[facet] && facet !== 'hcategory.lvl0') {
					delete query[facet];
				}
			})
      this.$router.push({ path: this.$route.path, query: query})
    },

  },




  watch: {
    '$route' (to, from) {

      console.log('watching route to from', to, from);

      // this.$bar.start();

      if (to.path === from.path) {
        let loader = window.document.getElementById('loader')
        if (loader) {
          loader.className = 'loader active';
        }
      }


      this.$store.dispatch('FETCH_DIRECTORY', { route: this.$route }).then(() => {
        if (to.path === from.path) {
          let loader = window.document.getElementById('loader')
          if (loader) {
            loader.className = 'loader';
          }
        }

        // this.$bar.finish();
      }, this)
      
      
      console.log('route to from', to, from, this.$store.state.route)
      if (window !== undefined) {
        console.log('fullPath', to.fullPath);
        this.$ga.set(to.fullPath);
        this.$ga.page(to.fullPath);
  
      }

      // const state = this.$store.state;

      // if (to === undefined && Object.keys(state.route.query).length === 0) {
      //   to = state.route.from;
      // }

      // // Update the currentlySelectedFacets
      // const searchOptions = Object.assign({}, this.$store.state.searchOptions);

      // const facetsForAlgolia = searchOptions.facetsForAlgolia;

      // const query = to.query;

      // let currentlySelectedFacets = {};

      // // currentlySelectedFacets[facet.taxonomy] = [facet.category];
      // // Loop through all the possible facets (hcategory.lvl0, hawards.lvl0, etc)
      // // and use the values from the query to update the currentlySelectedFaets
      // facetsForAlgolia.map(function(facet) {
      //   if (query[facet]) {
      //     const categories = query[facet].split(',');
      //     categories.map(function(category) {
      //       currentlySelectedFacets[facet] = [category];
      //     })
      //   }
      // })

      // searchOptions.currentlySelectedFacets = currentlySelectedFacets;

      // if (query['page']) {
      //   searchOptions.page = query['page'];
      // }

      // if (query['lat']) {
      //   searchOptions.lat = query['lat'];
      //   searchOptions.lng = query['lng'];
      // }

      // this.$store.commit('SET_DIRECTORY_SEARCH_OPTIONS', {searchOptions});

      // this.$store.dispatch('FETCH_DIRECTORY', {to, state})

    }
  },

  // beforeRouteUpdate(to, from, next) {
  //   console.log('beforeRouteUpdate', to, from, next);
  //   this.name = to.params.name
  //   next()
  // }

}

