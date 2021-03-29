<template>
  <div class="facet-item">

    <label v-if="isRating">
      <input :id="facet" type="checkbox"  :value="checked" :checked="checked" @change="toggleFacet">
      <stars :rating="rating"></stars> <span class="facet-count">({{ count }})</span>
    </label>
    <label v-else :for="facet">
      <input :id="facet" type="checkbox"  :value="checked" :checked="checked" @change="toggleFacet">
      {{ cleanFacet }} <span class="facet-count">({{ count }})</span>
    </label>

    <div v-if="checked" class="facet-item child">
      <facet-child v-if="subCategory" facet_name="category" :facet_key="this.subCatKey" :facet="subCategory">
      </facet-child>
    </div>
    <!-- <div :active="checked" v-on:click="toggleFacet">{{ facet }} - {{ count }}</div> -->
  </div>
</template>


<script>
import FacetChild from 'components/FacetChild.vue';
import Stars from 'components/Stars.vue';

export default {
  name: 'facet-item',
  props: ['facet', 'facet_key', 'count'],
  components: {
    'facet-child': FacetChild,
    Stars,
  },
  computed: {
    isRating() {
      return this.facet_key === 'rating';
    },
    checked() {
      let checked = false;
      const facetInParams = this.$route.query[this.facet_key] ? true : false;
      if (facetInParams) {
        const facetsInFacet = this.$route.query[this.facet_key];
        // const facetsInFacetArr = facetsInFacet.split(',');
        // const active = facetsInFacetArr.includes(this.facet_key);
        checked = facetsInFacet.indexOf(this.facet) !== -1 ? true : false;
        // console.log('facetsInParamArr', checked, this.facet, facetsInFacet);
      }
      return checked;
    },
    cleanFacet() {
      var parts = this.facet.split(' > ');
      console.log('parts', parts);
      var cleanFacet = parts[parts.length - 1];
      return cleanFacet;
    },
    rating() {
      
      return this.facet;
    },
    subCatKey() {
      let subCatKeyPart = this.facet_key.slice(0, -1);
      let catKeyNumber = parseInt(this.facet_key.slice(-1)); // 0 or 1, etc
      let subCatKeyNumber = catKeyNumber + 1;
      let subCatKey = subCatKeyPart + subCatKeyNumber; // hawards.lvl1
      console.log('subCatKey', subCatKey);
      return subCatKey;

    },
    subCategory() {
      let relevantSubCategories = {};
      const subCategories = this.$store.state.directory.facets[this.subCatKey];

      // const subCategories = Object.keys(subCategoriesObject);
      if (subCategories !== undefined) {
        console.log('subcat length', subCategories.length, subCategories);
        for (var subCategory in subCategories) {
          if (subCategories.hasOwnProperty(subCategory)) {
            // const subCategory = subCategories[i];
            console.log('current facet', this.facet, subCategory);
            if (subCategory.indexOf(this.facet) !== -1) {
              relevantSubCategories[subCategory] = subCategories[subCategory];
            }
          }

        }
        return relevantSubCategories;
      }
      return false;

     
    	//return this.$store.state.directory.facets['hawards.lvl1'];
    }

  },
  methods: {
    toggleFacet: function (event) {

    // const searchOptions = {
    //   currentlySelectedFacets: currentlySelectedFacets,
    //   directoryQuery: directoryQuery
    // }

    // this.$store.commit('SET_DIRECTORY_SEARCH_OPTIONS', { searchOptions });

    let query = Object.assign({}, this.$route.query);

    // Always go to the first page when filtering
    delete query['page'];

    // Get the currently selected categories for this facet
    let facetsInFacet = this.$route.query[this.facet_key];

    // Generate new queries object
    // Remove any filters
    if (event.target.checked) {
      // add this facet to the query

      // If the category is being checked, I will proceed as normal
      // with the filtering.
      // However, I will clear any other selected categories in the awards
      // and when I receive a response, I will 
      // show the years (sub category) under this award (if there are any years)

      // The years sub category will have to know which category it's under.
      // When a year is selected, I will simply proceed as normal,
      // However, I will clear any currently selected years before 
      // selecting a new year.

      // Actually, does the year have to know what its' parent is?
      // No. If I select a year, it will just further filter the results
      // without knowing which award categories are selected
      // If that's the case, I think I can reuse the Facet for the year facet
      //  but I do need a separate FacetCategory (FacetAwardCategory) that
      // displays the year Facet (sub category) if there are any.
      // I can assume the categories in the year facet are relevant
      // to the award category that has been selected since Algolia
      // only shows relevant categories.


      
      // If there are currently facet items in this taxonomy,
      // add it to the string
      if (facetsInFacet) {
        const newFacetString = facetsInFacet + ',' + this.facet;
        query[this.facet_key] = newFacetString;
      }
      // else if it doesn't exist, make sure to add the objct
      else {
        query[this.facet_key] = this.facet;
      }

    } else {

        // If we're removing it, I already know that it's in
        // the string. I just need to remove
        // Also, if I'm remove it, then facetsInFacet will exist
        console.log('facetsInFacet', facetsInFacet);
        let facetsInFacetArr = facetsInFacet.split(',');
// let value = 

// let facetsInFacetArr = [1, 2, 3, 4, 5, 3]

facetsInFacetArr = facetsInFacetArr.filter(item => item !== this.facet);
console.log('facetsInFacetArr', facetsInFacetArr);

          // If this was the last facet in the taxonomy
          if (facetsInFacetArr.length === 0) {
            delete query[this.facet_key];
          } 
          // else update the query
          else {
            query[this.facet_key] = facetsInFacetArr.join(',');
          }

    }



    // change the database state
    // change the route to cause the api to fetch data 
    // using the udated state
    // To change the route, I have to get the search string
    // for the route

    // Add the following if trying to implement SEO friendly URLs
    // + this.$route.params.section
      // this.$router.push({ path: '/search/', query: query})
      console.log('router.path', this.$router.path);
      this.$router.push({ path: this.$route.path, query: query})
    },
  },

  // data () {
  //   console.log(this.$route.query[this.facet_key])
  //   return {
  //     isActive: this.$route.query[facet_key],
  //   }
  // },
}
</script>

<style lang="scss">
.news-item {
  background-color: #fff;
  padding: 20px 30px 20px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px
}

.news-item .score {
  color: #f60;
  font-size: 1.1em;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 0;
  width: 80px;
  text-align: center;
  margin-top: -10px
}

.news-item .host,
.news-item .meta {
  font-size: .85em;
  color: #828282
}

.news-item .host a,
.news-item .meta a {
  color: #828282;
  text-decoration: underline
}

.news-item .host a:hover,
.news-item .meta a:hover {
  color: #f60
}
</style>
