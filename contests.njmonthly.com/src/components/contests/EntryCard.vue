<template>

  <div class="card one-third" :id="'card_' + entry.id">
    <div>
      <div class="visible-card">
        <div class="card-image">
          <img 
            :src="S3_URL + '/' + media_id + '/conversions/' + imageSize + '.jpg'" 
            :data-zoom-src="S3_URL + '/' + media_id + '/conversions/large.jpg'"
            data-zoomable="true"
          />
        </div>

        
        <div class="card-block-container">
          <div class="card-block">
            <div class="card-content">
              <h4 v-if="contest.item_template !== 'GalleryItemCardContentV3'" class="card-title">{{ entry.item_name.replace(/-/gi, " ") }}</h4>
<div v-if="contest.item_template === 'GalleryItemCardContentV3'">
  Category: {{ entry.item_name.replace(/-/gi, " ") }}
  <h4 class="card-title">{{ entry.item_att1 }}</h4>
  <h4 class="card-title">Selfie by: {{ entry.user.name }}</h4>
</div>
                <div v-if="contest.item_template === 'GalleryItemCardContentV1'">
                  <h4 class="card-title">Photo by {{ entry.user.name }}</h4>
               
                  
                  <h4 class="card-title">Category: {{ entry.item_att1 }}</h4>
                </div>


              <p class="card-text">{{ showMore ? entry.item_description : item_desc }} <span v-if="more" v-on:click="showMore = !showMore">Read {{ showMore ? 'less' : 'more' }}</span><span v-else></span></p>
            </div>
            <div class="card-actions">

              <!-- <div style="display: none;">pleglentum</div> -->
              <div v-if="contest.status.toLowerCase() === 'vote'">
                <vote-heart :entry="entry" :contest_id="get_contest_id" :admin_level="get_user_level()" />
              </div>
              <div class="share-buttons-container">
              
                <router-link class="link-icon-container share-icon" :to="'/contests/' + contest.slug + '/entries/' + entry.id">
                  <link-icon />
                </router-link>

                <a class="share-icon" :href="'https://www.facebook.com/sharer/sharer.php?u=' + MAIN_URL + '/contests/' + contest.slug + '/entries/' + entry.id + '&quote=' + share_text" target="_blank">
                  <div class="facebook-icon">
                    <facebook-icon />
                  </div>
                </a>

                <a class="share-icon" :href="'http://twitter.com/share?url=' + MAIN_URL + '/contests/' + contest.slug + '/entries/' + entry.id + '&text=' + share_text" target="_blank">
                  <div>
                    <twitter-icon />
                  </div>
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ENV_URL, S3_URL, MAIN_URL} from '../../environment.js';
import VoteHeart from 'components/contests/VoteHeart.vue';
import FacebookIcon from 'components/ui/FacebookIcon.vue';
import TwitterIcon from 'components/ui/TwitterIcon.vue';
import LinkIcon from 'components/ui/LinkIcon.vue';
// import EntryForm from 'components/contests/EntryForm.vue';

import Loader from 'components/ui/Loader.vue';
var smoothScroll = require('smoothscroll');


export default {
  name: 'directory-view',

  components: {
    VoteHeart,
    FacebookIcon,
    TwitterIcon,
    LinkIcon,
    // EntryForm,
  },
  props: ['entry', 'imageSize'],

  data () {
    // console.log('current page', this.$route.query['page'])
    return {
      votes: 0,

      showMore: false,
      currentUser:null,
      MAIN_URL: MAIN_URL,
      S3_URL: S3_URL,


      // page: this.$route.query['page'] ? Number(this.$route.query['page']) : 1,
    }

  },

  // beforeCreate() {
  // 	this.$store.dispatch('FETCH_CURRENTLY_SELECTED_FACETS', {});
  // },

  mounted() {
    
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    contest() {
      return this.$store.state.contest;
    },
    media_id() {
      // return '';
      var item_media = this.entry.media;

      // console.log('item_media', item_media);

      if (item_media !== undefined && item_media[0] !== undefined) {
        var media_id = item_media[0].id;
      } else {
        var media_id = false;
      }

      return media_id;

    },
    get_contest_id(){
      return this.contest.id;
    },


    share_text() {
      var share_text = this.contest.status == 'vote' ? "Vote for " + this.entry.item_name + " in the New Jersey Monthly " + this.contest.title + "!"
                                                        :  this.entry.item_name + " has entered the New Jersey Monthly " + this.contest.title + "!";
      return share_text;
    },

    item_desc() {
      var full_desc = this.entry.item_description;
      var item_desc = '';
      let more = false;
      if (full_desc !== null && full_desc.length > 300) {
        more = true;
        item_desc = full_desc.slice(0, 290) + '...';
      } else {
        item_desc = full_desc !== null ? full_desc : '';
      }
      return item_desc;
    },
    
    more() {
      var full_desc = this.entry.item_description;
      return full_desc !== null && full_desc.length > 300;
    }

  },



  methods: {
    clearFilters: function() {
      let query = Object.assign({}, this.$route.query);
			this.$store.state.searchOptions.facetsForAlgolia.map(function(facet) {
				if (query[facet] && facet !== 'hcategory.lvl0') {
					delete query[facet];
				}
			})
      this.$router.push({ path: this.$route.path, query: query})
    },

    get_user_level(){
   
      return this.user !== null ? this.user.admin_level : -1;

    },

  },

}


</script>

<style lang="scss">
.card-content {

    text-transform: capitalize;

}
</style>

