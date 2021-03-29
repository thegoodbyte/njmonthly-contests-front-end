import createAPI from './create-api'
import algoliasearch from 'algoliasearch';
import directoryAPI from './directory-api';
import axios from 'axios';
import {API_URL, ENV_URL} from '../environment.js';

    // new webpack.ProvidePlugin({
    //   URLSearchParams: ['url', 'URLSearchParams'],
    // }),
/* eslint-disable arrow-body-style, no-empty-pattern */
export default {

  GET_CONTEST_PAGE({commit}, {uri}) {

    var promise1 = new Promise(function(resolve, reject){
      let newUri = uri + '/page';
      axios.get(newUri)
      .then(function(response) {
        console.log('ajax res', response.data);
        const data = response.data;
        resolve(data);
      })
      .catch(function (error) {
        reject(error);
        console.log('app error: ', error);
      })
    })

    return promise1.then(function(data) {
      console.log('actions/getContestPage res: ', data)
      let contest = data.contest;
      let page = data.page;
      commit('SET_CONTEST', {contest})
      commit('SET_PAGE', {page});
    })

  },




  GET_SINGLE_ENTRY_PAGE_DATA({commit}, uri) {

    let newUri = uri;
    let authHeaders = {};
    if (typeof window !== "undefined") {
      var laravelAuthToken = localStorage.getItem('laravelAuthToken');

      authHeaders = {
        headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
      };
      if (laravelAuthToken) {
        newUri = uri + '/logged-in';
      }
    }

    // /api/contests
    return axios.get(newUri, authHeaders)
    .then(response => {
      console.log('actions/getSingleEntryPageData res: ', response)
      // dispatch(getSingleEntryPageDataSuccess(response.data));
      commit('SET_SINGLE_ENTRY', response.data.entry);
      commit('SET_CONTEST', {contest: response.data.contest});
      commit('SET_ENTRY_FORM', {entryForm: response.data.entryForm});
    })
    .catch(function (error) {
      console.log('app error: ', error);
    })

  },  // export const getSingleEntryPageDataSuccess = (data) => {
    //   return {
    //     type: ContestActionTypes.GET_SINGLE_ENTRY_PAGE_DATA,
    //     entryForm: data.entryForm,
    //     singleEntry: data.entry,
    //     contest: data.contest
    //   }
    // },

  HANDLE_VOTE({commit}, entry) {

    if (document !== undefined) {
      document.body.style.cursor='wait';
    }

    // Update the database with the vote
    let votesObj = {
      votes: false,
    }

    var laravelAuthToken = localStorage.getItem('laravelAuthToken');

    let authHeaders = {
      headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
    };

    let uri = ENV_URL + '/items/update_vote/'+entry.id;

    return axios.patch(uri, votesObj, authHeaders).then((response) => {

      console.log('response', response);
      if (document !== undefined) {
        document.body.style.cursor='default';
      }

      // set the state, again, using the actual server's response
      // let entriesData = Object.assign([], this.state.entriesData);
      // let items = Object.assign([], entriesData.data);
      if (response.data.status === "deleted") {
        commit('HANDLE_VOTE', {vote: 0, entry});
        // dispatch(handleVoteSuccess(0, entry));
        // items[index].VotesCount = 0;
      } else if (response.data.status === "added") {
        commit('HANDLE_VOTE', {vote: 1, entry});
        // dispatch(handleVoteSuccess(1, entry));
        // items[index].VotesCount = 1;
      } else {
        commit('HANDLE_VOTE', {vote: 0, entry});
        // dispatch(handleVoteSuccess(0, entry));
        // items[index].VotesCount = 0;
      }

      // entriesData.data = items;



      const vote_alert = document.getElementById('vote-alert');
      vote_alert.innerHTML = '<div class="text">' + response.data.message + '</div>';
      vote_alert.style.opacity = 1;
      setTimeout(function() {
        vote_alert.style.opacity = 0;
      }, 2500);



    }); //axios.patch

  },
  SUPER_ENTRIES_ENTRY_UPDATE({commit}, {uri}) {
    return axios.get(uri)
    .then((response) => {
      console.log('response', response);
      let entryForm = response.data.entryForm;
      let entry = response.data.entry;
      // let selectSingleCategories = response.data.selectSingleCategories;

      // // Find the currently selected category
      // let selectedSingleCategories = selectSingleCategories.find((category) => {
      //   console.log('selectedSingleCategories', category, category.value);
      //   return category.value === entryForm.type;
      // });

      // Populate entryForm with entry data
      entryForm.fields.map(function(field, index) {

        if (field.type === 'field') {
          field.value = entry[field.name];
        } else if (field.type === 'meta' && entry.meta[field.name]) {
          field.value = entry.meta[field.name].value;
        } else if (field.type === 'image') {
          field.image_id = entry.media_id;
        }

      })




      commit('SET_ENTRY_FORM', { entryForm });
      commit('SET_ENTRY', { entry });
      // commit('SET_STATE', {key: 'selectedSingleCategories', data: selectedSingleCategories});
      // commit('SET_STATE', {key: 'selectSingleCategories', data: selectSingleCategories});

    })
    .catch(function (error) {
      console.log('app error: ', error);
    })
  },

  SUPER_CONTESTS_CREATE({commit}, {uri}) {
    return axios.get(uri)
    .then((response) => {

      let entryForm = response.data.entryForm;

      commit('SET_ENTRY_FORM', { entryForm });

    })
    .catch(function (error) {
      console.log('app error: ', error);
    })
  },

  GET_USER({commit}) {
    let uri = ENV_URL + '/getUser';
    if (typeof window !== 'undefined') {
      var laravelAuthToken = localStorage.getItem('laravelAuthToken');
      let authHeaders = {
        headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
      };

      axios.get(uri, authHeaders)
      .then((response) => {
        const user = response.data;
        commit('SET_USER', user)
      });
    }

  },

  SET_CONTEST: ({commit}, { contest }) => {

    commit('SET_CONTEST', { contest });

  },

  SET_ADDON_FORM: ({commit}, { addonForm }) => {

    commit('SET_ADDON_FORM', { addonForm });

  },

  SET_USER_FORM: ({commit}, { userForm }) => {

    commit('SET_USER_FORM', { userForm });

  },

  LOGOUT_USER({commit}) {
    let uri = ENV_URL + '/r_logout';
    if (typeof window !== 'undefined') {
      var laravelAuthToken = localStorage.getItem('laravelAuthToken');
      let authHeaders = {
        headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
      };

      localStorage.removeItem('laravelAuthToken');

      axios.get(uri, authHeaders)
      .then((response) => {
        console.log('logout res: ', response);

        const user = null;
        commit('SET_USER', null)
      });
    }

  },

  POST_LOGIN({commit}, {login_info}) {

    commit('LOADING', true);

    let uri = ENV_URL + '/post_login';

    return axios.post(uri, login_info).then((response) => {
      console.log('login res: ', response, login_info);
      // this.$store.dispatch('LOADING', true);

      // this.$store.dispatch('LOADING', false);
      // this.$store.dispatch('TOGGLE_LOGIN_POPUP');

      commit('LOADING', false);

      if (response.data == false) {
          alert('Your email or password was incorrect. Please try, again.');
          return;
      } else {
        if (typeof window !== "undefined") {
          localStorage.setItem('laravelAuthToken', response.data.laravelAuthToken);
        }

        const user = response.data.user;
        commit('SET_USER', user);

        commit('TOGGLE_LOGIN_POPUP');

      }

    });
  },

  TOGGLE_LOGIN_POPUP({commit}) {
    console.log('TOGGLE_LOGIN_POPUP')
    commit('TOGGLE_LOGIN_POPUP');
  },

  GET_SIMPLE_USER_FORM: ({commit}, {uri}) => {

    var promise1 = new Promise(function(resolve, reject){

      axios.get(uri)
      .then(function(response) {
        console.log('ajax res', response.data);
        const data = response.data;
        resolve(data);
      })

    })


    return promise1.then(function(data) {
      let simpleUserForm = data;
      commit('SET_SIMPLE_USER_FORM', { simpleUserForm });
    })

  },

  CONTESTS: ({commit}, {uri}) => {

    var promise1 = new Promise(function(resolve, reject){

      axios.get(uri)
      .then(function(response) {
        console.log('ajax res', response.data);
        const data = response.data;
        resolve(data);
      })

    })






    return promise1.then(function(data) {
      let contests = data;
      commit('SET_CONTESTS', { contests });
    })

  },
  CONTESTS_CONTEST_ENTRIES: ({commit}, {uri, search}) => {

    const isClient = typeof window !== 'undefined';

    let authHeaders = {};

    let newUri = uri + search;

    if (isClient) {

      var laravelAuthToken = localStorage.getItem('laravelAuthToken');

      if (laravelAuthToken) {

        newUri = uri + '/logged-in' + search;

        authHeaders = {
          headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
        };

      }

    }

    var promise1 = new Promise(function(resolve, reject){

      axios.get(newUri, authHeaders)
      .then(function(response) {
        console.log('ajax res', response.data);
        const data = response.data;
        resolve(data);
      })

    })


    return promise1.then(function(data) {
      let entriesData = data.entriesData;
      let page = data.page;
      let contest = data.contest;
      let contestApis = data.contestApis;
      console.log('CONTESTS_CONTEST_ENTRIES resolved data', data);
      commit('SET_ENTRIES_DATA', { entriesData });
      commit('SET_PAGE', { page });
      commit('SET_CONTEST', { contest });
      // commit('SET_CONTEST_APIS', { contestApis });
    })

  },
  CONTESTS_CONTEST_ENTRIES_ENTRY_COMPLETE: ({ commit, dispatch}, { uri }) => {

    // const isClient = typeof window !== 'undefined';

    // let authHeaders = {};

    // let newUri = uri;

    // if (isClient) {

    //   var laravelAuthToken = localStorage.getItem('laravelAuthToken');

    //   if (laravelAuthToken) {

    //     newUri = uri + '/logged-in';

    //     authHeaders = {
    //       headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
    //     };

    //   }

    // }

    console.log('CONTESTS_CONTEST_ENTRIES_ENTRY_COMPLETE', uri);
    var promise1 = new Promise(function(resolve, reject){

      axios.get(uri)
      .then(function(response) {
        console.log('ajax res', response.data);
        const data = response.data;
        resolve(data);
      })

    })

    return promise1.then(function(data) {
      let addonForm = data.addonForm;
      let userForm = data.userForm;
      let page = data.page;
      let contest = data.contest;
      let contestApis = data.contestApis;


      // let user = data.user;
      // console.log('resolved data', data);
      commit('SET_ADDON_FORM', { addonForm });
      commit('SET_USER_FORM', { userForm });
      commit('SET_PAGE', { page });
      commit('SET_CONTEST', { contest });
      commit('SET_CONTEST_APIS', { contestApis });

      // commit('SET_USER', user);
    })
  },
  CONTESTS_CONTEST_ENTRIES_CREATE: ({ commit, dispatch}, { uri }) => {
    console.log('CONTESTS_CONTEST_ENTRIES_ENTRY_COMPLETE', uri);
    var promise1 = new Promise(function(resolve, reject){

      axios.get(uri)
      .then(function(response) {
        console.log('ajax res', response.data);
        const data = response.data;
        resolve(data);
      })

    })


    return promise1.then(function(data) {
      let entryForm = data.entryForm;
      let userForm = data.userForm;
      let page = data.page;
      let contest = data.contest;
      let addonForm = data.addonForm;
      let contestApis = data.contestApis;

      // console.log('resolved data', data);
      commit('SET_ENTRY_FORM', { entryForm });
      commit('SET_PAGE', { page });
      commit('SET_CONTEST', { contest });
      commit('SET_CONTEST_APIS', { contestApis });

      // The userForm and addonForm are specific to the
      // complete page, but setting them here makes the
      // user experience much more smooth.
      commit('SET_USER_FORM', { userForm });
      commit('SET_ADDON_FORM', { addonForm });
    })
  },
  ENTRY_FORM: ({ commit, dispatch}, { entryForm }) => {
    commit('SET_ENTRY_FORM', { entryForm });
  },
  FETCH_DIRECTORY: ({ commit, state }, { route }) => {

    const query = route.query;

    // If there is a category set in the param, I have to also
    // add it to the currentlySelectedFacets object, so that Algolia
    // correctly filters.
    const params = route.params;

    const hasParam = Object.keys(route.params).length > 0;

    // Get the settings for this directory search from the query
    // console.log('FETCH_DIRECTORY ACTION', route, 'state', state, 'params', params);

    let searchOptions = Object.assign({}, state.searchOptions);

    // facetsForAlgolia and facetsToShow will eventually come from database
    var facetsForAlgolia = ['category','awards','sub_category', 'section', 'hawards.lvl0', 'hawards.lvl1', 'hcategory.lvl0', 'hcategory.lvl1', 'hcategory.lvl2', 'price_range', 'rating'];

    searchOptions.facetsForAlgolia = facetsForAlgolia;

    let facetsToShow = {};
    facetsToShow.restaurants = {
      'hcategory' : 'Category',
      // 'hawards.lvl0' : 'Awards',
    }
    facetsToShow.select = {
      'category' : 'Category',
      'sub_category' : 'Sub Category',
    }
    facetsToShow.spas = {
      'category' : 'Category',
      'awards' : 'Awards',
    }

    facetsToShow.default = {
      'category' : 'Category',
      'hawards.lvl0' : 'Awards',
    }

    searchOptions.facetsToShow = facetsToShow;

    var facetsForAlgolia = searchOptions.facetsForAlgolia;

    let currentlySelectedFacets = {};

    // currentlySelectedFacets[facet.taxonomy] = [facet.category];
    // Loop through all the possible facets (hcategory.lvl0, hawards.lvl0, etc)
    // and use the values from the query to update the currentlySelectedFaets
    facetsForAlgolia.map(function(facet) {

      if (query[facet]) {

        const categories = query[facet].split(',');
        console.log('query facet', query[facet], facet, categories)
        categories.map(function(category) {
          currentlySelectedFacets[facet] = [category];
        })
      }


    })

    // If a parameter is present, use it as the main category filter
    // for Algolia
    // state.searchOptions.mainFacet is hcategory.lvl0
    if (hasParam) {
      currentlySelectedFacets[state.searchOptions.mainFacet] = [params.cat];
    }

    searchOptions.currentlySelectedFacets = currentlySelectedFacets;

    if (query['page']) {
      searchOptions.page = query['page'];
    } else {
      searchOptions.page = 1;
    }

    // If there is a search in the query, use it, else, reset the
    // query params
    if (query['q']) {
      searchOptions.directoryQuery = query['q'];
    } else {
      searchOptions.directoryQuery = '';
    }

    // If there is a lat in the query, use it, else use what's in the
    // search options. Else, if there's nothing in the searchOptions,
    // use Morristown's coordinates
    if (query['lat']) {
      searchOptions.lat = query['lat'];
      searchOptions.lng = query['lng'];
    } else if (searchOptions.lat) {
      // Don't overwrite it
    } else {
      searchOptions.lat = '40.797';
      searchOptions.lng = '-74.4809';
    }


    commit('SET_DIRECTORY_SEARCH_OPTIONS', { searchOptions });


    // if (to === undefined && Object.keys(state.route.query).length === 0) {
    //   to = state.route.from;
    // }

    return directoryAPI({searchOptions}).then(directory => commit('SET_DIRECTORY', { directory }));
    // return createAPI({
    //   url: `user/adamfaliq.json`,
    //   retData: true,
    // }).then(directory => commit('SET_DIRECTORY', { directory }))
  },



  FETCH_LISTING: ({commit, state}, { slug }) => {
    var promise1 = new Promise(function(resolve, reject){

      axios.get(API_URL + '/get_item_from_wp_js/' + slug)
      .then(function(response) {
        console.log('ajax res', response.data.json_object);
        const listing = response.data.json_object;
        resolve(listing);
      })

    })




    return promise1.then(function(data) {
      // console.log('resolved data', data);
      commit('SET_LISTING', { data });
    })
  },

  FETCH_DIRECTORY_PAGE_DATA: ({commit, state}, { slug }) => {
    var promise1 = new Promise(function(resolve, reject){

      axios.get(API_URL + '/get_item_from_wp_js/' + slug)
      .then(function(response) {
        console.log('ajax res', response.data.json_object);
        const listing = JSON.parse(response.data.json_object);
        resolve(listing);
      })

    })

    return promise1.then(function(data) {
      // console.log('resolved data', data);
      commit('SET_LISTING', { data });
    })
  },

  LOADING: ({commit}, loading) => {
    commit('LOADING', loading);
  },
  SET_STATE({commit}, {key, data}) {
    commit('SET_STATE', {key: key, data: data});
  }
}
