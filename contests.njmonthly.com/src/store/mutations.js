import Vue from 'vue'

export default {

  HANDLE_VOTE(state, {vote, entry}) {
    // const newState = JSON.parse(JSON.stringify(state));
    if (state.entriesData) {
      const index = state.entriesData.data.findIndex(x => x.id === entry.id)
      state.entriesData.data[index].VotesCount = vote;
    } else {
      state.singleEntry.VotesCount = vote;
    }
  },
  SET_SIMPLE_USER_FORM(state, {simpleUserForm}) {
    state.simpleUserForm = simpleUserForm;
  },
  SET_USER(state, user) {
    console.log('SET_USER', user);
    state.user = user
  },
  LOGIN(state, user) {
    state.user = user
  },
  TOGGLE_LOGIN_POPUP(state) {
    state.showLoginPopup = !state.showLoginPopup;
  },
  SET_CONTEST_APIS: (state, {contestApis}) => {
    console.log('SET_CONTEST_APIS', contestApis);
    state.contestApis = contestApis;
  },

  SET_CONTESTS: (state, {contests}) => {
    console.log('SET_CONTESTS', contests);
    state.contests = contests;
  },

  SET_ENTRIES_DATA: (state, {entriesData}) => {
    console.log('SET_ENTRIES_DATA', entriesData);
    state.entriesData = entriesData;
  },
  SET_SINGLE_ENTRY: (state, singleEntry) => {
    console.log('SET_SINGLE_ENTRY', singleEntry);
    state.singleEntry = singleEntry;
  },
  SET_ENTRY_FORM: (state, {entryForm}) => {
    console.log('SET_ENTRY_FORM', entryForm, state.user);
    state.entryForm = entryForm;
  },
  SET_ENTRY: (state, {entry}) => {
    console.log('SET_ENTRY', entry);
    state.entry = entry;
  },
  SET_ADDON_FORM: (state, {addonForm}) => {
    console.log('SET_ADDON_FORM', addonForm);
    state.addonForm = addonForm;
  },
  SET_USER_FORM: (state, {userForm}) => {
    console.log('SET_USER_FORM', userForm);
    state.userForm = userForm;
  },
  SET_PAGE: (state, {page}) => {
    console.log('SET_PAGE', page);
    state.page = page;
  },
  SET_CONTEST: (state, {contest}) => {
    console.log('SET_CONTEST', contest);
    // If we are changing contests, 
    // do some data cleanup (reset entryForm)
    if (state.contest && (state.contest.id !== contest.id)) {
      state.entryForm = null;
    }
    state.contest = contest;
  },
  CATEGORY_DROPDOWN: (state, display) => {
    console.log('cat dropdown', display);
    state.placesDropdown = display;
  },
  PLACES_DROPDOWN: (state, display) => {
    state.categoryDropdown = display;
  },
  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },

  SET_LIST: (state, { type, ids }) => {
    state.lists[type] = ids
  },

  SET_ITEMS: (state, { items }) => {
    items.forEach((item) => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    })
  },

  SET_DIRECTORY: (state, { directory }) => {
    console.log('SET_DIRECTORY', directory)
    const basicDirectory = directory[0];
    const sponsoredDirectory = directory[1];

    Vue.set(state, 'directory', basicDirectory || false) /* false means user not found */
    Vue.set(state, 'sponsoredDirectory', sponsoredDirectory);
    // console.log(state);
    
  },

  SET_DIRECTORY_METADATA: (state, { data }) => {
    Vue.set(state, 'dirMetaData', data);
    console.log('set dir meta')
  },

  SET_DIRECTORY_SEARCH_OPTIONS: (state, { searchOptions }) => {
    console.log('SET_DIRECTORY_SEARCH_OPTIONS called', searchOptions);
    Vue.set(state, 'searchOptions', searchOptions);

    console.log('SET_DIRECTORY_SEARCH_OPTIONS finished');
    // Vue.set(state, 'directoryQuery', )

    
    // console.log('SET_DIRECTORY_SEARCH_OPTIONS', state.searchOptions);
  },
  SET_LISTING: (state, {data}) => {
    Vue.set(state, 'listing', data);
  },
  SET_DIRECTORY_PAGE_DATA: (state, {data}) => {
    Vue.set(state, 'directoryPageData', data);
  },

  LOADING: (state, loading) => {
    Vue.set(state, 'loading', loading);
  },
  SET_STATE(state, {key, data}) {
    state[key] = data;
  }
  // SET_LATLNG: (state, { latlng }) => {
  //   Vue.set(state, 'latlng', )
  // },
}
