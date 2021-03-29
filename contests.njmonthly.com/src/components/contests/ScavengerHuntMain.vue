<template>
  <div class="main-page-contaier">
     <ContestHeader/>
    <div class="content">
      <h2 style="text-align:left">
        Show us your selfies at 36 iconic New Jersey destinations—and win!
      </h2>
      <div class="content">
        <p><strong>Welcome to the Great New Jersey Monthly Scavenger Hunt 2020.</strong> We’ve created six categories, 
          each with six iconic New Jersey destinations. Submit a selfie from all six destinations in 
          any one category, and you’ll be eligible for a prize drawing. Complete all six categories 
          (36 destinations), and you’ll be eligible for our Grand Prize drawing—for a $200 American 
          Express gift card and more!
        </p>
       
        <p>
          Remember, it’s free to play and there’s nothing to buy. All you have to do is <a href=""> {{this.registerOrContinue}} </a>.
        </p>

        <p>
          To help you on your way, <a href="#"> click here</a> this page provides descriptions and photos for each of the 36 locations.
        </p>

      </div>
    </div>
  </div>
</template>

<script>
import ContestHeader from 'components/contests/ContestHeader.vue';
import {
  ENV_URL,
  S3_URL,
  MAIN_URL,
  STRIPE_PUBLISHABLE
} from "../../environment.js";

export default {
  name: "scavenger-hunt-main",
  components: {ContestHeader},

  data() {
    return {};
  },

  beforeUpdate() {
    console.log("right before update");
    this.loading = false;
    this.$store.dispatch("LOADING", false);
  },

  computed: {
    user() {
      // console.log(this.$store.state.user)
      return this.$store.state.user;
    },
    registerOrContinue() {
      // console.log(this.$store.state.user)
      let chosenLink = ["Register","Continue Adventure"];
      return !this.user? chosenLink[0] : chosenLink[1] ;
    },
    contest() {
      console.dir(this.$store.state);
      return this.$store.state.contests;
    },

    userIsLoggedIn() {
      return this.user !== null;
    }
  },



  methods: {}
};
</script>


<style lang="scss" sccoped>
h2 {
    text-transform: uppercase;
    max-width: 600px;
    margin: 0 auto;
    margin-bottom: 30px;
    font-size: 3.8em;
    line-height: 1.3em;
    font-weight: bold;
    color: #8d2890;
    padding: 20px 0;
    border-bottom: 1px solid;
}


.content{
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 0;
  text-align: left ;
  color: #404040;
  font-size: 1em;
  line-height: 1.6em;
}

.content a {

    color: #12995c;
    text-decoration: underline;
    font-style: italic;

}
</style>