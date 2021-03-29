<template>

  <div>

    <super-header></super-header>

    <div v-if="entryForm && entry">

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
    this.$store.dispatch('SUPER_ENTRIES_ENTRY_UPDATE', {uri: uri}).then(() => {

      this.$store.dispatch('LOADING', false);

      // if (this.entry) {
      //   console.log('populating entry');
      //   let entryForm = Object.assign({}, this.entryForm);

      //   let entry = this.entry;
    
      //   entryForm.fields.map(function(field, index) {
    
      //     // console.log('field', index);
    
      //     if (field.type === 'field') {
      //       field.value = entry[field.name];
      //     } else if (field.type === 'meta' && entry.meta[field.name]) {
      //       field.value = entry.meta[field.name].value;
      //     } else if (field.type === 'image') {
      //       field.image_id = entry.media_id;
      //     }
    
      //   })

      //   this.$store.commit('SET_ENTRY_FORM', { entryForm });

      //   // this.$store.dispatch('SET_ENTRY_FORM', {entryForm: entryForm});
    
      //   // this.props.setContestEntryFormData(entryForm);
      // }
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

  },

  methods: {
    formSubmitted(e) {

      this.$store.dispatch('LOADING', true);

      var laravelAuthToken = localStorage.getItem('laravelAuthToken');

      let authHeaders = {
        headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
      };

      const item_data = {
        entry_form_fields: this.entryForm.fields,
      }

      // /super/contests/{contest}/entries/{id}/update
      let uri = ENV_URL + this.$route.path;
      axios.patch(uri, item_data, authHeaders).then((response) => {
        this.$store.dispatch('LOADING', false);
        alert('Your item was updated!');
      });
    },

  },

}
</script>

<style lang="scss">

</style>
