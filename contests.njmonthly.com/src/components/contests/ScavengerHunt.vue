<template>
  <div>
     <div style="background-color:#fdfdfd; padding:20px;"  class="scavenger-hunt-container">
        <ContestHeader/>
       <div class="row" v-if="user">
        
             <div class="aside-content">
           <div class="profile-info-holder">

              <div class="scavengerHuntLogo">
               <img src="https://s3.us-east-2.amazonaws.com/test-contest-content/753/conversions/large.jpg"/>
              </div>
              <h4>The Adventures of <br/> {{user.name}} {{user.lastname}}</h4>
              <p>Completed categories: {{completed}}</p>

           </div> <!-- end profile-info-holder -->
           
           <div class="badge-info-holder">
             <div class="badges">
               <p>Badges: </p>
               <span></span>
             </div>
           </div>
           <div class="gallery Link button"> <a :href=this.getGalleryUrl()> View Gallery</a></div>

         </div> <!-- end aside content -->
         
         <div class="main-content">
           <div  v-for="(category,index) in huntLocations" v-bind:key="index">
           
             <displayCategories :category="category" :user="user"/>
            </div>
         </div> <!-- end of main content -->

       </div> <!--end else statement-->

      </div>

      
  </div>
</template>
<script>
// import EntryForm from 'components/contests/EntryForm.vue';
import {ENV_URL,SITE_URL, S3_URL, MAIN_URL, API_URL, STRIPE_PUBLISHABLE} from '../../environment.js';
import SuperHeader from 'components/super/SuperHeader.vue';
import displayCategories from 'components/contests/displayCategories.vue'
import ContestHeader from 'components/contests/ContestHeader.vue';
import axios from 'axios';

export default {
  name: 'scavenger-hunt',
  
  components: {
    SuperHeader,
    displayCategories,
    ContestHeader

  },

  data () {
   
    return {

      
      badgesInfo:[
        {
        location:'Northern New Jersey',
        image: 'https://contest-content.s3.us-east-2.amazonaws.com/scavenger-hunt/badges/northernnj.png',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nihil molestias harum ipsum at cumque nesciunt, non dolor quisquam earum excepturi debitis fugit accusamus corporis id commodi velit vero iusto!'
      },
      {
        location:'Southern New Jersey',
        image: 'https://contest-content.s3.us-east-2.amazonaws.com/scavenger-hunt/badges/southernnj.png',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nihil molestias harum ipsum at cumque nesciunt, non dolor quisquam earum excepturi debitis fugit accusamus corporis id commodi velit vero iusto!'
      },

      {
        location:'Central New Jersey',
        image: 'https://contest-content.s3.us-east-2.amazonaws.com/scavenger-hunt/badges/centralnj.png',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nihil molestias harum ipsum at cumque nesciunt, non dolor quisquam earum excepturi debitis fugit accusamus corporis id commodi velit vero iusto!'
      },

      {
        location:'Historic Sites',
        image: 'https://contest-content.s3.us-east-2.amazonaws.com/scavenger-hunt/badges/down-the-shore.png',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nihil molestias harum ipsum at cumque nesciunt, non dolor quisquam earum excepturi debitis fugit accusamus corporis id commodi velit vero iusto!'
      },

      {
        location:'Down The Shore',
        image: 'https://contest-content.s3.us-east-2.amazonaws.com/scavenger-hunt/badges/down-the-shore.png',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nihil molestias harum ipsum at cumque nesciunt, non dolor quisquam earum excepturi debitis fugit accusamus corporis id commodi velit vero iusto!'
      },

      {
        location:'Take A Hike',
        image: 'https://contest-content.s3.us-east-2.amazonaws.com/scavenger-hunt/badges/take-a-hike.png',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nihil molestias harum ipsum at cumque nesciunt, non dolor quisquam earum excepturi debitis fugit accusamus corporis id commodi velit vero iusto!'
      },
      
      ],
      subscriptions: [],
      slug :'api/scavenger-hunt/locations/all',
      huntLocations:{},
      requesting:false,
      currentUser:-1,
      completed: 0,
      progress: [
           {name:"northern-new-jersey", meter: "25"},
           {name:"southern-new-jersey", meter:"10"},
           {name:"central-new-jersey" , meter: "4"},
           {name:"down-the-shore" , meter: "50"},
           {name:"ac-to-cape-may" , meter: "25"},
           {name:"take-a-hike" , meter: "100"},
           
        ]
    }

  },

beforeCreate(){
  


},
  created(){
    

  },

  beforeUpdate(){

  
  },

  updated(){


  },
 mounted() {
   this.$store.dispatch('LOADING', true);
   
   this.$nextTick(()=>{
      this.user;
    });
   },
  beforeMount(){
    
  },
  computed: {

    isLoading(){
      // return this.requesting;
    },


    user() {
   
     this.currentUser = this.$store.state.user;
      return this.$store.state.user;
    },
  },
  
  methods: {
    completedCategories(completed,total_rounds){
      return completed >= total_rounds;
    },

    login(){
      this.$store.dispatch('TOGGLE_LOGIN_POPUP');
    },

    getGalleryUrl(){
      let path = this.$route.path;
      let p = path.replace("locations","");
  
      let gallery = `entries?q=${this.currentUser.id}`;
      return "https://contests.njmonthly.com/contests/scavenger-hunt/" + gallery; // temporary adjustmenet
      // return `${p}${gallery}`;
    },
    getProgress(){
      let user_id =this.currentUser.id;
      let url = `${API_URL}/api/userprogress/${user_id}`;
        
      return "getting progress " + url
    },
    httpRequest(url){
  
     let data =  axios.get(url)
      .then(response =>{
       this.huntLocations = response.data;
       this.updateCompletedData();
     

      })
      .catch(error => {})
      .finally( () => {
      
      })
       
      return data.json();
       
    },
    getData(){
      return this.user;
    },
   updateRequesting(){
     this.requesting = !this.requesting;
   },


    updateCompletedData()
    {
  
      
      let completedCategoriesBoolean = [];
    
      for (const key in this.huntLocations) {
        let result = this.completedCategories(this.huntLocations[key].progress.completed_submissions,this.huntLocations[key].progress.total_rounds);
 
        result ? completedCategoriesBoolean.push(1) : ""; 
      }
     
      this.completed = completedCategoriesBoolean.length;
    }

  },  

  watch: {
      currentUser:function(){
        this.$forceUpdate();

         this.$store.dispatch('LOADING', false);
         if(this.user){
           let url = `${API_URL}/${this.slug}/${this.user.id}`;
         
         if(!this.requesting){
           this.httpRequest(url);
           
           this.updateRequesting();
          }
     
          
          // this.$store.dispatch('TOGGLE_LOGIN_POPUP')
          
          }
      }
   },
}
</script>

<style lang="scss">

#loader {
	background: rgba(255, 255, 255, 1);
}
p,h4{color:#000000}
.scavenger-hunt-container{background-color: #fdfdfd;}
.row{flex-flow: row;}
.offline.row{flex-direction: column;}
.category-holder {
    padding: 20px;
    margin: 20px auto;
}
.category-holder h2 {
  color:#000000;
  float:left;
  margin-top:0;
  margin-bottom:0;
}

.gallery.Link.button a,a.link{
  color:#12995c;
  text-decoration: underline;
}
.category-holder a.button {
    padding: 8px 20px;
    background-color: #12995c;
    color :white;
    border-radius: 5px;
    border: none;
    font-size: 1.2em;
}



.image-holder{
  margin-bottom: 20px;
}

.clear-fix{
  clear: both;
}


.aside-content {
    vertical-align: top;
    margin-top: 22px;

    max-height: 530px;
    padding: 20px;
    // margin: 22px 10px 0 0;

}

.category-content-holder {


    vertical-align: top;
    // margin-left:10px;

}

h4 {

    font-size: 2em;
    text-transform: capitalize;
    font-weight: normal;
    color: #8d288e;

}



.offline.row .topHeader {

    display: flex;
    flex-direction: row;
    margin:20px 0 30px;

}

.thankyou{
  font-size: 1.5em;
  flex-grow: 1;
  padding:0;
  margin:0;
}

.badgesInfoHolder {

    margin: 15px 0;

}

.badgesInfo{
  display: flex;
  margin: 10px 0;
}

.badgesInfo .description{
  margin-left:20px;
}

.locationName{
  color: #8d268f;
  font-size:1.2em;
  font-weight:600;
}

.scavengerHuntLogo {
    max-width: 512px;
}
</style>
