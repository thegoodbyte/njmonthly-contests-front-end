
<template>
  <div>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate">
      <l-tile-layer
        :url="url"
        :attribution="attribution"/>
      <l-marker :lat-lng="marker">
        <l-popup>
          <div @click="popupClick">
            <div>
              <h3>{{ listing.title }}</h3>
              <div>
                {{ listing.address }}<br/>
                {{ listing.city }}, {{ listing.state }} {{ listing.zip }}
              </div>
            </div>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>
<script>
import { LMap, LTileLayer, LMarker, LPopup } from '../../node_modules/vue2-leaflet/dist/vue2-leaflet.js';


export default {
  name: 'Example',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data () {
    return {
      zoom: 13,
      center: L.latLng(this.listing._geoloc.lat, this.listing._geoloc.lng),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      // marker: L.latLng(47.413220, -1.219482),
      marker: L.latLng(this.listing._geoloc.lat, this.listing._geoloc.lng),
      currentZoom: 13,
      currentCenter: L.latLng(47.413220, -1.219482),
      showParagraph: false
    };
  },
  props: ['listing'],
  methods: {
    zoomUpdate (zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate (center) {
      this.currentCenter = center;
    },
    popupClick () {
      alert('Popup Click!');
    }
  },
  computed: {
    // marker() {
    //   if (L !== undefined) {
    //     console.log('listing', this.listing)
    //       const coordinates = [this.listing._geoloc.lat, this.listing._geoloc.lng];
    //       const marker = L.marker(coordinates);
    //       // const marker = L.latLng(this.listing._geoloc.lat, this.listing._geoloc.lng);
    //       return marker;

    //   }
    //   return null;
    // }
  },
  mounted() {
    // Set the marker icon
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('../../node_modules/leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('../../node_modules/leaflet/dist/images/marker-shadow.png')
    });
      // var L = require('leaflet');
      // var mymap = L.map('vuemap').setView([51.505, -0.09], 13);
  }
};
</script>
<style lang="scss">
// .leaflet-fake-icon-image-2x {
//   background-image: url('../../node_modules/leaflet/dist/images/marker-icon-2x.png');
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
