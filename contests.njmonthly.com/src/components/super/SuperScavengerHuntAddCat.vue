<template>
  <div>
    <super-header></super-header>

    <div v-if="entryForm">

      <entry-form @submitted="formSubmitted"></entry-form>

    </div>
  </div>
</template>
<script>
import EntryForm from 'components/contests/EntryForm.vue';
import {ENV_URL, MAIN_URL, STRIPE_PUBLISHABLE} from '../../environment.js';
import axios from 'axios';
import SuperHeader from 'components/super/SuperHeader.vue';

export default {
  name: 'directory-view',

  components: {
    EntryForm,
    SuperHeader,
  },
  data () {
    console.log('current page', this.$route)
    return {
    }

  },
  created() {

    this.$store.dispatch('LOADING', true);

    const uri = ENV_URL + this.$route.path;

    this.$store.dispatch('SUPER_CONTESTS_CREATE', {uri: uri}).then(() => {

      this.$store.dispatch('LOADING', false);

    })

  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    entryForm() {
      return this.$store.state.entryForm;
    },
    entry() {
      return this.$store.state.entry;
    },
  },

  mounted() {
    console.log(`the environment url is ${ENV_URL}`);
  },

  methods: {
    formSubmitted(e) {

      this.$store.dispatch('LOADING', true);

      var laravelAuthToken = localStorage.getItem('laravelAuthToken');

      let authHeaders = {
        headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
      };

      const item_data = {
        form_fields: this.entryForm.fields,
      }

      // /super/contests/{contest}/entries/{id}/update
      let uri = ENV_URL + this.$route.path;
      axios.post(uri, item_data, authHeaders).then((response) => {
        this.$store.dispatch('LOADING', false);
        alert('The new contest was created!');
      });
    },

  },

}
</script>

<style lang="scss">

</style>
