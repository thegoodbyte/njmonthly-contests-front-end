<template>

  <div>
    <div id="loader" class="loader">
      <div class="loader-content">
      loading
      <loader></loader>
      </div>
    </div>
    <!-- <search></search>
    <div><search-places></search-places></div> -->

    <!-- <no-ssr>
      <mappp></mappp>
    </no-ssr> -->
    <div v-if="directory" :class="['search-content container', searchContentClass]">



      <div v-if="isSelects" class="row">
          <div class="col-md-12">
              <div class="section-header" style="background-image: url(&quot;&quot;);">
                  <div class="wrapper">
                      <div class="logo"><img src="//njmonthly.com/wp-content/uploads/2018/08/PSSelect-award-300x300.jpg"></div>
                      <div class="content">
                          <h3 class="title">Plastic Surgery Select</h3>
                          <h4 class="sub-title">Sponsored Content</h4>
                          <div>Plastic Surgery Select is announcing an elite grouping of the state’s top plastic surgeons across 10 procedure categories. This distinction is based on a number of criteria, including experience, qualifications, surgical volume, surgical results and reputation. The top doctors in each category are named Plastic Surgery Select doctors. Many of the plastic surgeons on this list perform other procedures in addition to those for which they have been recognized. View our methodology <a target="_blank" href="https://njmonthly.com/articles/top-doctors/plastic-surgery-select-methodology/">here</a>.</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>


      <div id="search-template" class="row">
        <div class="col-md-4 col-sm-12 map-sidebar filters-sidebar ">
          <directory-switcher></directory-switcher>
          <h3 class="filters-title-desktop">Filters</h3>


          <span class="toggle-filter" v-on:click="toggleMobileFilters">Filters <down-arrow :pointDown="pointDown"></down-arrow></span>
          
          <span class="button2" v-on:click="clearFilters" v-if="shouldClearFilters">Clear All Filters</span>

          
          <div :class="displayMobileFiltersClass">
          

          <no-ssr>
            <facet-multi facet_key="hcategory.lvl1" facet_name="Category" :facet="facets['hcategory.lvl1']">
            </facet-multi>

            <facet-multi facet_key="rating" facet_name="Rating" :facet="facets['rating']">
            </facet-multi>

            <facet-multi facet_key="hawards.lvl0" facet_name="Awards" :facet="facets['hawards.lvl0']">
            </facet-multi>

            <facet-multi facet_key="price_range" facet_name="Price Range" :facet="facets['price_range']">
            </facet-multi>
          </no-ssr>

          </div>
          <span v-if="pointDown" class="toggle-filter" v-on:click="toggleMobileFilters">Close Filters <down-arrow :pointDown="pointDown"></down-arrow></span>
        </div>
        
        <div class="col-md-8 col-sm-12 finder-content">
          <div class="list-actions clear-fix">
            <div class="clear-data"></div>
            <div class="results-count">{{ hitsCount }} results</div>
          </div>
          <div class="hits">
            <div class="dsr-hits">

              <!-- <div id="broadstreet-in-list">
                <broadstreet-zone zone-id="66356"></broadstreet-zone>
              </div>
              <div className="broadstreet-temp hide"></div> -->

              <div class="sponsored-hits">
                <div v-for="listing in sponsoredDirectory" :key="listing.objectID">
                <router-link :to="{ path: '/listing/' + listing.slug }">
                <list-item :listing="listing"></list-item>
                </router-link>
                </div>
              </div>

              <div v-for="listing in directory" :key="listing.objectID">
                
                <!-- <div v-if="listing.ad_level !== 0"> -->
                  <router-link :to="{ path: '/listing/' + listing.slug }">
                    <!-- <a :href="'/listing/' + listing.slug"> -->
                      <list-item :listing="listing"></list-item>
                    <!-- </a> -->
                  </router-link>
                <!-- </div>
                <div v-else>
                  <list-item :listing="listing"></list-item>
                </div> -->
                
              </div>
              <!-- <div class="dsr-hits--item" v-for="item in directory" :key="item.objectID" :item="item">
                <div>{{ item.title }}</div>
              </div> -->
            </div>
          </div>
          <paginate
            :value="page"
            :page-count="pageCount"
            :page-range="3"
            :margin-pages="2"
            :click-handler="changePage"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'">
          </paginate>

        </div>
      </div>
    </div>
    




  </div>

</template>

<script>
  import index from './index'

  export default index
</script>

<style lang="scss">
  @import "./index";
</style>

