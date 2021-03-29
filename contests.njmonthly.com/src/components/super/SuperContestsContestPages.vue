<template>
  <div>
    <super-header></super-header>

    <div v-for="page in pages" :key="page.id">
      <p>
        <router-link :to="'/super/contests/' + $route.params.contest + '/pages/' + page.id + '/update'">
          {{ page.title }}
        </router-link>
      </p>
    </div>
  </div>
</template>
<script>
import EntryForm from 'components/contests/EntryForm.vue';
import SuperHeader from 'components/super/SuperHeader.vue';

import {ENV_URL, MAIN_URL, STRIPE_PUBLISHABLE} from '../../environment.js';
import axios from 'axios';

export default {
  name: 'directory-view',

  components: {
    EntryForm,
    SuperHeader,
  },
  data () {
    console.log('current page', this.$route)
    return {
      pages: [],
    }

  },
  created() {

    this.$store.dispatch('LOADING', true);

    const uri = ENV_URL + this.$route.path;
    // let uri = ENV_URL + '/super/contests/' + this.props.match.params.contest + '/pages';

    axios.get(uri).then((response) => {
      const return_data = response.data;

      this.pages = response.data;

      this.$store.dispatch('LOADING', false);
      
    });
    // axios.get(uri)
    // .then((response) => {
    //   let entryForm = response.data.contestForm;

    //   this.$store.dispatch('ENTRY_FORM', {entryForm: entryForm});

    //   this.$store.dispatch('LOADING', false);

    // })
    // .catch(function (error) {
    //   console.log('app error: ', error);
    // })

  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    entryForm() {
      return this.$store.state.entryForm;
    }
  },

  mounted() {

  },

  methods: {
    formSubmitted(e) {

      this.$store.dispatch('LOADING', true);

      var laravelAuthToken = localStorage.getItem('laravelAuthToken');

      let authHeaders = {
        headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
      };

      let data = {
        form_fields: this.entryForm.fields,
      }

      // /super/contests/{contest}/entries/{id}/update
      let uri = ENV_URL + this.$route.path;
      axios.post(uri, data, authHeaders).then((response) => {
        this.$store.dispatch('LOADING', false);
        alert('Your item was created!');
      });
    },

  },

}
</script>

<style lang="scss">

</style>
