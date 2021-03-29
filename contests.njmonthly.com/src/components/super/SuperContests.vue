<template>

  <div>
    <main class="container" id="main-container">
    <h1 class="text-center">Contests</h1>

    <div v-if="contests" class="card-deck thumbnails">

      <div v-for="contest in contests" :key="contest.id" class="card one-third" :id="'card_' + contest.id">
        <div>
          <div class="visible-card">
            <div class="card-image">
              <img 
                :src="S3_URL + '/' + contest.media_id + '/conversions/thumb.jpg'" 
                :data-zoom-src="S3_URL + '/' + contest.media_id + '/conversions/large.jpg'"
                data-zoomable="true"
              />
            </div>

            <div class="card-block-container">
              <div class="card-block">
                <div class="card-content">
                  <router-link :to="'/super/contests/' + contest.slug + '/entries'"> 
                    <h4 class="card-title">{{ contest.title }}</h4>
                  </router-link>
                  <div><router-link :to="'/super/contests/' + contest.slug + '/update'">Update</router-link></div>
                  <div><router-link :to="'/super/contests/create/' + contest.slug">Create Similar Contest</router-link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    </main>

  </div>

</template>

<script>
import {ENV_URL, S3_URL, MAIN_URL, STRIPE_PUBLISHABLE} from '../../environment.js';
// import EntryForm from 'components/contests/EntryForm.vue';


export default {
  name: 'directory-view',

  components: {
    // EntryForm,
  },



  data () {
    return {
      S3_URL: S3_URL,
    }

  },

  // beforeCreate() {
  // 	this.$store.dispatch('FETCH_CURRENTLY_SELECTED_FACETS', {});
  // },


  computed: {
    user() {
      return this.$store.state.user;
    },
    contests() {
      return this.$store.state.contests;
    }

  },

  created() {
    let contests = this.$store.state.contests;

    if (!contests) {
      this.$store.dispatch('LOADING', true);
      console.log('Getting new data')
      const uri = ENV_URL + '/contests';
      this.$store.dispatch('CONTESTS', {uri: uri}).then(() => {
        this.$store.dispatch('LOADING', false);
      })
    }
  },


  mounted() {

  },

  methods: {

  },

}


</script>

<style lang="scss">

</style>

