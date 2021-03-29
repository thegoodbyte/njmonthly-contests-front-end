<template>
  <div>
    <super-header></super-header>
    <div v-if="entries">

      <h1 className="text-center">{{ this.contest ? contest.title : '' }} Entries</h1>

      <div className="grid-canvas">
        <table id="grid-canvas">

          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Files</th>
              <th>Actions</th>
              <th>User Info</th>
            </tr>
          </thead>

          <tbody>

            <tr v-for="(entry, idx) in entries" :key="entry.id" class='ui-widget-content slick-row'>

              <td>{{ entry.id }}</td>
              
              <td>
                <div style="width: '130px;">
                  <a :href="S3_URL + '/' + entry.media_id + '/' + (entry.media[0] !== undefined ? entry.media[0].file_name : '')" target="_blank">
                    <img class="card-img-top" :src="S3_URL + '/' + entry.media_id + '/conversions/thumb.jpg'" />
                  </a>
                  <div class="action-btn" v-on:click="downloadFile(entry)">Download</div>
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
                <p v-if="entry.purchase_id">
                  <strong>Purchase ID/Stripe Order ID:</strong>&nbsp;
                  {{entry.purchase_id}}<a :href="'https://dashboard.stripe.com/search?query=' + entry.stripe_order_id" target="_blank">/{{entry.stripe_order_id}}</a>
                </p>
                <div>
                  <h5>Meta</h5>
                  <span v-for="meta in entry.meta" :key="meta.value">{{ meta.key }}: {{ meta.value }}, </span>
                </div>
                <p>Created on: {{ entry.created_at }}</p>

                <p v-if="entry.votes">Votes: {{ entry.votes }}</p>
              
              </td>

              <td>
                <div v-for="media in entry.media" :key="media.id">
                  <a v-if="media.collection_name == 'files'" target="_blank" :href="S3_URL + '/' + media.id + '/' + media.file_name"> {{ media.file_name }}</a>
                </div>
              </td>

              <td>

                <span v-on:click="handleVisibilitySubmit(idx)" class="action-btn">
                  {{ entry.active ? 'Hide' : 'Approve' }}
                </span>

                <span v-on:click="removeItem(entry.id)" class="action-btn">Delete</span>

                <router-link :to="'/admin/my-items/' + entry.id + '/forms'" class="action-btn">Upload Forms</router-link>

                <router-link :to="'/super/entries/' + entry.id" class="action-btn">Edit</router-link>

              </td>

              <td v-if="entry.user">
                {{ entry.user.id + ': ' + entry.user.name + ' ' + entry.user.last_name + ' | ' + entry.user.email + ' '}}
                (<a :href="'https://dashboard.stripe.com/search?query=' + entry.user.email" target="_blank">Stripe</a>)
                {{ ' | ' + entry.user.address_phone }} <br/> 
                <div v-if="entry.user && entry.user.meta">
                  <h5>Meta</h5>
                  <span v-for="item in entry.user.meta" :key="item.value">{{ item.value }}, </span>
                </div>
              </td> 
              <td v-else>
                No user
              </td>

            </tr>

          </tbody>

        </table>

      </div>

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
      entries: null,
      contest: null,
      is_admin: false,
      columns: null,
      loaded: false,
      S3_URL: S3_URL,

      // page: this.$route.query['page'] ? Number(this.$route.query['page']) : 1,
    }

  },
  created() {
    let entries = this.entries;
    let contest = this.$store.state.contest;
    // If entriesData is empty, or if we're switching the contest (e.g.,
    // the slug of the current contest does not match what's in state)
    if (!entries || (contest && contest.slug !== this.$route.params.contest)) {
      // this.$store.dispatch('TOGGLE_LOADING', {loading: this.$store.state.loading})
      // this.$bar.start();


      this.$store.dispatch('LOADING', true);


      const uri = ENV_URL + '/super/contests/' + this.$route.params.contest + '/entries';
      
      // this.props.getContest(uri);

      let authHeaders = {};

      if (typeof window !== "undefined") {
        var laravelAuthToken = localStorage.getItem('laravelAuthToken');

        authHeaders = {
          headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
        };
      }

      console.log('authHeaders in super', authHeaders);

      // let query_params = window.location.search;
      // Example query: /items/get_super_items?active=1&contest_id=14&search=Hold%20your%20tongue&column_name=item_description
      axios.get(ENV_URL + '/super/contests/' + this.$route.params.contest + '/entries', authHeaders)
      .then((response) => {

        this.$store.dispatch('LOADING', false);

        console.log('editable response: ', response);
        if (response.data.logged_in == false) {
          alert(response.data.message);
        }
        this.entries = response.data.items;
        this.columns = response.data.columns;
        this.loaded = response.data.loaded;
        this.contest = response.data.contest;

      })
      .catch(function (error) {
        console.log(error);
      })
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
    formSubmitted() {
    },
    downloadFile(entry) {

      const uri = ENV_URL + '/super/items/' + entry.id + '/createZipFolderWithItemImages';

      axios.get(uri).then((response) => {

        console.log('res', response);

        const urlToSend = API_URL + '/images-to-download/' + this.contest.slug + '/' + entry.item_name + '_' + entry.user.email + '.zip';

        window.open(urlToSend, '_blank').focus();

      });

    },
    handleVisibilitySubmit(arr_key) {

      let isActive = this.entries[arr_key]['active'];

      this.entries[arr_key]['active'] = !isActive;

      const products = {
        is_visible: !isActive,
        id: this.entries[arr_key]['id'],
      }

      let uri = ENV_URL + '/items/update_visibility';
      axios.patch(uri, products).then((response) => {

      });
    },
    // Remove the entry from the database and the view
    removeItem(id) {
      const user_confirm = window.confirm('Are you sure you want to delete this item?');
      if (user_confirm == false) {
        return;
      }
      var laravelAuthToken = localStorage.getItem('laravelAuthToken');

      let authHeaders = {
        headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
      };
      // remove the item from the database
      let uri = ENV_URL + '/items/' + id;
      axios.delete(uri, authHeaders).then((response) => {
        console.log('del res: ', response);
      });
      this.entries = this.entries.filter(function(entry) {
          return entry.id !== id
        })
      // // remove the item from state (removes the item from the view)
      // this.setState({
      //   items: this.state.items.filter(function(item) {
      //     return item.id !== id
      //   })
      // });
    },
  },

  watch: {
    '$route' (to, from) {


    }
  },
}
</script>

<style lang="scss">

</style>
