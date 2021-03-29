<template>
  <div>
    <super-header></super-header>

      <div v-if="misc">
        <p v-if="misc.votes_count">Total Votes: {{ misc.votes_count }}</p>
        <p v-if="misc.items_count">Total Entries: {{ misc.items_count }}</p>
      </div>
  </div>
</template>
<script>

import SuperHeader from 'components/super/SuperHeader.vue';

import {ENV_URL, MAIN_URL, STRIPE_PUBLISHABLE} from '../../environment.js';
import axios from 'axios';

export default {
  name: 'directory-view',

  components: {
    SuperHeader,
  },
  data () {

    return {
      misc: [],
    }

  },
  created() {

    this.$store.dispatch('LOADING', true);

    const uri = ENV_URL + this.$route.path;

    axios.get(uri).then((response) => {

      this.misc = response.data.misc;

      this.contest = response.data.contest;

      this.$store.dispatch('LOADING', false);

    });

  },

  computed: {

  },

  mounted() {

  },

  methods: {

  },

}
</script>

<style lang="scss">

</style>
