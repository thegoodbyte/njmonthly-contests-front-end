<template>
      <div>
        <div  class="example example2">
        <h1 class="text-center">Reset Password</h1>
        <form v-if="!user" v-on:submit="handleSubmit">
            <div class="field">
                <label class="form-check-label">Email</label>
                <input type="email"
                  id="email"
                  name="email"
                  class="input text"
                  v-model="email" 
                  required 
                  autoFocus
                  />
                  <div class="baseline"></div>
            </div>

            <div class="field">
                <label class="form-check-label" name="product_price">Password</label>
                <input type="password" class="input text"
                  v-model="password"
                  id="password"
                  name="password"
                  required />
                  <div class="baseline"></div>
            </div>

            <div class="field">
                <label class="form-check-label" name="password_confirmation">Confirm Password</label>
                <input type="password" class="input text"
                  v-model="password_confirmation"
                  id="password_confirmation"
                  name="password_confirmation"
                  required />
                  <div class="baseline"></div>
            </div>

            <div class="field">
                <button class="btn btn-primary">Reset Password</button>
            </div>
        </form>

        <p v-if="user">You are already logged in. No need to reset your password!</p>
        </div>
    </div>
</template>
<script>
import {ENV_URL} from '../../environment.js';
import axios from 'axios';

export default {
  name: 'directory-view',

  components: {

  },
  data () {
    console.log('current page', this.$route)
    return {
      ENV_URL: ENV_URL,
      email: '',
      password: '',
      password_confirmation: '',
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
  handleSubmit(event) {

    this.$store.dispatch('LOADING', true);

    event.preventDefault();
    const password_reset_data = {
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation,
      token: this.$route.params.token,
    }
    let uri = ENV_URL + '/reset_user_password';
    axios.post(uri, password_reset_data).then((response) => {
      this.$store.dispatch('LOADING', false);

      console.log('reset pw response: ', response);
      // alert(response.data.message);
      if (response.data.error == true) {
        alert(response.data.message);
        return;
      }

      alert(response.data.message);

    });
  }
  },

}
</script>

<style lang="scss">

</style>
