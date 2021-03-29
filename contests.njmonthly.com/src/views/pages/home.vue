<template>
  <div class="home-page">
    
    <div class="homepage-top">
      <h3 class="homepage-title">FIND JERSEY’S BEST</h3>
      <h4 class="homepage-subtitle">Your guide to all that's great in the Garden State!</h4>
    </div>
    <div class="container">
      <div class="row">
        <div class="simple-section col-md-6 col-xs-12">
            <div class="section-image">
              <router-link to="/search/restaurants">
                <img src="https://njmdir.wpengine.com/wp-content/uploads/2018/06/restaurant-seafood-dish-lq.jpg" />
              </router-link>
            </div>
            <div class="text">
              <div class="title">
                <router-link to="/search/restaurants">Restaurants</router-link>
              </div>
              <p>Let’s eat! This is our exclusive selection of the New Jersey’s best places to dine, curated by the editors of New Jersey Monthly, the state’s foremost dining experts. Search by region or genre to find Jersey’s Best.</p>
            </div>
        </div>
        <div class="simple-section col-md-6 col-xs-12">
            <div class="section-image">
              <router-link to="/search/spas">
                <img src="https://njmdir.wpengine.com/wp-content/uploads/2018/06/spa-image.jpg" />
              </router-link>
            </div>
            <div class="text">
              <div class="title">
                <router-link to="/search/spas">Spas</router-link>
              </div>
              <p>Relax! The New Jersey Monthly team of experts has chosen the best resort spas, day spas and medical spas in the state. Search by location to discover our selection of Jersey’s Best spas.</p>
            </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'home',
}
</script>

<style lang="scss">

</style>
