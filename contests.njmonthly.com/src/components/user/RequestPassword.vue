<template>
  <form class='form-dr' v-on:submit.prevent="handleSubmit">
      <div class="field">
        <label for='email' class="form-check-label">Email</label>
        <input 
          id='email' 
          name='email'
          type="text" 
          class="input text empty" 
          v-model="email"
        />
        <div class="baseline"></div>
      </div>

    <div class="form-group">
        <button class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>
<script>
import {ENV_URL} from '../../environment.js';
import axios from 'axios';
export default {
  name: 'directory-view',

  components: {
    // EntryForm,
    // ContestHeader,
  },
  data () {
    return {
      email: '',
    }

  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  mounted() {

  },

  methods: {
    handleSubmit() {

      this.$store.dispatch('LOADING', true);

      const login_info = {
        email: this.email
      }
      let uri = ENV_URL + '/send_password_reset_email';
      axios.post(uri, login_info).then((response) => {
        this.$store.dispatch('LOADING', false);
        console.log('request password reset response: ', response);
        alert(response.data.message);
      });
    }

  },
}
</script>

<style lang="scss">

</style>
