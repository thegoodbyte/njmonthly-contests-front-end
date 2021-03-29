<template>
  <tr :id="entry.id" class='ui-widget-content slick-row'>

    <td>{{ entry.id }}</td>
    
    <td>
      <div style="width: '130px;">
        <a :href="S3_URL + '/' + entry.media_id + '/' + filename" target="_blank">
          <img class="card-img-top" :src="image_url" />
        </a>
        <div v-on:click="downloadFile">Download</div>
      </div>
    </td>

    <td>{{ entry.item_name }}</td>

    <td>
      <p>Description: {{ entry.item_description }}</p>
      <p>
        item_att1: {{ entry.item_att1}}<br/>
        item_att2: {{ entry.item_att2}}<br/>
        item_att3: {{ entry.item_att3}}
      </p>
      <p>Purchase ID: {{entry.purchase_id}}</p>
      <div>
        <h5>Meta</h5>
        <span v-for="item in meta" :key="item.value">{{ item.value }}, </span>
      </div>
    
    </td>

    <td>
      <div v-for="media in entry.media" :key="media.id">
        <a target="_blank" :href="S3_URL + '/' + media.id + '/' + media.file_name"> {{ media.file_name }}</a>
      </div>
    </td>

    <td>

      <span v-on:click="handleVisibilitySubmit" class="action-btn">
        {{ entry.active ? 'Hide' : 'Approve' }}
      </span>

      <span v-on:click="removeItem(entry.id)" class="action-btn">Delete</span>

      <router-link :to="'/admin/my-items/' + entry.id + '/forms'" class="action-btn">Upload Forms</router-link>

      <router-link :to="'/super/entries/' + entry.id" class="action-btn">Edit</router-link>

    </td>

    <td v-if="entry.user">{{ entry.user.id + ': ' + entry.user.name + ' ' + entry.user.last_name + ' | ' + entry.user.email + ' | ' + entry.user.address_phone }} <br/> 
      <div v-if="entry.user && entry.user.meta">
        <h5>Meta</h5>
        <span v-for="item in entry.user.meta" :key="item.value">{{ item.value }}, </span>
      </div>
    </td> 
    <td v-else>
      No user
    </td>

  </tr>
</template>
<script>
import EntryForm from 'components/contests/EntryForm.vue';
export default {
  name: 'directory-view',

  components: {
    EntryForm,
    ContestHeader,
  },
  data () {
    console.log('current page', this.$route)
    return {
      places: null,
      displayMobileFilters: false,
      MAIN_URL: MAIN_URL,

      // page: this.$route.query['page'] ? Number(this.$route.query['page']) : 1,
    }

  },
  created() {
    let entryForm = this.$store.state.entryForm;
    let contest = this.$store.state.contest;
    if (!entryForm || (contest && contest.slug !== this.$route.params.id)) {
      console.log('Getting new data')
      const uri = ENV_URL + this.$route.path;
      this.$store.dispatch('CONTESTS_CONTEST_ENTRIES_CREATE', {uri: uri})
    }
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  mounted() {

    if (typeof window !== "undefined") {

      this.$ga.set(this.$route.fullPath);
      this.$ga.page(this.$route.fullPath);
    }
  },

  serverAsyncData({store, to, from}) {

    const state = store.state;

    // Set the rest of the searchOptions using the query.
    // to and from are undefined when coming from a different page
    // and when the page first loads, so use the query in the route
    let route = {};
    if (to !== undefined) {
      route = to;
    } else if (from === undefined) {
      route = state.route;
    } else {
      route = state.route.from
    }
    // return store.dispatch('FETCH_DIRECTORY', {route})

    const uri = ENV_URL + route.path;
    return store.dispatch('CONTESTS_CONTEST_ENTRIES_CREATE', {uri: uri})

  },
  methods: {
    formSubmitted() {
    },
  },

  watch: {
    '$route' (to, from) {
      this.$store.dispatch('TOGGLE_LOADING', {loading: this.$store.state.loading})
      this.$store.dispatch('FETCH_DIRECTORY', { route: this.$route }).then(() => {

        this.$store.dispatch('TOGGLE_LOADING', {loading: this.$store.state.loading})

      }, this)

    }
  },
}
</script>

<style lang="scss">

</style>
