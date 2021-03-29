<template>
  <div>
      <div class='container'>
        
        <div :class="['single-article', listing.section]">

          <div class='row article-content-wrapper'>
            <div class='col-md-8 col-sm-12'>
              <div class="row">
                <div class="col-md-12">
                  <a class="go-back" @click="$router.go(-1)">&lt; Go back</a>
                </div>
              </div>
              <div v-if="sponsored" class='row article-head'>
                
                <div class="col-md-12">
                  <!-- <div class="breadcrumbs"><a :href="'/search?section=' + listing.section">{{ listing.section }}</a> > {{ listing.title }}</div> -->
                  <div v-if="listing.image" class='hit-image'>
                    <div class='image'>
                      <img :src="listing.image" />
                    </div>
                  </div>
                  <randomo v-if="listing.video" :video-id="listing.video" :title="listing.title"></randomo>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  
                  <div class="dir-block">
                    <div v-if="sponsored" class="sponsored">
                      Sponsored
                    </div>
                    <div class="listing-location">
                      <h1 class="dir-title" v-html="listing.title"></h1>
                      
                      <!-- Category -->
                      <div v-if="cleanCategories" class='dir-categories dir-block__categories'>
                        
                        <h3 class='dir-block__categories-title'>{{ cleanCategories.length > 1 ? 'Categories': 'Category' }}:&nbsp;</h3>
                          <span v-for="(category, index) in cleanCategories" :key="index">
                            {{ category }}{{ index + 1 === cleanCategories.length ? '' : ','}}
                          </span>
                      </div>
                    
                      <p v-if="listing.company">
                        {{ listing.company }}
                      </p>
                      <p v-if="listing.address">
                        <span>{{ listing.address }}<br/>{{ listing.city }}, {{ listing.state }} {{ listing.zip }}</span><br />
                        <a  v-on:click="clicked('Listing Directions Clicked', listing.title)" target="_blank" :href="mapUrl">Get Directions</a>
                      </p>
                    </div>
                    <p>
                      Phone: <a v-on:click="clicked('Listing Phone Clicked', listing.title)" :href="phoneLink">{{ listing.phone }}</a>
                    </p>
                    <p class="dir-block_item website">
                      Website: <a class="website" v-on:click="clicked('Listing Website Clicked', listing.title)" :href="listing.website" target="_blank">{{listing.website}}</a>
                    </p>
                  
                  </div>

                  <div v-if="sponsored">
                      <h3 class="profile-title">Profile</h3>
                      <div v-if="listing.content" class="profile-content" v-html="listing.content"></div>
                  </div>

                </div>

              </div>
            </div>

            <div class='col-md-4 sidebar'>
              <div class='dir-blocks-main'>
                <div class='dir-blocks dir-blocks--1'>
                  <div>
                    
                    <no-ssr>
                      <div class="leaflet-map-container">
                        <simple-map :listing="listing"></simple-map>
                        <a  v-on:click="clicked('Listing Directions Clicked', listing.title)" target="_blank" :href="mapUrl">Directions</a>
                      </div>
                    </no-ssr>

                    <!-- Awards -->
                    <div v-if="awards" class='dir-categories dir-block__categories'>
                      <h3 class='dir-block__categories-title'>Awards:&nbsp;</h3>
                      <span v-for="(awards, index) in listing.awards" :key="index">
                        {{ awards }}{{ index + 1 === listing.awards.length ? '' : ','}}
                      </span>
                    </div>

                    <!-- Rating -->
                    <div v-if="listing.rating" class="dir-categories dir-block__categories rating">
                      <h3 class='dir-block__categories-title'>
                        Rating:</h3> <stars :rating="listing.rating"></stars>
                    </div>

                    <!-- Price Range -->
                    <div v-if="listing.price_range" class='dir-categories dir-block__categories'>
                        <h3 class='dir-block__categories-title'>Price:&nbsp;</h3>
                        {{ listing.price_range }}
                    </div>

                    <!-- Hours -->
                    <div v-if="listing.hours" class='dir-categories dir-block__categories'>
                        <h3 class='dir-block__categories-title'>Hours: </h3>
                        <div class="hours-content" v-html="listing.hours"></div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

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

