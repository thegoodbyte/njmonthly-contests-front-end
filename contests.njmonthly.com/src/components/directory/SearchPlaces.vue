<template>
  <div id="my-location-bar">
    <input 
      type="text" 
      id="address-input" 
      placeholder="Location (City or Zip)" 
      v-on:focus="displayMyLocationSearch" 
      v-on:blur="closePlacesDropdown"
    />
    <div v-if="placesDropdownVis" v-on:click="getCoordinatesFromUser" class="my-loc-bar">
        <span>Current Location </span>
        <!-- <span class="location-arrow" title="Search near me">Me</span> -->
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      places: null,
      placesDropdownVis: false
    }
  },

  props: ['closeSuggestions'],

  mounted() {

    // If the user clicks outside of the my-location-bar, close the suggestions
    let searchBoxArea = document.getElementById("my-location-bar");
    
    searchBoxArea.addEventListener("click", function(e){
      console.log('stopping places propagation')
      e.stopPropagation();// this will stop propagation of this event to upper level
    });

    let that = this;
    document.body.addEventListener("click", 
      function(e) {
        that.placesDropdownVis = false;
        console.log('click outside of places')
      }
    );


    this.places = require('places.js');

    this.placesAutocomplete = this.places({
      container: document.querySelector('#address-input'),
      // type: 'city',
      useDeviceLocation: false,
      aroundLatLng: "39.833851,-74.871826",
      // aroundLatLngViaIP: true,
      countries: ['us'], 

    });

    this.placesAutocomplete.on('suggestions', (e) => this.handleOnSuggestions(e));
    this.placesAutocomplete.on('change', (e) => this.handleOnChange(e));
  },
  computed: {
  },

  methods: {
    closePlacesDropdown() {
      const that = this;
      setTimeout(function() {
        that.placesDropdownVis = false;
      }, 100);
    },
    getCoordinatesFromUser() {
      console.log('getting coordinates from user');

      this.placesDropdownVis = false;

      const that = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.callback,

            // Optional error callback
            function(error){
              // alert(error.code);
              alert('Error ' + error.code + ': ' + error.message + '. Please try refreshing the page.');

                /* 
                In the error object is stored the reason for the failed attempt:

                error = {
                    code - Error code representing the type of error 
                            1 - PERMISSION_DENIED
                            2 - POSITION_UNAVAILABLE
                            3 - TIMEOUT

                    message - Details about the error in human-readable format.
                }
                */

            }
        );
      } 
      else {
        return false;
      }
    },
    callback(position) {
      // alert ('Your latitude: ' + position.coords.latitude);
      var that = this;
      // Success callback

      const searchOptions = Object.assign({}, this.$store.state.searchOptions);



        let query = Object.assign({}, this.$route.query);
        query.lat = position.coords.latitude;
        query.lng = position.coords.longitude;
        this.$router.push({ path: this.$route.path, query: query})


      // // Only run updateAll if we are on the search page, else just update the state
      // // with the new lattitude and longitude
      // let pathname = window.location.pathname;
      // let pathname_clean = pathname.substring(1);
      // let pathname_array = pathname_clean.split('/');
      // let first_pathname = pathname_array[0];
      // console.log('first_pathname', first_pathname, pathname_array, this.$route);
      // if (this.$route.path === '/search') {
      //   let query = Object.assign({}, this.$route.query);
      //   query.lat = position.coords.latitude;
      //   query.lng = position.coords.longitude;
      //   this.$router.push({ path: this.$route.path, query: query})
      // } else {
      //   // Use these to set 
      //   searchOptions.templat = position.coords.latitude;
      //   searchOptions.templng = position.coords.longitude;
      // }

      // this.$store.commit('SET_DIRECTORY_SEARCH_OPTIONS', {searchOptions});

      var placesSearch = document.getElementById('address-input');
      placesSearch.value = 'Current Location';


      // that.props.updateAll(nextState, 'callback');

      // I am no longer showing the user where it thinks they are.
      // I am just using the words "Current Location"
      // axios.get('//nominatim.openstreetmap.org/reverse?format=json&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&zoom=18&addressdetails=1')
      // .then(response => {
      //   console.log('nominatim.openstreetmap.org res', response);
      //   // this.setState({
      //   //   city: response.data.address.city
      //   // })
      //   let userCity = response.data.address.city;
      //   if (userCity == undefined) {
      //     userCity = response.data.address.town;
      //   }
      //   this.placesAutocomplete.setVal(userCity);
      // })

      // const coordinates = {
      //   latitude: position.coords.latitude,
      //   longitude: position.coords.longitude
      // }
      // return coordinates;
        /*
        position is an object containing various information about
        the acquired device location:

        position = {
            coords: {
                latitude - Geographical latitude in decimal degrees.
                longitude - Geographical longitude in decimal degrees. 
                altitude - Height in meters relative to sea level.
                accuracy - Possible error margin for the coordinates in meters. 
                altitudeAccuracy - Possible error margin for the altitude in meters. 
                heading - The direction of the device in degrees relative to north. 
                speed - The velocity of the device in meters per second.
            }
            timestamp - The time at which the location was retrieved.
        }
        */
    },
    displayMyLocationSearch() {
      this.placesDropdownVis = true;
    },
    placesAutocomplete() {
      // I am set when the component mounts
    },
    handleOnSuggestions(e) {
      this.placesDropdownVis = false;
      // const latlng = this.$store.state.searchOptions.latlng;
      // const lat = latlng ? latlng.lat : '';
      console.log('suggestions', e.suggestions, e.suggestions[0].latlng.lat)
      if (e.suggestions.length === 0) {
        console.log('no suggestions')
        return;
      }

      const searchOptions = Object.assign({}, this.$store.state.searchOptions);

      // searchOptions.latlng = e.suggestions[0].latlng;
      searchOptions.lat = e.suggestions[0].latlng.lat;
      searchOptions.lng = e.suggestions[0].latlng.lng;

      var facetsForAlgolia = ['category','awards','sub_category', 'section', 'newsection'];
      searchOptions.facetsForAlgolia = facetsForAlgolia;

      this.$store.commit('SET_DIRECTORY_SEARCH_OPTIONS', {searchOptions});
  
      // e.suggestions.forEach(function(suggestion) {
      //   console.log('suggestion', suggestion);
      // });
    },
    handleOnChange(e) {
      this.placesDropdownVis = false;
      console.log('e', e);

      let query = Object.assign({}, this.$route.query);
      query.lat = e.suggestion.latlng.lat;
      query.lng = e.suggestion.latlng.lng;
      this.$router.push({ path: this.$route.path, query: query})

      // const searchOptions = Object.assign({}, this.$store.state.searchOptions);

      // searchOptions.latlng = e.suggestion.latlng;

      // searchOptions.locationName = e.suggestion.name + ', ' + e.suggestion.administrative;

      // this.$store.commit('SET_DIRECTORY_SEARCH_OPTIONS', {searchOptions});
      
    }
  },

  watch: {
    closeSuggestions: function(newVal) {
      this.placesAutocomplete.close();
    }
  }
}
</script>

<style lang="scss">
.one {
    color: blue;
}
</style>
