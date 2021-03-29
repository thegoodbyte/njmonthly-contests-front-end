<template>
  <div>
    <div class="content-holder">
      <div class="request-form">
        <input id="start_id" class="form-control" type="text" placeholder="Start Id #">
        <input id="end_id" type="text" placeholder="End Id #">
        <button v-on:click="formSubmitted"> start </button>
      </div>
      
    </div>
  </div>
</template>
<script>
// import EntryForm from 'components/contests/EntryForm.vue';
import {ENV_URL, S3_URL, MAIN_URL, API_URL, STRIPE_PUBLISHABLE} from '../../environment.js';
import SuperHeader from 'components/super/SuperHeader.vue';
import axios from 'axios';

export default {
  name: 'directory-view',

  components: {
    SuperHeader,
  },
  data () {
    console.log('current page', this.$route)
    return {
      subscriptions: [],

      // page: this.$route.query['page'] ? Number(this.$route.query['page']) : 1,
    }

  },
  created() {

    this.getData();

  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  mounted() {

  },

  methods: {
    formSubmitted(e){
      let start_id = parseInt(document.querySelector("#start_id").value);
      let end_id = parseInt(document.querySelector("#end_id").value);
      let itemId =  start_id;
      let content = document.querySelector(".content-holder");
      console.log(`the start id is ${start_id} and the end is ${end_id }`)
      while(itemId  <= end_id){
        let response =  this.httpRequest(itemId)
        console.dir(response)
        content.innerHTML += response
         console.log(`the start id is ${itemId} and the end is ${end_id }`)
         itemId++
       
      }
      
    },
    httpRequest(itemId){
      let  $url = `https://contestsapi.njmonthly.com/api/super/items/${itemId}/createZipFolderWithItemImages`;
      let showUser = '';
       axios.get($url)
       .then(function (response) {
         // handle success
         showUser = `${itemId} ${response.data}`
         console.log(response);
       })
       .catch(function (error) {
        // handle error
         showUser = `${itemId} could not activate`
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
      return showUser;
    },
    getData(){},
  },  

  watch: {
    '$route' (to, from) {

      this.getData();
    }
  },
}
</script>

<style lang="scss">
#start_id,#end_id{margin-right:10px; display: inline-block;}
</style>
