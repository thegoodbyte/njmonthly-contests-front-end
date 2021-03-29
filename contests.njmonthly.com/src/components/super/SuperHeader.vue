<template>
  <div class="super-admin-menu-wrapper">
    <div  class="super-admin-menu">
      <ul>
        <li><router-link :to="'/super/contests'">Contests</router-link></li>
          <ul v-if="showSubMenu">
            <li><router-link :to="'/super/contests/' + this.$route.params.contest">{{ this.contest ? this.contest.title : this.$route.params.contest}}</router-link></li>
            <ul>
              <li><router-link :to="'/super/contests/' + this.$route.params.contest + '/update'">Update Contest</router-link></li>
              <li><router-link :to="'/super/contests/' + this.$route.params.contest + '/entries'">Entries</router-link></li>
              <li><router-link :to="'/super/contests/' + this.$route.params.contest + '/entries/create'">Create Entry</router-link></li>
              <li><router-link :to="'/super/contests/' + this.$route.params.contest + '/pages'">Pages</router-link></li>
              <li><router-link :to="'/super/contests/' + this.$route.params.contest + '/pages/create'">Create Page</router-link></li>
              <li><router-link :to="'/super/contests/' + this.$route.params.contest + '/create-category'">Create Category</router-link></li>
              <li><router-link :to="'/super/contests/' + this.$route.params.contest + '/forms'">Forms</router-link></li>
              <li><router-link :to="'/super/contests/' + this.$route.params.contest + '/api-creation'">Create Api </router-link></li>

              <li><router-link :to="'/contests/' + this.$route.params.contest + '/free-entry'">Create Free Entry</router-link></li>
              <li><router-link :to="'/super/contests/' + this.$route.params.contest + '/subscriptions-table'">View Subscriptions Table</router-link></li>
              <li><router-link :to="'/super/contests/' + this.$route.params.contest + '/purchases-table'">View Purchases Table</router-link></li>
            </ul>
          </ul>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
  name: 'super-header',

  components: {

  },
  data () {
    console.log('current page', this.$route)
    return {
      places: null,
      displayMobileFilters: false,

      // page: this.$route.query['page'] ? Number(this.$route.query['page']) : 1,
    }

  },
  created() {

  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    showSubMenu() {
      console.log('showSubMenu', this.$route.params)
      return this.$route.params && this.$route.params.contest;
    },
    contest() {
      return this.$store.state.contest;
    }
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
