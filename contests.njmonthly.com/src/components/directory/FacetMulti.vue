<template>
  <div v-if="facet">
    <div :id="facet_key" :class="[facet_key, 'filter-section-container']">
      <div class="filter-toggle">
        <div class="filter-toggle-filter" v-on:click="toggleFacet">
          <h3 class="filter-title">{{ facet_name }}</h3>
          <span class="toggle-signs">
            <down-arrow :pointDown="pointDown"></down-arrow>
          </span>
        </div>
      </div><!-- .filter-toggle -->
      <div :class="['filter-section', truncatedClass]">

        <div class="fc-container">
          <div class="filter-checkboxes">
              <facet-award-category v-for="(count, facetName) in orderedFacet" :key="facetName" :item="facetName" :count="count" :facet_key="facet_key" :facet="facetName"></facet-award-category>

          </div>
        </div>
      </div>
    </div><!-- .filter-section-container -->
  </div>
</template>


<script>
import FacetAwardCategory from './FacetAwardCategory.vue';
import DownArrow from './ui/DownArrow.vue';
export default {
  



  name: 'facets-item',
  props: ['facet', 'facet_key', 'facet_name'],
  data() {
    return {
      displayMobileFilter: false,
      truncated: true
    }
  },
  components: {
    'facet-award-category': FacetAwardCategory,
    'down-arrow': DownArrow,
  },
  computed: {
    orderedFacet() {
      // console.log('ordered', this.facet)
      const ordered = {};
      Object.keys(this.facet).sort().forEach(function(key) {
        // console.log('ordered', this.facet, key)
        ordered[key] = this.facet[key];
      }, this);
      // console.log('ordered', ordered);
      return ordered;
    },
    truncatedClass() {
      // const needsTruncation = Object.keys(this.facet).length > 8;
      return this.truncated ? 'truncated' : '';
    },
    needsTruncation() {
      return Object.keys(this.facet).length > 8;
    },
    pointDown() {
      // If it truncated, assume we are pointing down
      return this.truncated ? false : true;
    },
    multi(){
      return this.facet_key === 'hcategory.lvl1' || this.facet_key === 'hawards.lvl0';
    }

  },
  methods: {
    toggleFacet: function() {
      this.truncated = !this.truncated;
    }
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
