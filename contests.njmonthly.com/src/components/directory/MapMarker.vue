
<template>
      <l-marker :lat-lng="marker">
        <l-popup>
          <div @click="popupClick">
            <div v-html="listing.title"></div>
            {{listing.address}}, <br /> {{listing.city}}, {{listing.state}}, {{listing.zip}}
          </div>
        </l-popup>
      </l-marker>
</template>
<script>
import { LMarker, LPopup } from '../../node_modules/vue2-leaflet/dist/vue2-leaflet.js';
export default {
  name: 'Example',
  props: ['listing'],
  components: {
    LMarker,
    LPopup
  },
  data () {
    return {
      marker: L.latLng(this.listing._geoloc.lat, this.listing._geoloc.lng),
      showParagraph: false,
    };
  },
  methods: {
    showLongText () {
      this.showParagraph = !this.showParagraph;
    },
    popupClick () {
      alert('Popup Click!');
    }
  },
  computed: {
    coordinates() {
      console.log('coord', this.listings._geoloc);
      return this.listing._geoloc;
    }
  },
  mounted() {
      // var L = require('leaflet');
      // var mymap = L.map('vuemap').setView([51.505, -0.09], 13);


  }
};
</script>
<style lang="scss">
// .leaflet-fake-icon-image-2x {
//   background-image: url(../../node_modules/leaflet/dist/images/marker-icon-2x.png);
// }
// .leaflet-fake-icon-shadow {
//   background-image: url(../../node_modules/leaflet/dist/images/marker-shadow.png);
// }
.vue2leaflet-map {
    height: 200px !important;
}
@import "../../node_modules/leaflet/dist/leaflet.css";
body {
  margin: 0px;
}
#side {
  float:left;
  width:208px;
}
#full_div {
  position: absolute;
  overflow-x: auto;
  top: 0;
  right: 0;
  left: 208px;
  bottom: 0;
  padding-left: 8px;
  border-left: 1px solid #ccc;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  font: 200 15px/1.5 Helvetica, Verdana, sans-serif;
  border-bottom: 1px solid #ccc;
}
li:last-child {
  border: none;
}
li a {
  font-size: 15px;
  padding-left: 8px;
  text-decoration: none;
  color: #000;
  display: block;
  -webkit-transition: font-size 0.3s ease, background-color 0.3s ease;
  -moz-transition: font-size 0.3s ease, background-color 0.3s ease;
  -o-transition: font-size 0.3s ease, background-color 0.3s ease;
  -ms-transition: font-size 0.3s ease, background-color 0.3s ease;
  transition: font-size 0.3s ease, background-color 0.3s ease;
}
li a:hover {
  font-size: 20px;
  background: #f6f6f6;
}
</style>
