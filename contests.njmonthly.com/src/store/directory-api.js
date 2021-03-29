import algoliasearch from 'algoliasearch';
import Utils from 'utils'


function getFilterStringForAlgolia(currentlySelectedFacets) {

  var hasLoopedOnce = false;

  var filterStringForAlgolia = '';

  for (var key in currentlySelectedFacets) {

    // skip loop if the property is from prototype
    if (!currentlySelectedFacets.hasOwnProperty(key)) continue;

    var facetsName = key;

    var facetNameAndValuesStringForAlgolia = '';

    // (categories:American OR categories:Philipino) AND (best_for:Breakfast)
    // Adding the AND at the beginning of the string removes the problem of an extra AND appearing at the end of the string, but it should only add it if it has looped once
    if (hasLoopedOnce) {
      // category=American,Italian&best_for=Brunch
      filterStringForAlgolia += ' AND ';
    }

    facetNameAndValuesStringForAlgolia += '(';

    var catsArray = currentlySelectedFacets[facetsName];

    for (var t = 0; t < catsArray.length; t++) {

      facetNameAndValuesStringForAlgolia += facetsName + ':' + '"' + catsArray[t] + '"';

      if (t < catsArray.length - 1) {
        facetNameAndValuesStringForAlgolia += ' OR ';
      } else {
        facetNameAndValuesStringForAlgolia += ')';
      }
    }
    // facetsName might equal categories or awards
    // currentlySelectedFacets[facetsName] = facetNameAndValuesStringForAlgolia;

    filterStringForAlgolia += facetNameAndValuesStringForAlgolia;

    hasLoopedOnce = true;
  }

  return filterStringForAlgolia;
}





function getFilterStringForAlgolia2(queryParams, state) {

  const query = Object.assign({}, queryParams);

  // const stringForAlgoliaFacets = "awards,category,sub_category,best_for,rating,section,location";
  
  // var facetsForAlgolia = stringForAlgoliaFacets.split(',');

  const facetsForAlgolia = state.searchOptions.facetsForAlgolia;

  var hasLoopedOnce = false;

  var filterStringForAlgolia = '';


  for (facetsName in facetsForAlgolia) {
  // for (var i = 0; i < facetsForAlgolia.length; i++) {

    // skip loop if the property is from prototype
    // if (!currentlySelectedFacets.hasOwnProperty(key)) continue;

    // var facetsName = facetsForAlgolia[i];
    var facetsName = facetsForAlgolia[facetsName];

    var facetNameAndValuesStringForAlgolia = '';
    
    var catsString = query[facetsName];

    console.log('catsString', catsString, query);
    
    if (query[facetsName] !== undefined) {

      // (categories:American OR categories:Philipino) AND (best_for:Breakfast)
      // Adding the AND at the beginning of the string removes the problem of an extra AND appearing at the end of the string, but it should only add it if it has looped once
      if (hasLoopedOnce) {
        // category=American,Italian&best_for=Brunch
        filterStringForAlgolia += ' AND ';
      }

      var catsArray = catsString.split(',');

      facetNameAndValuesStringForAlgolia += '(';

      for (var t = 0; t < catsArray.length; t++) {

        facetNameAndValuesStringForAlgolia += facetsName + ':' + '"' + catsArray[t] + '"';

        if (t < catsArray.length - 1) {
          facetNameAndValuesStringForAlgolia += ' OR ';
        } else {
          facetNameAndValuesStringForAlgolia += ')';
        }
      }

      // facetsName might equal categories or awards
      // currentlySelectedFacets[facetsName] = facetNameAndValuesStringForAlgolia;

      filterStringForAlgolia += facetNameAndValuesStringForAlgolia;

      hasLoopedOnce = true;

    }

  }

  return filterStringForAlgolia;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  console.log('shuffled array', array);

  return array;
}

export default function directoryAPI ({searchOptions}) {
  return new Promise(function(resolve, reject) {

    // const { store } = Utils.init()
    // const state = store ? store.state : {}

    // console.log('directoryAPI state', state);
    console.log('directoryAPI searchOptions', searchOptions);

    var client = algoliasearch('V0345RVG4D', '06c0143b0adfeea5a0d9d5d971ceeeae');

    // const searchOptions = state.searchOptions;

    // const query = to && to.query ? to.query : state.route.query;

    // console.log('directoryAPI query', query);

    // const params = state.route.params;
    // console.log('directory api params', 'to', to, 'to.params', to.params, params, state.route)
    
    // console.log('directory api state', query.lat);
    // It appears this functio has become dependant on
    // the URL query instead of just using the state.
    // Wouldn't it be more straigtforward to update the
    // state wherever it needs to be updated and then
    // run this function?


    const page = searchOptions.page ? searchOptions.page - 1 : 0;
    // var filterStringForRoute = getFilterStringForRoute(searchOptions.currentlySelectedFacets);

    // searchOptions.currentlySelectedFacets
    // let filterStringForAlgolia = getFilterStringForAlgolia2(query, state);

    let filterStringForAlgolia = getFilterStringForAlgolia(searchOptions.currentlySelectedFacets);

    // This is code for implementing SEO friendly URLs
    // if (filterStringForAlgolia !== '') {
    //   filterStringForAlgolia += ' AND (section:' + params.section + ')';
    // } else {
    //   filterStringForAlgolia = '(section:' + params.section + ')';
    // }

    // filterStringForAlgolia = filterStringForAlgolia !== '' ? filterStringForAlgolia + ' AND (ad_level:2)' : '(ad_level:2)';
    
    // searchOptions are set before the directoryAPI is run
    // searchOptions include the query, currentlySelectedFacets, and
    // the current page
    const currentlySelectedFacets = searchOptions.currentlySelectedFacets;

    // const filterStringForAlgolia = getFilterStringForAlgolia(currentlySelectedFacets);
    // console.log('filterStringForAlgolia2', filterStringForAlgolia2)

    // console.log('filterStringForAlgolia', filterStringForAlgolia, query);

    // const stringForAlgoliaFacets = "category,awards,sub_category";
    
    // var facetsForAlgolia = stringForAlgoliaFacets.split(',');

      // If the search_lat is 0, that means we have not called Algolia, yet, or
    // the coordinates could not be found in the URL
    // If we later ask the user for their location, then the coordinates
    // would be sent, and nextState.search_lat would not be 0. Therefore,
    // we would search around the LatLng which is the user's exact location
		// if (nextState.search_lat === 0) {
    //   directorySearchOptions.params.aroundLatLngViaIP = true;
    //   sponsoredSearchOptions.params.aroundLatLngViaIP = true;
    // } else {
    //   directorySearchOptions.params.aroundLatLng = nextState.search_lat + ', ' + nextState.search_lng;
    //   sponsoredSearchOptions.params.aroundLatLng = nextState.search_lat + ', ' + nextState.search_lng;
    // }
    
    // let facetsForAlgoliaArray = Object.keys(searchOptions.facetsForAlgolia);
    
      var directorySearchOptions = {
        indexName: 'directory',
        query: searchOptions.directoryQuery,
        getRankingInfo: true,
        params: {
          filters: filterStringForAlgolia,
          hitsPerPage: 20,
          facets: searchOptions.facetsForAlgolia,
          page: page,
          getRankingInfo: true,
        }
      };

      var filterStringForAlgoliaSponsored = filterStringForAlgolia !== '' ? filterStringForAlgolia + ' AND (ad_level:2)' : '(ad_level:2)';

      var sponsoredSearchOptions = {
        indexName: 'directory',
        query: searchOptions.directoryQuery,
        params: {
          filters: filterStringForAlgoliaSponsored,
          hitsPerPage: 10,
          getRankingInfo: true,
        }

      };

      // console.log('query.lat', query.lat);

      if (searchOptions.lat) {
        directorySearchOptions.params.aroundLatLng = searchOptions.lat + ', ' + searchOptions.lng;
        sponsoredSearchOptions.params.aroundLatLng = searchOptions.lat + ', ' + searchOptions.lng;
      } else {
        directorySearchOptions.params.aroundLatLngViaIP = true;
        sponsoredSearchOptions.params.aroundLatLngViaIP = true;
      }

      var allIndexesOptions = [directorySearchOptions, sponsoredSearchOptions];



      client.search(allIndexesOptions, function searchDone(err, content) {

        if (err) {
          console.error(err);
          return;
        }
        
        var basicDirectory = content.results[0];
        var sponsoredDirectory = Object.assign({}, content.results[1]);

        const orderedSponsoredListings = sponsoredDirectory.hits;
        const shuffledSponsoredListings = orderedSponsoredListings.length > 1 ? shuffle(orderedSponsoredListings) : orderedSponsoredListings;
        const sponsoredListings = shuffledSponsoredListings.splice(0, 3);

        sponsoredDirectory.hits = sponsoredListings;
        // nextState.pageCount = basicDirectory.nbPages;

        console.log('combined search content: ', basicDirectory.params, basicDirectory.parsedQuery);

        const directories = [basicDirectory, sponsoredDirectory];
        resolve(directories);

        // /* Basic Listings */

        // // If nextState.search_lat is 0, then in the code above, 
        // // we would have set searchOptions.aroundLatLngViaIP to be true
        // // So, the user's coordinates (based on their IP) address would be sent with the items
        // // We can safely use this data from Algolia
        // if (nextState.search_lat === 0) {
        //   var coordinates = basicListings.aroundLatLng;
        //   var coordinatesArray = coordinates.split(',');
        //   nextState.search_lat = coordinatesArray[0];
        //   nextState.search_lng = coordinatesArray[1];
        // }

        // nextState.section = section;
        // nextState.items = basicListings.hits;
        // nextState.facets = basicListings.facets;

        // // Do not update the facet that the user is currently
        // // selecting facets from. Only update the other facets.
        // var currentlyUpdatedFacet = nextState.currentlyUpdatedFacet;
        // // currentlySelectedFacetsIsEmpty helps when the user has
        // // deselected all the facets. Otherwise, the facet from which
        // // the last item was deselcted would not be updated. 
        // var currentlySelectedFacetsIsEmpty = this.isEmpty(nextState.currentlySelectedFacets);
        // if (currentlyUpdatedFacet && !currentlySelectedFacetsIsEmpty) {
        //   var currentlyUpdatedFacets = this.state.search.facets[currentlyUpdatedFacet];
        //   nextState.facets[currentlyUpdatedFacet] = currentlyUpdatedFacets;
        // }

        // nextState.pageCount = basicListings.nbPages;
        // nextState.nbHits = basicListings.nbHits;

        // // algoliaHitCount is mainly used by SearchBar > componentWillReceiveProps
        // // I had to know when the Algolia database had been called exactly one time
        // // that way I could update the places search bar with the city name just once
        // nextState.algoliaHitCount = this.state.search.algoliaHitCount + 1;

        // var currentPageForQuery = nextState.currentPage + 1;

        // var queryString = '?';
        // if (nextState.query !== '') {
        //   queryString += 'q=' + nextState.query + '&';
        // }

        // if (currentPageForQuery !== 1) {
        //   queryString += 'page=' + currentPageForQuery + '&';
        // }

        // // if (nextState.search_lat !== 0) {
        // //  queryString += 'lat=' + nextState.search_lat + '&lng=' + nextState.search_lng + '&';
        // // }
        // queryString += filterStringForRoute;

        // // Sponsored Items

        // var sponsoredItems = content.results[1].hits;

        // var shuffledItems = this.shuffle(sponsoredItems);

        // var limitedShuffledItems = shuffledItems.splice(0, 3);

        // nextState.sponsoredItems = limitedShuffledItems;

        // nextState.algoliaHitCount = this.state.search.algoliaHitCount + 1;

      })





    // var index = client.initIndex('directory');
    // index.search({
    //   query: 'a',
    //   hitsPerPage: 2,
    //   facets: ['category', 'rating', 'awards', 'best_for']
    //   },
    //   function searchDone(err, content) {
    //     if (err) return reject(err);
    //     const directory = content;
    //     resolve(directory);
    //     // console.log(content.hits);
    // });
  });
}
