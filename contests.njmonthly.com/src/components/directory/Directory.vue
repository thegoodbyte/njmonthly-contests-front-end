<template>

  <div>

    <!-- <search></search>
    <div><search-places></search-places></div> -->

    <!-- <no-ssr>
      <mappp></mappp>
    </no-ssr> -->
    <div v-if="directory" :class="['search-content container', searchContentClass]">



      <div v-if="isSelects" class="row">
          <div class="col-md-12">
              <div class="section-header" style="background-image: url(&quot;&quot;);">
                  <div class="wrapper">
                      <div class="logo"><img src="//njmonthly.com/wp-content/uploads/2018/08/PSSelect-award-300x300.jpg"></div>
                      <div class="content">
                          <h3 class="title">Plastic Surgery Select</h3>
                          <h4 class="sub-title">Sponsored Content</h4>
                          <div>Plastic Surgery Select is announcing an elite grouping of the state’s top plastic surgeons across 10 procedure categories. This distinction is based on a number of criteria, including experience, qualifications, surgical volume, surgical results and reputation. The top doctors in each category are named Plastic Surgery Select doctors. Many of the plastic surgeons on this list perform other procedures in addition to those for which they have been recognized. View our methodology <a target="_blank" href="https://njmonthly.com/articles/top-doctors/plastic-surgery-select-methodology/">here</a>.</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>


      <div id="search-template" class="row">
        <div class="col-md-4 col-sm-12 map-sidebar filters-sidebar ">
          <directory-switcher></directory-switcher>
          <h3 class="filters-title-desktop">Filters</h3>


          <span class="toggle-filter" v-on:click="toggleMobileFilters">Filters <down-arrow :pointDown="pointDown"></down-arrow></span>

          <span class="button2" v-on:click="clearFilters" v-if="shouldClearFilters">Clear All Filters</span>


          <div :class="displayMobileFiltersClass">


          <no-ssr>
            <facet-multi facet_key="hcategory.lvl1" facet_name="Category" :facet="facets['hcategory.lvl1']">
            </facet-multi>

            <facet-multi facet_key="rating" facet_name="Rating" :facet="facets['rating']">
            </facet-multi>

            <facet-multi facet_key="hawards.lvl0" facet_name="Awards" :facet="facets['hawards.lvl0']">
            </facet-multi>

            <facet-multi facet_key="price_range" facet_name="Price Range" :facet="facets['price_range']">
            </facet-multi>
          </no-ssr>

          </div>
          <span v-if="pointDown" class="toggle-filter" v-on:click="toggleMobileFilters">Close Filters <down-arrow :pointDown="pointDown"></down-arrow></span>
        </div>

        <div class="col-md-8 col-sm-12 finder-content">
          <div class="list-actions clear-fix">
            <div class="clear-data"></div>
            <div class="results-count">{{ hitsCount }} results</div>
          </div>
          <div class="hits">
            <div class="dsr-hits">

              <div class="sponsored-hits">
                <div v-for="(listing, idx) in sponsoredDirectory" :key="listing.objectID">
                  <router-link v-if="idx === 0 || idx === 1" :to="{ path: '/listing/' + listing.slug }">
                    <list-item :listing="listing"></list-item>
                  </router-link>
                </div>
              </div>

              <div v-for="(listing, idx) in directory" :key="listing.objectID">


                <!-- <div v-if="listing.ad_level !== 0"> -->
                  <router-link :to="{ path: '/listing/' + listing.slug }">
                    <!-- <a :href="'/listing/' + listing.slug"> -->
                      <list-item :listing="listing"></list-item>
                    <!-- </a> -->
                  </router-link>
                <!-- </div>
                <div v-else>
                  <list-item :listing="listing"></list-item>
                </div> -->
                <div v-if="idx === 5">
                  <no-ssr>
                    <div id="broadstreet-in-list">
                      <broadstreet-zone zone-id="66356"></broadstreet-zone>
                    </div>
                    <div className="broadstreet-temp hide"></div>
                  </no-ssr>
                </div>
              </div>

              <div class="sponsored-hits">
                <div v-for="(listing, idx) in sponsoredDirectory" :key="listing.objectID">
                  <router-link v-if="idx === 2" :to="{ path: '/listing/' + listing.slug }">
                    <list-item :listing="listing"></list-item>
                  </router-link>
                </div>
              </div>
              <!-- <div class="dsr-hits--item" v-for="item in directory" :key="item.objectID" :item="item">
                <div>{{ item.title }}</div>
              </div> -->
            </div>
          </div>
          <paginate
            :value="page"
            :page-count="pageCount"
            :page-range="3"
            :margin-pages="2"
            :click-handler="changePage"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'">
          </paginate>

        </div>
      </div>
    </div>





  </div>

</template>

<script>
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
// import broadstreet from '../custom/broadstreet.js';





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
		broadstreetadsScript.setAttribute('src', 'https://cdn.broadstreetads.com/init-2.min.js');
		document.body.appendChild(broadstreetadsScript);
		const options = {
      networkId: 4933,
      "targets": {
        'url_segment': window.location.pathname.split(/[\/\-_]/g).filter(function (o) { return o ? o : false })
      },
    }

    window.onload = function() {
      const JSON_options = JSON.stringify(options);
      broadstreet.watch(options);
    }

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

      // if (to.path === from.path) {
        this.$store.dispatch('TOGGLE_LOADING', {loading: this.$store.state.loading})
        // let loader = window.document.getElementById('loader')
        // if (loader) {
        //   loader.className = 'loader active';
        // }
      // }


      this.$store.dispatch('FETCH_DIRECTORY', { route: this.$route }).then(() => {
        const options2 = {
          "targets": {
            'url_segment': window.location.pathname.split(/[\/\-_]/g).filter(function (o) { return o ? o : false })
          },
        }
        window.broadstreet.setOptions(options2);
        window.broadstreet.refreshAll();
        // if (to.path === from.path) {
          this.$store.dispatch('TOGGLE_LOADING', {loading: this.$store.state.loading})
          // let loader = window.document.getElementById('loader')
          // if (loader) {
          //   loader.className = 'loader';
          // }
        // }

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


</script>

<style lang="scss">
@import "~base";

.user-view {
  background-color: #fff;
  box-sizing: border-box;
  padding: 2em 3em
}

.user-view h1 {
  margin: 0;
  font-size: 1.5em
}

.user-view .meta {
  list-style-type: none;
  padding: 0
}

.user-view .label {
  display: inline-block;
  min-width: 4em
}

.user-view .about {
  margin: 1em 0
}

.user-view .links a {
  text-decoration: underline
}

.pagination > .active > a, .pagination > .active > a:focus, .pagination > .active > a:hover, .pagination > .active > span, .pagination > .active > span:focus, .pagination > .active > span:hover {

  background-color: #159b5d;
  border-color: #159b5d;

}
</style>

