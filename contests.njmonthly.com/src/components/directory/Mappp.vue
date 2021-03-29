
<template>
  <div>
    <div id="vuemap"></div>
    {{ this.currentCenter }}
    <l-map
      :zoom="zoom"
      :center="center"
      :bounds="bounds"
      :paddingTopLeft="[50,50]"
      :paddingBottomRight="[25,25]"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate">
      <l-tile-layer
        :url="url"
        :attribution="attribution"/>
      <map-marker v-for="listing in listings" :key="listing.title" :listing="listing">
      </map-marker>
    </l-map>
  </div>
</template>
<script>
import { LMap, LTileLayer, LMarker, LPopup } from '../../node_modules/vue2-leaflet/dist/vue2-leaflet.js';
import MapMarker from './MapMarker.vue';
export default {
  name: 'Example',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    'map-marker': MapMarker
  },
  data () {
    return {
      zoom: 13,
      // bounds: null,
      center: L.latLng(47.413220, -1.219482),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
      currentZoom: 13,
      currentCenter: L.latLng(47.413220, -1.219482),
      showParagraph: false
    };
  },
  methods: {
    zoomUpdate (zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate (center) {
      this.currentCenter = center;
    },
    showLongText () {
      this.showParagraph = !this.showParagraph;
    },
    popupClick () {
      alert('Popup Click!');
    }
  },
  computed: {
    listings() {
      console.log('listings', this.$store.state.directory.hits)
      return this.$store.state.directory.hits
    },
    bounds() {

      if (L !== undefined) {
        var markerArray = [];
    
        this.listings.map(function(object, i) {
          const coordinates = [object._geoloc.lat, object._geoloc.lng];
          const marker = L.marker(coordinates);
          marker._leaflet_id = object.objectID;
          markerArray.push(marker);
        });

        var geojsonLayer = new L.featureGroup(markerArray);
        var bounds = geojsonLayer.getBounds();
        var newBounds = L.latLngBounds([[bounds._northEast.lat, bounds._northEast.lng], [bounds._southWest.lat, bounds._southWest.lng]]);
        console.log('bounds', newBounds, bounds);
        return bounds;
      }

      return null;

    }
  },
  mounted() {
      // var L = require('leaflet');
      // var mymap = L.map('vuemap').setView([51.505, -0.09], 13);

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('../../node_modules/leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('../../node_modules/leaflet/dist/images/marker-shadow.png')
    });

      // var fitBoundsParams = {
      //   paddingTopLeft: [50,50],
      //   paddingBottomRight: [50,50]
      // };
    // set the map's center & zoom so that it fits the geographic extent of the layer
    // mymap.fitBounds(geojsonLayer.getBounds(), fitBoundsParams);


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
