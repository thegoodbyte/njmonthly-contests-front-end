<template>
  <div>
    <h4>Selected Filters</h4>
    <div v-for="(facets, facet_key) in currentlySelectedFacets" :key="facet_key">
      
      <div v-for="facet in facets" :key="facet">
        <div v-on:click="removeFilter(facet_key, facet)">{{ facet_key }} {{ facet }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Stars from './Stars.vue';
import Trophy from './ui/Trophy.vue';

export default {
  name: 'selected-filters',
	props: ['currentlySelectedFacets'],
	components: {

	},
  computed: {

  },
  methods: {
    removeFilter(facet_key, facet) {
      let query = Object.assign({}, this.$route.query);

      // Always go to the first page when filtering
      delete query['page'];

      let facetsInFacet = this.$route.query[facet_key];
      // If we're removing it, I already know that it's in
      // the string. I just need to remove
      // Also, if I'm remove it, then facetsInFacet will exist
      console.log('facetsInFacet', facetsInFacet);
      let facetsInFacetArr = facetsInFacet.split(',');
      // let value = 

      // let facetsInFacetArr = [1, 2, 3, 4, 5, 3]

      facetsInFacetArr = facetsInFacetArr.filter(item => item !== facet);
      console.log('facetsInFacetArr', facetsInFacetArr);

      // If this was the last facet in the taxonomy
      if (facetsInFacetArr.length === 0) {
        delete query[facet_key];
      } 
      // else update the query
      else {
        query[facet_key] = facetsInFacetArr.join(',');
      }
      this.$router.push({ path: '/search/', query: query})
    }

  }
}
</script>

<style lang="scss">

</style>
