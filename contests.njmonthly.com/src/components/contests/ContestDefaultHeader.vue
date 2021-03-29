<template>
  <div>
    <header>
      <div v-if="contest.media_id" class="header-image">
        <img :src="S3_URL + '/' + contest.media_id + '/conversions/large.jpg'" />
      </div>
      <nav class="action-nav">
        <ul class="menu-primary">
       
          <li v-if="contest.status == 'submit'"><router-link :to="'/contests/' + contest.slug + '/entries/create'">Enter</router-link></li>
          
          <li>
            <router-link :to="'/contests/' + contest.slug + '/entries'">
              {{ gallery_or_vote}}
            </router-link>
          </li>
          <li>
            <router-link :to="'/contests/' + contest.slug + '/rules'">Rules</router-link>
          </li >
          <li v-if="contest.slug !== 'scavenger-hunt'">
            <router-link :to="'/contests/' + contest.slug + '/help'">Tips</router-link>
          </li>

          <li v-if="(user && user.admin_level >= 10) && (contest.settings && contest.settings.finalists === 'true')">
            <router-link :to="'/contests/' + contest.slug + '/finalists'">Finalists</router-link>
          </li>

          <li v-if="contest.settings && contest.settings.prizes === 'true'">
            <router-link :to="'/contests/' + contest.slug + '/prizes'">Prizes</router-link>
          </li>

          <!-- <li v-if="contest.settings && contest.settings.finalists === 'true'">
            <router-link :to="'/contests/' + contest.slug + '/finalists'">Finalists</router-link>
          </li> -->

        </ul>
      </nav>
    </header>
  </div>
</template>



<script>
import {ENV_URL, S3_URL, MAIN_URL, STRIPE_PUBLISHABLE} from '../../environment.js';
export default {
  name: 'ContestDefaultHeader',
  props: ['id','contest'],
  data () {
    return {
      open: true,
      S3_URL: S3_URL,
  
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },

    gallery_or_vote(){
      return this.gallery_or_vote_item();
    }
  },
  methods: {
    pluralize: n => n + (n === 1 ? ' reply' : ' replies'),
    gallery_or_vote_item() {
      let output = '';
      let contest = this.contest;
      var user_level = this.user !== null ? this.user.admin_level : 0;

      if(contest.status){
        output =  contest.status.toLowerCase() !== "vote"  ? "Gallery" : "Vote" ;
        if(contest.id !== 6){
          return output;
        }
        else{
          output = user_level >= 10 ? "Vote" : "Gallery";
        }
      }
      return output;
    }
  },
}
</script>

<style lang="scss">
  broadstreet-zone-container{
    text-align: center;
    margin-bottom: 15px;
  }
</style>
