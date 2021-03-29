<template>
  <div class="">

    <div class="category-content-holder">
      <div class="category-holder">
 
     
          <div class="image-holder"><img v-bind:src="category.banner_image" /></div>
          <div class="content-info">
            <div class="info-holder">
              
              <p><a class="link" href="https://njmonthly.com/articles/jersey-living/great-njm-scavenger-hunt-2020/"> Read about {{category.title}} locations </a></p>
              
              
    
              <a class="button" :href="'/contests/scavenger-hunt/entries/create?cat='+ category.slug"> {{contestCompleted(category.progress.percentage) ? "Upload Image" : "Completed"}}</a>
              <div class="clear-fix"></div>
              <EntryProgressBar :counting="myCount" :progress="category.progress" @value-changed="widthValue"    />
              <p class="info" v-if="category.progress.waiting_approval > 0">You have {{category.progress.waiting_approval}} images awaiting approval</p>
            
              <!-- <span  :id="category.slug" class="progress-bar"><span v-bind:style="styleObject[category.slug]" class="progress"></span></span> -->

            </div>
          </div>
       

      </div>
    </div>
    
  </div>
</template>

<script>
// import EntryForm from 'components/contests/EntryForm.vue';
import {ENV_URL, S3_URL, MAIN_URL, API_URL, STRIPE_PUBLISHABLE} from '../../environment.js';
import SuperHeader from 'components/super/SuperHeader.vue';
import EntryProgressBar from 'components/contests/EntryProgressBar.vue'
import axios from 'axios';

export default {
  name: 'displayCategories',
  props:['category','user'],
  components: {
    EntryProgressBar
  },

  data () {
   
    return {
      subscriptions: [],
      allowRequest:false,
      currentUser:null,
      styleObject:{width:0},
      myCount:0
    
    }

  },
  mounted:function(){
    console.log(this.category.progress.percentage)

   this.styleObject.width = this.category.progress.percentage || 0;
  },
  methods:{
    widthValue(value){
      this.myCount = value;
      this.myCount++;
    },

    contestCompleted(percentage){
      return percentage < 100;
    },

    setStyle(style,value){
     this.styleObject[style] = value;
    }
  }


}
</script>

<style lang="scss">
.category-holder {
    padding: 20px;
    background-color: 
    white;
    margin: 20px auto;
}
.category-holder h2 {
  color:#000000;
  float:left;
  margin-top:0;
  margin-bottom:0;
}

.category-holder a.link{
  color: #12995c;
  text-decoration: underline;
  float: left;
  margin-top:0;
  font-size: 1.3em;
  margin-bottom:0;
  padding: 8px 0;
}
.category-holder a.button {
    padding: 8px 20px;
    background-color: #12995c;
    color :white;
    border-radius: 5px;
    float: right;
}

p.info{
  color: #dcae26;
  font-weight: normal;
  font-size:1.2em;
}


.image-holder{
  margin-bottom: 20px;
}

.clear-fix{
  clear: both;
}



.category-content-holder {
    width:100%;
    vertical-align: top;
  

}

h4 {

    font-size: 22px;
    text-transform: capitalize;
    font-weight: normal;

}

p,h4{color:#000000}

@media only screen and (max-width:850px){
  .scavenger-hunt-container .row{
    flex-flow:column;
  }

  .aside-content{
    max-height: 100%;
  }
}
</style>
