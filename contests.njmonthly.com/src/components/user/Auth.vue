<template>

  <div class="cell example example2 pet-info-form">
    <span class="close-login" v-on:click="toggleLoginPopup">
      <close />
    </span>
    <div class="form-group">

      <div class="admin-section">

        <span v-on:click="toggleLogin" class="admin-btn">Login</span>

        <login v-if="showLogin" />

      </div>

      <div class="admin-section">

        <span v-on:click="toggleForgotPassword" class="admin-btn">Forgot Password?</span>

        <request-password v-if="showForgotPassword" />

      </div>

      <div class="admin-section">

        <span v-on:click="toggleRegister" class="admin-btn">Register</span>

        <register v-if="showRegister" />

      </div>

    </div>

  </div>
 
</template>
<script>
import Register from 'components/user/Register.vue';
import Login from 'components/user/Login.vue';
import RequestPassword from 'components/user/RequestPassword.vue';
import Close from 'components/ui/Close.vue';

export default {
  name: 'auth',

  components: {
    Register,
    Login,
    RequestPassword,
    Close,
  },
  data () {
    console.log('current page', this.$route)
    return {
      showForgotPassword: false,
      showRegister: false,
      showLogin: true,
    }

  },

  computed: {
    user() {
      return this.$store.state.user;
    },

  },

  methods: {
    toggleForgotPassword() {
        this.showForgotPassword = !this.showForgotPassword
        this.showRegister = false
        this.showLogin = false
    },

    toggleRegister() {
        this.showRegister = !this.showRegister
        this.showForgotPassword = false
        this.showLogin = false
    },

    toggleLogin() {
        this.showLogin = !this.showLogin
        this.showForgotPassword = false
        this.showRegister = false
    },
    toggleLoginPopup() {
      this.$store.dispatch('TOGGLE_LOGIN_POPUP');
    },
  },

}
</script>

<style lang="scss">
.admin-btn {
    margin-bottom: 18px;
    display: block;
}
</style>
