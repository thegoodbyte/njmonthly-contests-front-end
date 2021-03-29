<template>
  <div class="main-page-contaier">
     <ContestHeader/>
    <div class="content">
      <div class="headerContent">
      <h2 >It's time to Play</h2>
     <h3><strong> Travel the state &amp; show us your selfies at NJ’s most iconic destinations.</strong></h3>
     </div>
      <div class="content">
        <p>Participating in the Great New Jersey Monthly Scavenger Hunt is as easy as taking a selfie.  In fact, that’s all you need to do. </p>

<p>We’ve created six categories, each with six iconic New Jersey destinations. Submit a selfie from all six destinations in any one category, and you’ll be 
eligible for a prize drawing (see below). Complete all six categories (36 destinations), and you’ll be eligible for our Grand Prize drawing—for a $200 
American Express gift card and more!</p>

<p>And since we want you to stay safe out there, we’ll also award a prize for the best “maskie”—a selfie taken with all subjects wearing face coverings
   to ensure their health and the safety of others. </p>

<p>Sound like fun? That’s the idea. There’s no entry fee, and nothing to buy. </p>

<p>To start your hunt, just  <a v-if="user" href="/contests/scavenger-hunt/locations"> Continue Your Adventure.</a>
<a v-else href=""  v-on:click.prevent="toggleLoginPopup">REGISTER or LOG IN</a>
</p>
<br/>


        
<p><strong>Entry period: June 22-October 23.</strong></p>

<p>This site includes <router-link :to="'/contests/scavenger-hunt/rules'">OFFICIAL RULES </router-link> and a <a href="https://www.dropbox.com/s/3q17f19q7ishibg/ScavangerHunt%20FORM%20LR.pdf?dl=1">DOWNLOADABLE CHECKLIST</a> for all 36 destinations.</p>

<p style="">Once you begin to play, you’ll be able to monitor your progress as you make your submissions. Complete one or more categories and you’ll be eligible for 
  our prize drawings:</p>

<strong>CATEGORY PRIZES:</strong> <p>Complete an individual category and you will receive a digital badge commemorating the achievement. 
  You also will become eligible for a Category Prize random drawing, as follows: Northern NJ, a $125 gift certificate to Calandra’s Mediterranean Grill;
   Historic Sites, a basket of Morris County-themed items from Morris County Tourism Bureau; and Central NJ, a $100 gift certificate to Williams 
   Harley-Davidson in Lebanon. For all other categories, the winner of the random drawing will receive
   a $100 American Express gift card. The second prize winner in the random drawing in each category will receive a 12-month 
   subscription to New Jersey Monthly. 
</p>

<br/>
<strong>GRAND PRIZE:</strong> <p>Complete all six categories (36 selfies) and be entered in the Grand Prize drawing for a $200 American Express gift card and a one-year 
subscription to New Jersey Monthly. </p>
<br/>
<strong>MASKIE BONUS:</strong> <p>Take your selfie with a protective face covering and be eligible to win a $50 American Express gift card.  </p>
<br/>


<strong>SPECIAL THANKS TO OUR MARKETING PARTNERS: </strong><br/>
<a href="https://www.calandrasmedgrill.com/" target="_blank">Calandra’s Mediterranean Grill, Fairfield </a><br/>
<a href="https://www.morristourism.org/" target="_blank">The Morris County Tourism Bureau </a><br/>
<a href="https://williamshd.com/" target="_blank">Williams Harley-Davidson, Lebanon </a>


      </div>
    </div>

    <div :class="this.$store.state.showLoginPopup ? 'popup' : 'display-none'">
      <div class="popup-overlay" v-on:click="toggleLoginPopup"></div>
      <auth />
    </div>
  </div>
</template>

<script>
import ContestHeader from 'components/contests/ContestHeader.vue';
import Auth from 'components/user/Auth.vue';
import {
  ENV_URL,
  S3_URL,
  MAIN_URL,
  STRIPE_PUBLISHABLE
} from "../../environment.js";

export default {
  name: "scavenger-hunt-main",
  components: {
    ContestHeader,
    Auth
    },

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
      let chosenLink = ["REGISTER or LOG IN","Continue Your Adventure"];
      return !this.user? chosenLink[0] : chosenLink[1] ;
    },
    contest() {
      console.dir(this.$store.state);
      return this.$store.state.contests;
    },

    userIsLoggedIn() {
      return this.user !== null;
    },

    rulesLink(){
      return '/contests/scavenger-hunt/rules';
    },
    showLoginPopup() {
      return this.$store.state.showLoginPopup;
    },
  },



  methods: {
   toggleLoginPopup() {
      this.$store.dispatch('TOGGLE_LOGIN_POPUP');
    }
  }
};
</script>


<style lang="scss" sccoped>
.headerContent{
    padding: 20px 0;
    border-bottom: 1px solid #8d2890;
     margin-bottom: 20px;
}
h2 {
    text-transform: uppercase;
    max-width: 600px;
    margin: 0 auto;
   
    font-size: 4.2em;
    line-height: 1.3em;
    font-weight: bold;
    color: #8d2890;

}

h3{
  font-size: 1.8em;
  font-weight: 300;
  line-height: 1.2em;
  color: #8d2890;
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


@media only screen and (max-width:600px){
  h2 {
    font-size: 2.6em;
    line-height:2.6em;
  }
  h3 {
    font-size: 1em;
    font-weight: 300;
    line-height: 1.2em;
  }
}
</style>