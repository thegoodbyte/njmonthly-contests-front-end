<template>
  <div>


    <form class='form-input' autocomplete="off" v-on:submit="handleSearchSubmit" action=".">
      <div class="search-input">
        <div class="dsr-search-box" id="search-box-area">
          <div class="search-input">

            <input 
              id="search-box-input" 
              class="dsr-search-box--input" 
              type="search" 
              v-model="visibleDirectoryQuery" 
              v-on:input="handleInputSearch"  
              v-on:focus="handleSearchInputFocus" 
              placeholder="I'm Looking For..." 
              autocomplete="off" 
              autocorrect="off" 
              autocapitalize="off" 
              v-on:blur="closeIsSearching"
            />
            <div v-if="visibleDirectoryQuery" class="clear-search" v-on:click="clearSearch"><close></close></div>
          </div>

          <div v-if="isSearching">
            <div class="search__dropdown" id="suggestions">
              
              <div class="close" v-on:click="stopSearching"><close></close></div>
              <!-- <div class="close" v-on:click="toggleIsSearching"><Close /></div> -->

              <!-- Facets -->
              <div v-if="hasRetrievedFacets">
                <div class="js-template-searchDropdownFacets">
                  <h5 class="search-dropdown__header">Categories</h5>
                  <div v-for="facet in facets"
              v-on:click="handleSubFacetItemClickFromDropDown(facet)"
              class='search-facet-item' :key="facet.title">
                    <span class="search-facet-item-value" v-html="facet.name"></span> 
                    <!-- <span class='search-facet-item-key'>{{ facet.taxonomy }}</span> -->
                  </div>
                </div>
              </div>

              <!-- Listings -->
              <div v-if="hasRetrievedItems">
                <div class="js-template-searchDropdownListings">
                  <h5 class="search-dropdown__header">Listings</h5>
                <div v-for="item in items"
              v-on:click="handleSuggestionClickFromDropDown(item.title)"
              class='search-facet-item' :key="item.title">
                    <span class="search-facet-item-value" v-html="item.title"></span>
                  </div>
                </div>
              </div>

              <!-- No Results -->
              <div v-if="noResults">
                <div class="js-template-searchDropdownFacets">
                  <p>Oops! Your did not return any search results. Try again!</p>
                </div>
              </div>
            </div>
          </div>
        </div><!-- #search-box-area -->
      </div><!-- .search-input -->
    </form>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch';
import Close from './ui/Close.vue';
export default {
  data () {
    return {
      // directoryQuery: this.$store.state.searchOptions.directoryQuery,
      items: [],
      facets: [],
      isSearching: false
    }
  },
  components: {
    Close,
  },
  // props: ['handleSearchSubmit'],
  computed: {
    visibleDirectoryQuery: {
      get: function() {
        console.log('getting visibleDirectoryQuery', this.$store.state.searchOptions.visibleDirectoryQuery);
        return this.$store.state.searchOptions.visibleDirectoryQuery;
      },
      set: function(newValue) {

        
        const searchOptions = Object.assign({}, this.$store.state.searchOptions);

        console.log('setting visibleDirectoryQuery searchOptions', searchOptions);

        searchOptions.visibleDirectoryQuery = newValue;

        // Update the state with the new search query (used later when the actual search is made)
        this.$store.commit('SET_DIRECTORY_SEARCH_OPTIONS', {searchOptions});
      }
      
      // return this.$route.query.q ? this.$route.query.q : '';
    },
    noResults() {
      return !this.hasRetrievedFacets && !this.hasRetrievedItems;
    },
    hasRetrievedFacets() {
      return Object.keys(this.facets).length > 0;
    },
    hasRetrievedItems() {
      return this.items.length > 0;
    }
  },
  mounted() {
    // If the user clicks outside of the search-box-area, close the suggestions
    let searchBoxArea = document.getElementById("search-box-area");
    
    searchBoxArea.addEventListener("click", function(e){
      e.stopPropagation();// this will stop propagation of this event to upper level
    });

    let that = this;
    document.body.addEventListener("click", 
      function(e) {
        that.isSearching = false;
      }
    );
  },

  methods: {
    // This is used as a backup to close the dropdown.
    // Clicking from one input into another does not 
    // cause the normal ClickOutside function to run
    closeIsSearching() {
      const that = this;
      setTimeout(function() {
        console.log('closeIsSearching2', that.isSearching)
        that.isSearching = false;
      }, 100);
      
    },
    handleSearchSubmit: function(e) {
      e.preventDefault();
      this.isSearching = false;
      // parent is GlobalHeader
      this.$parent.handleSearchSubmit();
    },
    clearSearch: function(e) {

      e.preventDefault();
      const searchOptions = Object.assign({}, this.$store.state.searchOptions);
      searchOptions.visibleDirectoryQuery = '';
      this.$store.commit('SET_DIRECTORY_SEARCH_OPTIONS', {searchOptions});

      let query = Object.assign({}, this.$route.query);
      delete query['page'];
      delete query['q'];
      this.$router.push({ path: '/search', query: query});

      this.$store.commit('SET_DIRECTORY_SEARCH_OPTIONS', {searchOptions});

      this.isSearching = false;
      const clearingSearch = true;
      this.$parent.toggleSuggestions();

    },
    handleSubFacetItemClickFromDropDown: function(facet) {

      // Remove all facets from the query
      const searchOptions = Object.assign({}, this.$store.state.searchOptions);

      console.log('handleSubFacetItemClickFromDropDown currentlySelectedFacets', searchOptions.currentlySelectedFacets)

      let currentlySelectedFacets = {};

      currentlySelectedFacets[facet.taxonomy] = [facet.category];

      // // Don't reset the selected section if there is one
      // // Also (this is specific for the dropdown menu items),
      // // don't set this if the user is selecting a section
      // if (searchOptions.currentlySelectedFacets.section !== undefined && taxonomy !== 'section') {
      //   currentlySelectedFacets['section'] = [searchOptions.currentlySelectedFacets.section[0]];
      // }

      // searchOptions.currentlySelectedFacets = currentlySelectedFacets;

      
      // Update the state (searchOptions.currentlySelectedFacets) with
      // the facet that was selected. directoryAPI() will use this to
      // construct the filterStringForAlgolia
      // this.$store.commit('SET_DIRECTORY_SEARCH_OPTIONS', {searchOptions});
      
      // Remove all the filters from the route query and add the new ones
      // If I update the route query here, then I will have access to the
      // new route in directoryAPI; therefore, I do not need to also 
      // save the currentlySelectedFacets to the state, yet.
      let query = Object.assign({}, this.$route.query);
      // const facetsForAlgolia = this.$store.state.searchOptions.facetsForAlgolia;
      // // Loop through all the facets and remove any in the
      // // route query.
      // for (var i = 0; i < facetsForAlgolia.length; i++) {
      // // for (facetCategorySlug in facetsForAlgolia) {
      //   // (string) category
      //   // var facetCategorySlug = facetsForAlgolia[facetCategorySlug];
      //   var facetCategorySlug = facetsForAlgolia[i];
      //   // Remove all the facets from the route query if they exist.
      //   if (query[facetCategorySlug] !== undefined) {

      //     delete query[facetCategorySlug];

      //   }

      // }

			this.$store.state.searchOptions.facetsForAlgolia.map(function(facet) {
				if (query[facet]) {
					delete query[facet];
				}
			})

      // Add the facetCategory and section fo that
      // facetCategory that was selected.

      const level = parseInt(facet.level) + 1;

      console.log('ldevel', level);
      for (var i = 0; i < level; i++) {
        // The first time for 0, hcategory.lvl0 = Restaurants
        // hcategory.lvl1 = Restaurants > American
        const currentLevel = i;
        const facetKey = facet.taxonomy + '.lvl' + currentLevel;
        
        const parts = facet.title.split(' > ');

        console.log('facetKey', facetKey, parts);

        // parts[0] = Restaurant
        let part = '';
        if (i === 0) {
          // part = parts[0];
        } else if (i === 1) {
          part = parts[0] + ' > ' + parts[1];
          query[facetKey] = part;
        } else if (i === 2) {
          part = parts[0] + ' > ' + parts[1] + ' > ' + parts[2];
          query[facetKey] = part;
        }
        
      }

      console.log('query', query);
      // query[facet.taxonomy] = facet.title;
      // If the facet has a section (all but the sections do),
      // also set that.
      
      // Enableing the code below disables the ability
      // to go to categories in other sections, so I've disabled it.
      // if (facet.section) {
      //   query['section'] = facet.section[0];
      // }

      // Remove the page to go to the first page
      if (query['page'] !== undefined) {
        delete query['page'];
      }

      if (query['q'] !== undefined) {
        delete query['q'];
      }

      // Close the suggestions box
      this.isSearching = false;

      searchOptions.visibleDirectoryQuery = facet.name;

      this.$store.commit('SET_DIRECTORY_SEARCH_OPTIONS', {searchOptions});

      const parts = facet.title.split(' > ');
      
      this.$router.push({ path: '/search' + '/' + parts[0].toLowerCase(), query: query})

    },

    handleSuggestionClickFromDropDown: function(query) {

      const searchOptions = Object.assign({}, this.$store.state.searchOptions);

      searchOptions.visibleDirectoryQuery = query;

      // Update the state with the new search query (used later when the actual search is made)
      this.$store.commit('SET_DIRECTORY_SEARCH_OPTIONS', {searchOptions});

      // Close the suggestions box
      this.isSearching = false;
      // $parent is GlobalHeader
      this.$parent.handleSearchSubmit();

    },

    handleInputSearch: function(e) {

      const query = e.target.value;

      this.handleSearch(query);

    },

    handleSearch: function(query) {
     
      const searchOptions = Object.assign({}, this.$store.state.searchOptions);

      searchOptions.visibleDirectoryQuery = query;

      // Update the state with the new search query (used later when the actual search is made)
      this.$store.commit('SET_DIRECTORY_SEARCH_OPTIONS', {searchOptions});

      // if the query is blank, don't search
      if (query === '') {
        this.isSearching = false;
        // this.query = '';
        this.facets = {};
        this.items = [];
        return;
      }

      var client = algoliasearch('V0345RVG4D', '06c0143b0adfeea5a0d9d5d971ceeeae');
          
      let directorySearchOptions = {
        indexName: 'directory',
        query: query,
        params: {
          hitsPerPage: 5,
        }
      }

      let categorySearchOptions = {
        indexName: 'directory_facets',
        query: query,
        params: {
          hitsPerPage: 5,
        }
      }

      const allIndexesOptions = [directorySearchOptions, categorySearchOptions];
      
      console.log('allIndexesOptions', allIndexesOptions);
      client.search(allIndexesOptions,

        function searchDone(err, content) {

          if (err) {
            console.error(err);
            return;
          }
          console.log('content.hits: ', content.results)
          const listings = content.results[0].hits;
          const categories = content.results[1].hits;

          console.log('categories', categories);
          const combinedHits = listings.concat(categories);
          
          this.items = listings;
          this.facets = categories;

        }.bind(this)

      );

      this.isSearching = true;

      // The Search button needs the query text, so
      // I need to make the query available to this component and the search bar
      // this.props.handleSearch(query);
    },

    handleSearchInputFocus() {
      // Only do this inital search for the sections if
      // the user hasn't searched for anything or if they've
      // cleared their search
      if (this.visibleDirectoryQuery === '') {
        var client = algoliasearch('V0345RVG4D', '06c0143b0adfeea5a0d9d5d971ceeeae');

        var index = client.initIndex('directory_facets');
        const options = {
          query: '',
          filters: 'taxonomy:hcategory AND level = 0',
        }


        const that = this;

        index.search(options, function(err, content) {
          if (err) throw err;
          that.facets = content.hits;
          that.isSearching = true;
        });
      } else {
        this.isSearching = true;
      }

    },

    stopSearching: function() {
      this.isSearching = false;
    }
  },


}
</script>

<style lang="scss">

</style>
