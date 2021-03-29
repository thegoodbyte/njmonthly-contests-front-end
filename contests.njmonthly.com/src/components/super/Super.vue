
<template>
  <div>
    <super-header />
    <div><router-link class="action-btn" to="/super/contests">Contests</router-link></div>
  </div>
</template>
<script>
import SuperHeader from 'components/super/SuperHeader.vue';

import axios from 'axios';
export default {
  name: 'directory-view',

  components: {
    SuperHeader,
  },
  data () {
    return {

    }

  },
  created() {

  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  mounted() {

  },

  methods: {
    formSubmitted() {
    },
  },
}
</script>

<style lang="scss">

</style>
