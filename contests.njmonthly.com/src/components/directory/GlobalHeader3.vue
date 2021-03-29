

<template>
  <div>
    <header id="masthead" :class="['site-header search', headerClass]">

      <div class="global-search">

        <div class="inner">

          <div class="search-search-top clear-fix">

            <div class="n-logo">
              <logo></logo>
            </div>

            <div v-if="globalSearchOpen" class="header-search-icon">
              <div class="global-header-buttons">
                <span class="button cancel" v-on:click="toggleGlobalSearch">Close</span>
                <span class="button" v-on:click="handleSearchSubmit">Search</span>
              </div>
            </div> 

            <div v-else class="header-search-icon" v-on:click="toggleGlobalSearch">
              <search-icon></search-icon>
              <span class="search-icon-text">Search</span>
            </div>

          </div>

          <div :class="searchClass">

            <div class="search-all">
              <search>
              </search>
            </div>

            <div class="search-places">
              <search-places 
              :closeSuggestions="closeSuggestions"
              >
            </search-places>
            </div>

            <div class="search-button-container">
              <span class="search-button" v-on:click="handleSearchSubmit">Search</span>
            </div>

          </div>

        </div>

      </div>

    </header>

		<div class="static-menu">
			<div class="container">
				<div class="row menu-item-container">
					<!-- <div class="col-md-12"> -->
					<router-link class="menu-item" to="/search/restaurants">Restaurants</router-link>
					<router-link class="menu-item" to="/search/spas">Spas</router-link>
					<!-- </div> -->
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import Search from './Search.vue';
import SearchPlaces from './SearchPlaces.vue';
import Logo from './ui/Logo.vue';
import SearchIcon from './ui/SearchIcon.vue';
import algoliasearch from 'algoliasearch';
import Close from './ui/Close.vue';

export default {

  data () {
    return {
			globalSearchOpen: false,
      closeSuggestions: false,
      isSearching: false,
      placesFocused: false,
    }
  },
  components: {
		Search,
		'search-places': SearchPlaces,
		Close,
		Logo,
		'search-icon': SearchIcon,

  },
  computed: {
		headerClass: function() {
			return this.$route.query['hcategory.lvl0'] ? this.$route.query['hcategory.lvl0'] : '';
		},
		searchClass: function() {
			return this.globalSearchOpen ? "search-search-bar clear-fix mobile" : "search-search-bar clear-fix";
		}
    // directoryQuery: function() {
    //   return this.$store.state.searchOptions.directoryQuery
    // },
  },
  mounted() {

  },

  methods: {
		toggleGlobalSearch: function() {
			this.globalSearchOpen = !this.globalSearchOpen
		},

		handleSearchSubmit() {

			let query = Object.assign({}, this.$route.query);

			// I am saving the user's query and the
			// coordinates from the SearchPlaces input.
			// All I have to do is update the route params
			// with the query and push it
			query.q = this.$store.state.searchOptions.visibleDirectoryQuery;

			this.$store.state.searchOptions.facetsForAlgolia.map(function(facet) {
				if (query[facet]) {
					delete query[facet];
				}
			})

			// Always go to the first page when searching
			delete query['page'];
  
      // If there is no lat in the query, check the state
      // and use it if it exists.
      if (this.$store.state.searchOptions.lat) {
        query['lat'] = this.$store.state.searchOptions.lat;
        query['lng'] = this.$store.state.searchOptions.lng;
      }
      // The search submit always goes to the main search page, e.g.,
      // it does not go to the section.
			this.$router.push({ path: '/search', query: query});
			this.toggleSuggestions();
		},
    // stopSearching: function() {
    //   this.isSearching = false;
		// }
		toggleSuggestions() {
			this.closeSuggestions = !this.closeSuggestions;
		}
	},



}
</script>

<style lang="scss">
.n-logo {

    max-width: 70%;

}
#masthead {
  position: relative;
  padding: 5px 15px;
}

.site-header.search {
  text-align: center;
  background-color: #14c876;
  margin-top: 0px !important;
  background-color: #12995c;
  background-color: #40a836;
}

.global-search {
  padding: 6px 0px;
  padding-bottom: 1px;
  text-align: left;
}

.global-search .row {
  margin: 0;
}

.site-header.search .logo {
  padding-bottom: 0px;
  padding-right: 10px;
  float: left;
  width: 24px;
  margin-right: 10px;
  vertical-align: middle;
}

// .njmonthly-logo {
//   width: 300px;
// }

.header-search-icon {
padding-top: 5px;
position: absolute;
right: 20px;
top: 10px;
}

.header-search-icon svg {
  width: 40px;
  height: 40px;
  fill: white;
}

.search-icon-text {
  color: white;
  font-size: 12px;
  vertical-align: top;
}

.form-input {
  margin-bottom: 8px;
}

.search-input {
  position: relative;
}

.form-input input {
  width: 100%;
  padding-right: 16px;
  padding-left: 16px;
  line-height: 39px;
  height: 39px;
  border: 1px solid #CCC;
  border-radius: 0px;
  outline: none;
  font: inherit;
  -moz-appearance: none;
  appearance: none;
  -webkit-appearance: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.dsr-search-box--input {
  font-size: 16px !important;
}

.search__dropdown {
  position: absolute;
  background-color: #fff;
  z-index: 1;
  border: 1px solid #c6c6c6;
  border-top: none;
  -webkit-box-shadow: 5px 6px 10px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 6px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-top: 49px;
}

.search__dropdown .close {
  padding: 15px 20px;
}

.close {
  float: right;
  font-size: 21px;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: .2;
  filter: alpha(opacity=20);
}

.js-template-searchDropdownFacets {
  margin-bottom: 25px;
}

.search-dropdown__header {
  font-weight: bold;
  padding: 10px;
  padding-bottom: 0px;
  font-size: 19px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.search-facet-item {
  border-bottom: 1px solid #d4d4d4;
  padding: 10px;
}

.search-places {
  position: relative;
}

.algolia-places {
  margin-bottom: 8px;
  width: 100%;
}

#address-input {
  font-size: 16px;
}

.my-loc-bar:hover {
  cursor: pointer;
}

.my-loc-bar {
  position: absolute;
  width: 100%;
  background: white;
  border: 2px solid #f2f2f2;
  border-radius: 3px;
  padding: 10px 15px;
  margin-top: -6px;
  z-index: 10;
}

.display-none {
  display: none;
}

.search-all, 
.search-places, 
.search-button-container {
  margin-top: 9px;
}

.search-button-container {
  display: none;
}

.site-header.search .search-button {
  padding: 7.5px 22px;
  background: black;
}

.search-button:hover {
  cursor: pointer;
}

.search-button {
  display: block;
  background: #12995c;
  color: white;
  text-align: center;
  height: 40px;
  padding-top: 7.5px;
}

.static-menu {
  margin-bottom: 10px;
}
.menu-item-container {
  padding-right: 15px;
  padding-left: 15px;
}
.menu-item {
  padding: 10px 20px;
  border-left: 1px solid #ddd;
  color: black;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}

@media (min-width: 768px) {
  .header-search-icon {
      display: none;
  }
  .search-search-bar.clear-fix, .search-search-top.clear-fix {
      float: left;
  }
  .global-search {
      display: inline-block;
  }
  .global-search {
      width: 1000px;
  }
  .global-search {
      padding: 22px 15px;
      padding-bottom: 0px;
  }
  .njmonthly-logo {
      width: 250px;
  }
  .search-icon-text {
      font-size: 24px;
  }

  .search-all, 
  .search-places, 
  .search-button-container {
      float: left;
  }

  #suggestions {
      margin-top: 0px;
      z-index: 12;
  }
  .search-places .algolia-places {
      margin-left: 10px;
  }
  .search-search-bar .my-loc-bar {
      margin-left: 10px;
  }
  .search-button-container {
      display: initial;
  }
  .site-header.search .search-button {
      margin-left: 20px;
  }

}
</style>
