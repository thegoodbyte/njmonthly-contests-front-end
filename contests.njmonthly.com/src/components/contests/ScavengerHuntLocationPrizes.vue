<template>
  <div class="main-page-contaier">
     <ContestHeader/>
    <div v-if="prizes" class="content">
       <h2>LOCATIONS AND PRIZES BY CATEGORY</h2>
       <ul class="category-listing">
          <li v-for="prizeInfo in prizes.prizeData" :key="prizeInfo.name" class="locations-prizes">
             <h3>{{prizeInfo.name}}</h3>
             <p v-if="prizeInfo.partner !==''" class="marketing-partner"> marketing partner - {{prizeInfo.partner}}</p>
             <ul class="locations">
                          <li v-for="location in prizeInfo.locations" :key="prizeInfo.locations.indexOf(location)">
                 <p v-html="location"></p>
               </li>
             </ul>
             <ul class="prizes">
             <li class="grand-prize"><strong>Category Grand Prize: </strong> {{prizeInfo.prizes[0].grandPrize}}</li>
             <li class="second-prize"><strong>Category 2nd Prize: </strong> <p v-html="prizeInfo.prizes[0].secondPrize"></p>  </li>
              </ul>
          </li>
       </ul>

   
       <div class="ultimate-prize">
           <h4>Grand Prize</h4>
           <p>Complete all six categories (36 selfies) and be entered in the drawing to win a <strong>$200 American Express 
             gift card</strong> and a 12-month subscription to <italic>New Jersey Monthly</italic>.</p>
       </div>

       <div class="bonus">
           <h4>Maskie Bonus</h4>
           <p>We’ll also award a prize for the best “maskie”—a selfie taken with all the subjects wearing face
             coverings to ensure their health and the safety of others. </p>
        
       </div>
    <div class="cat-prize">
         
           <p><strong>Category Prizes:</strong> $50 American Express gift card</p>
       </div>

      <div class="details">
            
           <div v-if="!user"  class="button"  v-on:click.prevent="toggleLoginPopup"> REGISTER OR LOGIN </div>
           <a v-else href="locations" class="button"> PLAY NOW</a>
           <a class="link" target="_blank" href="https://njmonthly.com/articles/jersey-living/great-njm-scavenger-hunt-2020/"> See pictures and full descriptions of the locations here</a>
           <a class="link" target="_blank" href="https://www.dropbox.com/s/3q17f19q7ishibg/ScavangerHunt%20FORM%20LR.pdf?dl=1"> Download Checklist</a>
      
       </div>
    </div>
  </div>
</template>

<script>
// import prizeData from '../../json/ScavengerHuntPrizeData.json';
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
    return {
      prizes:{
  "prizeData": [
  {
  
    "name":"northern nj",
    "partner": "Calandra’s Mediterranean Grill",
    "locations":[
      "Calandra’s Mediterranean Grill, Fairfield",
      "Ringwood Manor, Ringwood State Park ",
      "Great Falls, Paterson",
      "White Manna, Hackensack",
      "Colgate Clock, Jersey City",
      "Seated Lincoln Statue, Essex County Courthouse"
      
    ],
    "prizes": [
      {
        "secondPrize":"12-month subscription to <italic>New Jersey Monthly</italic>",
        "grandPrize":"$125 gift certificate to Calandra’s Mediterranean Grill"
      }
    ]
  },

  {
  
    "name":"historic sites",
    "partner": "Morris County Tourism Bureau ",
    "locations":[
      " The Green, Morristown",
      " Ralston Cider Mill, Mendham",
      " The Old Barracks, Trenton",
      " Grover Cleveland Birthplace, Caldwell",
      " Hunterdon County Courthouse, Flemington",
      " Liberty Hall Museum, Kean University, Union"
      
    ],
    "prizes": [
      {
        "secondPrize":"12-month subscription to <italic>New Jersey Monthly</italic>",
        "grandPrize":"A basket of Morris County-themed items from Morris County Tourism Bureau"
      }
    ]
  },

  {
  
    "name":"central nj",
    "partner": "Williams Harley-Davidson",
    "locations":[
      "Williams Harley-Davidson, Lebanon",
      "Edison Memorial Tower, Edison",
      "Princeton Battle Monument, Princeton",
      "Thomas Paine Monument, Bordentown",
      "Unionville Vineyards at the red barn, Ringoes",
      "Red Mill Museum Village, Clinton"
      
    ],
    "prizes": [
      {
        "secondPrize":"12-month subscription to <italic>New Jersey Monthly</italic>",
        "grandPrize":"$100 gift certificate to Williams Harley-Davidson in Lebanon"
      }
    ]
  },

  {
  
    "name":"down the shore",
    "partner": "",
    "locations":[
       "The (original) Windmill, Long Branch",
       "The Stone Pony, Asbury Park",
       "Midway Steak House, Seaside Heights Boardwalk",
       "Old Barney, Barnegat Light, LBI",
       "Lucy the Elephant, Margate City",
       "The Wildwoods Sign, Wildwood"
      
    ],
    "prizes": [
      {
        "secondPrize":"12-month subscription to <italic>New Jersey Monthly</italic> ",
        "grandPrize":"$100 American Express gift card"
      }
    ]
  },

  {
  
    "name":"southern nj",
    "partner": "",
    "locations":[
       "Battleship New Jersey, Camden",
       "Haddy the Dinosaur, Haddonfield", 
       "Paulsdale, Mount Laurel",
       "Batsto Village, Hammonton",
       "Carranza Memorial, Tabernacle",
       "Fort Mott State Park, Pennsville <br/>[<strong>EDITOR'S NOTE:</strong> <italic>As of August 8, Fort Mott State Park has temporarily closed; selfies at this location are no longer required.</italic>]"
      
    ],
    "prizes": [
      {
        "secondPrize":"12-month subscription to <italic>New Jersey Monthly</italic>",
        "grandPrize":"$100 American Express gift card"
      }
    ]
  },

  {
  
    "name":"take a hike",
    "partner": "",
    "locations":[
       "High Point Monument, High Point State Park, Sussex", 
       "Women’s Federation Monument, Palisades Interstate Park, Alpine",
       "Tripod Rock/Pyramid Mountain, Montville ", 
       "Feltville, Watchung Reservation, Berkeley Heights",
       "Jockey Hollow, Morristown National Historical Park, Morristown",
       "Historic Village at Allaire, Allaire State Park, Farmingdale"
      
    ],
    "prizes": [
      {
        "secondPrize":"12-month subscription to <italic>New Jersey Monthly</italic>",
        "grandPrize":"$100 American Express gift card"
      }
    ]
  }
]

}
    };
  },

  beforeUpdate() {
    console.log("right before update");


  },

  mounted(){
    
    if(prizeData){
    this.prizes = prizeData;
    }
    console.log("prizes: ",this.prizes)
    this.$store.dispatch("LOADING", false);
  },

  computed: {
    user() {
      // console.log(this.$store.state.user)
      return this.$store.state.user;
    },
    registerOrContinue() {
      // console.log(this.$store.state.user)
      let chosenLink = ["REGISTER or LOG IN","PLAY NOW"];
      return !this.user? chosenLink[0] : chosenLink[1] ;
    },
    contest() {
      console.dir(this.$store.state);
      return this.$store.state.contests;
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

ul,li{
  margin:0;
  padding:0;
}

.second-prize p {
  display: inline;
  }

.locations-prizes {
	background-color: white;
	display: inline-block;
	padding: 20px;
	margin: 20px;
	height: auto;
  min-height: 520px;
	vertical-align: top;
	width: calc(50% - 80px);
  width: -moz-calc(50% - 80px);
  width: -webkit-calc(50% - 80px);
  width: -o-calc(50% - 80px);
}

.marketing-partner {
	font-weight: bold;
	font-style: italic;
	text-transform: capitalize;
}

.headerContent{
    padding: 20px 0;
    border-bottom: 1px solid #802A96;
     margin-bottom: 20px;
}


.button, .content a.button {
	background-color: #802A96;
	color: white;
	border-radius: 5px;
	padding: 8px 20px;
	max-width: 200px;
	text-align: center;
  text-decoration: none;
	margin: 0 auto;
  cursor:pointer;
}



h2 {
    text-transform: uppercase;

    margin: 0 auto;
   
    font-size: 3.2em;
    line-height: 1.3em;
    text-align: center;
    color: #802A96;

}

h3{
  font-size: 1.8em;
  font-weight: 300;
  line-height: 1.2em;
  color: #802A96;
}

h4{
  font-size:21px;
  color:#802A96;
  text-transform: uppercase;
}

.grand-prize, .second-prize{
  color:#802A96;
}


.content{
  max-width: 1280px;
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

ul.category-listing {}

ul.category-listing li h3 {
  text-transform: uppercase;
}

.locations li {
	padding: 8px 0;
}

.link {
	margin: 15px 20px;
	display: block;
}

li{list-style: none;}
.prizes {
  padding: 15px 0;
}

.prizes li{
  padding: 5px 0;
}

.cat-prize{
  color:#802A96;
}
.locations li {
	list-style-type: decimal;
	margin-left: 20px;
}

.ultimate-prize,.bonus,.cat-prize {
	padding: 0 20px;
}

.details {
	margin: 40px 0;
  text-align: center;
}

italic {

    font-style: italic;

}

@media only screen and (max-width:920px){
  .locations-prizes {
  	width: calc(100% - 80px);
    width: -moz-calc(100% - 80px);
    width: -webkit-calc(100% - 80px);
    width: -o-calc(100% - 80px);
  }
}

@media only screen and (max-width:600px){
  h2 {
    font-size: 2.6em;
    line-height:1.2em;
  }
  h3 {
    font-size: 1em;
    font-weight: 300;
    line-height: 1.2em;
  }
}
</style>

