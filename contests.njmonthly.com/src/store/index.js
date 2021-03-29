import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)


// function getCurrentlySelectedFacets(facetsForAlgolia, searchParams) {

//   var currentlySelectedFacets = {};

//   for (var i = 0; i < facetsForAlgolia.length; i++) {

//     var facetsName = facetsForAlgolia[i];

//     if (searchParams.has(facetsName)) {

//       var catNamesArray = searchParams.get(facetsName).split(',');

//       // currentlySelectedFacets is an object of currently selected facets
//       currentlySelectedFacets[facetsName] = catNamesArray;
//     }
//   }

//   return currentlySelectedFacets;
// }



export default function createStore () {

  
  // var paramsString = window.location.search;
  // var searchParams = new URLSearchParams(paramsString);

  // var stringForAlgoliaFacets = 'awards,category,sub_category,best_for,rating,section,location';
  // var facetsForAlgolia = stringForAlgoliaFacets.split(',');
  // var currentlySelectedFacets = getCurrentlySelectedFacets(facetsForAlgolia, searchParams);
  var currentlySelectedFacets = [];
  return new Vuex.Store({
    state: {
      contests: null,
      is_loading: false,
      addonForm: null,
      userForm: null,
      simpleUserForm: null,
      entryForm: null,
      page: null,
      singleEntry: null,
      contest: null,
      contestApis:null,
      user: null,
      entriesData: null,
      loading: false,
      submitting: false,
      showLoginPopup: false,
      project: '',
      query: {},
      cookies: {},
      categoryDropdown: false,
      placesDropdown: false,
      selectedSingleCategories: {},
      selectSingleCategories: {},
      activeType: null,
      itemsPerPage: 20,
      items: {},
      users: {},
      directory: {},
      sponsoredDirectory: {},
      searchOptions: {
        currentlySelectedFacets: null,
        directoryQuery: '',
        visibleDirectoryQuery: '',
        facetsForAlgolia: [],
        latlng: null,
        lat: null,
        lng: null,
        mainFacet: 'hcategory.lvl0'
      },
      listing: null,
      currentlySelectedFacets: currentlySelectedFacets,
      lists: {
        top: [],
        new: [],
        show: [],
        ask: [],
        job: [],
      },
    },

    actions,
    mutations,
    getters,
  })
}
