<template>
  <div class="single-item">
    <contest-header v-if="contest" />

      <entry-card v-if="singleEntry" 
      :entry="singleEntry"
      imageSize='large'
    /> 

      <div id="vote-alert" style="opacity: 0">
        <div class="text"></div>
      </div>
  </div>
</template>
<script>
import {ENV_URL, S3_URL} from '../../environment.js';
import EntryCard from 'components/contests/EntryCard.vue';
import ContestHeader from 'components/contests/ContestHeader.vue';
export default {
  name: 'directory-view',

  components: {
    EntryCard,
    ContestHeader,
  },
  data () {
    return {
      S3_URL: S3_URL,

    }

  },
  created() {
    const uri = ENV_URL + this.$route.path;
    this.$store.dispatch('GET_SINGLE_ENTRY_PAGE_DATA', uri);
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    singleEntry() {
      return this.$store.state.singleEntry;
    },
    contest() {
      return this.$store.state.contest;
    },
  },

  mounted() {

    if (typeof window !== "undefined") {

      this.$ga.set(this.$route.fullPath);
      this.$ga.page(this.$route.fullPath);
    }

  },

  serverAsyncData({store, to, from}) {

    const state = store.state;

    // Set the rest of the searchOptions using the query.
    // to and from are undefined when coming from a different page
    // and when the page first loads, so use the query in the route
    let route = {};
    if (to !== undefined) {
      route = to;
    } else if (from === undefined) {
      route = state.route;
    } else {
      route = state.route.from
    }
    // return store.dispatch('FETCH_DIRECTORY', {route})

    const uri = ENV_URL + route.path;
    return store.dispatch('GET_SINGLE_ENTRY_PAGE_DATA', uri);

  },
  metaInfo () {
      var item_media = this.singleEntry.media;

      

      if (item_media !== undefined && item_media[0] !== undefined) {
        var media_id = item_media[0].id;
      } else {
        var media_id = false;
      }
    const imageUrl = S3_URL + '/' + media_id + '/conversions/large.jpg';

    console.log('singleEntry imageUrl', imageUrl);

    return this.$seo('singleEntry', this.singleEntry.item_name, imageUrl);
  },
  methods: {
    formSubmitted() {
    },
  },

}
</script>

<style lang="scss">

</style>
