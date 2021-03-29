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
        <!-- {{ facet_name }} -->
        <div class="fc-container">
          <div class="filter-checkboxes">
            <facet-category v-for="(count, facet) in facet" :key="facet" :item="facet" :count="count" :facet_key="facet_key" :facet="facet"></facet-category>
          </div>
        </div>
      </div>
    </div><!-- .filter-section-container -->
  </div>
</template>


<script>
import FacetCategory from './FacetCategory.vue';
import DownArrow from './ui/DownArrow.vue';
export default {
  



  name: 'facets-item',
  props: ['facet', 'facet_name', 'facet_key'],
  data() {
    return {
      displayMobileFilter: false,
      truncated: true
    }
  },
  components: {
    'facet-category': FacetCategory,
    'down-arrow': DownArrow,
  },
  computed: {
    truncatedClass() {
      return this.truncated ? 'truncated' : '';
    },
    pointDown() {
      // If it truncated, assume we are pointing down
      return this.truncated ? false : true;
    },
    hasFacet() {
      console.log('hasFacet', this.facet);
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
