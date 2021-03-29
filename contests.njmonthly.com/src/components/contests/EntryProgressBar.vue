<template>
  <div class="progress-holder">

   <div  class="progress-bar">
     
     <p>{{progress.percentage}}%</p>
     <span class="progress" :style="{'width':percentage}"></span>
    </div>
</div>
</template>

<script>

import {ENV_URL, S3_URL, MAIN_URL, API_URL, STRIPE_PUBLISHABLE} from '../../environment.js';
import SuperHeader from 'components/super/SuperHeader.vue';
import axios from 'axios';

export default {
  name: 'EntryProgressBar',
  props:['progress','counting'],
  components: {
 
  },

  data () {
   
    return {
      subscriptions: [],
      slug :'api/scavenger-hunt/locations/all',
      userProgress : {'width': this.counting},
      currentUser:null,
      endInterval:false,
      percentage: "0"



  
    }

  },

mounted:function(){
this.$nextTick(function () {
  
  this.test = setInterval(()=>{
    this.percentage = this.counting + "%"
   this.$emit('value-changed',this.counting)  
  },50)


   
})
  

  // this.userProgress.width += this.progress.percentage + "%"
},


  computed: {

    amountCompleted(){
      let message = '';
      if (this.progress.completed_submissions === this.progress.total_rounds){
        message = 'Completed. You have successfully completed this category. Great Job!!! '
      }
      else if( this.progress.completed_submissions > 0 ){
        message = `Completed. only ${this.progress.total_rounds - this.progress.completed_submissions} remaining. Keep going you can do it!`
      }
      else{
       return `Click enter and begin the adventure!`
      }
     return`${this.progress.completed_submissions} out of ${this.progress.total_rounds} ${message}`
    }
  },
  
  methods: {
      tryAni(){

       
       this.$emit('value-changed',this.counting)  
   
        // console.log(this.counting)
        // this.userProgress['width'] = this.counting + "%";
        // console.log(this.userProgress.width)
         
      //  console.log(`the counting is: ${this.counting} ${this.progress.percentage}`)
      //  let widthValue = parseInt(this.userProgress.width); 
      //  console.log(`${this.counting} < ${this.progress.percentage}`)
      //  if(this.counting < this.progress.percentage){
      //    widthValue++;
      //    this.$emit('value-changed',1)
      //    this.userProgress.width = this.counting + "%";
        
      //  }
      

      
    },
  },  
  watch:{
     counting:function(){
 
       if((this.counting - 1 ) === this.progress.percentage){
         clearInterval(this.test)
         console.log("update progress ", "20%")
         this.test = null;
       }
      
     },
     test:function(){
       console.log("test has updated ", this.counting )
     }
  }


}
</script>

<style lang="scss" scoped>
.progress-holder {
    margin: 20px 0;
}

.progress-bar p {
  position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    text-align: center;
    color:#2c2a2a;

}

.progress-bar {
    position: relative;
    display: block;
    margin-top: 0;
    width: 100%;
    height: 25px;
    background-color: lightgray;
    border-radius: 5px;
}

.progress {
    position: absolute;
    left: 0;
    top: 0;
    width: 0%;
    height: 25px;
    background-color: #12995c;
}

</style>
