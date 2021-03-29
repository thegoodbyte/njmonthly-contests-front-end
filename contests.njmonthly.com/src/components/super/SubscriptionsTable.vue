<template>
  <div>
    <super-header></super-header>

    <div>
      <table>
        <thead>
        <tr>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Email</td>
          <td>Phone</td>
          <td>Address</td>
          <td>Sub Name</td>
          <td>Created At</td>
          <td>Entries</td>
        </tr>
        </thead>
        <tbody>
          <tr v-for="subscription in subscriptions" :key="subscription.name">
            <td>{{ subscription.first_name }}</td>
            <td>{{ subscription.last_name }}</td>
            <td>{{ subscription.email }}</td>
            <td>{{ subscription.address_phone }}</td>
            <td>{{ subscription.address_line1 }}, {{ subscription.address_city }}, {{ subscription.address_state }} {{ subscription.address_zip }}</td>
            <td>{{ subscription.product_name }}</td>
            <td>{{ subscription.subscription_created_at }}</td>
            <td>{{ subscription.entries }}</td>
          </tr>
        </tbody>
      </table>
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
    getData() {
      this.$store.dispatch('LOADING', true);

      const uri = ENV_URL + this.$route.path;

      let authHeaders = {};

      if (typeof window !== "undefined") {
        var laravelAuthToken = localStorage.getItem('laravelAuthToken');

        authHeaders = {
          headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
        };
      }

      axios.get(uri, authHeaders)
      .then((response) => { 
        this.subscriptions = response.data;
        this.$store.dispatch('LOADING', false);
      })
      .catch(function (error) {
        console.log('app error: ', error);
        this.$store.dispatch('LOADING', false);
      })
    },
  },

  watch: {
    '$route' (to, from) {

      this.getData();
    }
  },
}
</script>

<style lang="scss">

</style>
