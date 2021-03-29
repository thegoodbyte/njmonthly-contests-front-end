<template>
  <form class='form-dr' v-on:submit="handleSubmit" id="payment-form">

      <div v-if="simpleUserForm" class="user-info-form simple">
        <div v-for="field in simpleUserForm.fields" :key="field.name" :class="field.missing && field.required === 'true' ? 'field has-error ' + field.classes : 'field ' + field.classes">
          <div v-if="field.field_type === 'text'" >
            <label :for="field.name" class="form-check-label">{{ field.title }} <span v-if="field.required === 'true'" class="red">*</span></label>
            <input 
              :id="field.name"
              :name="field.name"
              type="text" 
              class="input text empty" 
              v-model="field.value"
              :required="field.required === 'true' ? true : false"
              :placeholder="field.placeholder"
            />
            <div class="baseline"></div>
          </div>

          <div v-if="field.field_type === 'password'">
            <label :for="field.name" class="form-check-label">{{ field.title }} <span v-if="field.required === 'true'" class="red">*</span></label>
            <input 
              :id="field.name"
              :name="field.name"
              type="password" 
              class="input text empty" 
              v-model="field.value"
              :required="field.required === 'true' ? true : false"
              :placeholder="field.placeholder"
            />
            <div class="baseline"></div>
          </div>

        </div>
  
      </div>
    <button v-on:click="handleSubmit" type="submit">Register</button>
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
    console.log('current page', this.$route)
    return {
      // places: null,
      // displayMobileFilters: false,
      // MAIN_URL: MAIN_URL,

      // page: this.$route.query['page'] ? Number(this.$route.query['page']) : 1,
    }

  },

  created() {
    this.$store.dispatch('LOADING', true);
    const uri = ENV_URL + '/forms/simpleUserForm';
    this.$store.dispatch('GET_SIMPLE_USER_FORM', {uri: uri}).then( () => {
      this.$store.dispatch('LOADING', false);
    });
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    simpleUserForm() {
      console.log('computed simpleUserForm', this.$store.state.simpleUserForm)
      return this.$store.state.simpleUserForm;
    }
  },

  mounted() {

  },

  methods: {
    handleSubmit(e) {

      this.$store.dispatch('LOADING', true)
      
      const data = {
        userFormData: this.simpleUserForm.fields
      }
      
      // Send the data to the server
      let uri = ENV_URL + '/users/createUserRequest';
      axios.post(uri, data).then((response) => {
        console.log('FormUserPayment.createUser', response);

        const return_data = response.data;

        if (return_data.error === false) {
          localStorage.setItem('laravelAuthToken', response.data.laravelAuthToken);
          this.$store.commit('SET_USER', response.data.user);
          this.$store.dispatch('TOGGLE_LOGIN_POPUP');
          alert('Your account was created successfully!');
          // this.props.history.push('/admin');
        }
        else if (return_data.error == true) {
          if (return_data.error_type == 'email_exists') {
            alert(return_data.message);
            this.email_exists = true;
          } else {
            alert(return_data.message);
            
          }
        }
        
        this.$store.dispatch('LOADING', false)

      })
      .catch(function (error) {
        console.log(error);
      });

    }
  },
}
</script>

<style lang="scss">

</style>
