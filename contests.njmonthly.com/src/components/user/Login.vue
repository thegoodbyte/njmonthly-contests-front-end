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

    <div class="field">
      <label for="password" class="form-check-label">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        class="input text empty"
        v-model="password"
      />
      <div class="baseline"></div>
    </div>

    <div class="form-group">
        <button class="btn btn-primary">Login</button>
    </div>

  </form>
</template>
<script>
import {ENV_URL} from '../../environment.js';
export default {
  name: 'directory-view',

  components: {
    // EntryForm,
    // ContestHeader,
  },
  data () {
    return {
      email: 'webmaster@njmonthly.com',
      password: '',
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
      const login_info = {
        email: this.email,
        password: this.password,
      }

      this.$store.dispatch('POST_LOGIN', {login_info});


    }

  },
}
</script>

<style lang="scss">

</style>
