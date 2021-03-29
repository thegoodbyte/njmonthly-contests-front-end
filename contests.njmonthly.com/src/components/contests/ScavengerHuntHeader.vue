<template>
  <div>

    <header>
      <div v-if="contest.media_id" class="header-image">
        <img :src="S3_URL + '/' + contest.media_id + '/conversions/large.jpg'" />
      </div>
   <nav v-if="contest" class="action-nav">
      <ul class="menu-primary">
        <li>
          <a :href ="'/contests/' + contest.slug">About</a>
        </li>
        
        <li>
          <router-link :to="'/contests/' + contest.slug + '/locations-prizes'">Locations/Prizes</router-link>
        </li>
        

        <li>
          <router-link :to="'/contests/' + contest.slug + '/entries'">Gallery</router-link>
        </li>
        <li>
          <router-link :to="'/contests/' + contest.slug + '/rules'">Rules</router-link>
        </li>

        <li v-if="!user">
          <a href="#" v-on:click.prevent="toggleLoginPopup">Login/Register</a>
        </li>

        <li v-else>
          <router-link :to="'/contests/' + contest.slug + '/locations'">Continue Adventures</router-link>
        </li>
      </ul>
    </nav>

    </header>
        <div :class="this.$store.state.showLoginPopup ? 'popup' : 'display-none'">
      <div class="popup-overlay" v-on:click="toggleLoginPopup"></div>
      <auth />
    </div>
  </div>
</template>



<script>
import {ENV_URL, S3_URL, MAIN_URL, STRIPE_PUBLISHABLE} from '../../environment.js';
import Auth from 'components/user/Auth.vue';
export default {
  name: 'ScavengerHuntHeader',
  props: ['id','contest','user'],
  components: {Auth},
  
  data() {
    return {
      open: true,
      S3_URL: S3_URL,
    }
  },

  computed: {
    showLoginPopup() {
      return this.$store.state.showLoginPopup;
    }
  },

  methods:{
    toggleLoginPopup() {
      this.$store.dispatch('TOGGLE_LOGIN_POPUP');
    }
  }
}

</script>

<style lang="scss">
  broadstreet-zone-container{
    text-align: center;
    margin-bottom: 15px;
  }

   ul.menu-primary li {
    display: inline-block;
    vertical-align: middle;
  }
</style>
