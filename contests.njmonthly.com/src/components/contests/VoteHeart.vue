<template>
<div  v-if="users_allowed_to_vote ">
  
  <div  :class="'vote-heart-container '" v-on:click="handleVote"  >
        <svg version="1.1" :class="'Capa_1 vote-heart ' + voted" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        viewBox="0 0 50 50" >
          <path d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543
        c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503
        c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z"/>
        </svg>
        <span class="vote-text">Vote!</span>
      </div>
</div>

     
</template>
<script>
export default {
  name: 'directory-view',

  components: {

  },
  props: ['entry','contest_id','admin_level'],
  data () {
    return {
      places: null,
      users_allowed_to_vote: true,
      showHeart:'show-heart'
    }

  },
  created() {

  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    voted() {
      return this.entry.VotesCount === 1 ? 'true' : 'false';
    },



  },

  mounted() {
    this.allow_users_to_vote();
  },

  methods: {
    handleVote() {
      // Check to see if they're registered
      if (!this.user) {
        alert('Please login or register to vote using the popup. Thank you!');
        this.$store.dispatch('TOGGLE_LOGIN_POPUP');
        // this.props.toggleLoginPopup(this.props.loginPopup);
        return;
      }
      this.$store.dispatch('HANDLE_VOTE', this.entry);
      // this.props.handleVote(this.props.entry);
    },
    allow_users_to_vote(){
      let only_admin_can_vote_contests = [6,8]; //if contest id is in this array only admin can vote
      if(only_admin_can_vote_contests.indexOf(this.contest_id) !== -1){
         if(this.admin_level < 10){
           this.users_allowed_to_vote = false;
         }
      }

      // this.users_allowed_to_vote = only_admin_can_vote_contests.indexOf(this.contest_id) !== -1 ? false : true ;
     
      console.log("the user is allowed to vote " + this.users_allowed_to_vote );

    }
  }

}
</script>

<style lang="scss">
  .hide-Heart{
    display: none;
  }
</style>
