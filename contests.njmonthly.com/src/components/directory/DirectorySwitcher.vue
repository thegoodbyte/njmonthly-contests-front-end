<template>
  <div class="section-switcher" id="directory-dropdown">
    <h1 class="title">{{currentDirectory}}</h1>
    <!-- <h4 v-on:click="toggleChoosing" class="current-dir-title"><span>Switch Directory</span> <span class="toggle-signs"><down-arrow :pointDown="choosing"></down-arrow></span></h4>
    <div >
      <div v-if="choosing" class='dir-dropdown'>
        <div class="dir-dropdown-content">
          <a href="/search?hcategory.lvl0=restaurants"><div class="dir-dropdown-item">Restaurants</div></a>
          <a href="/search?hcategory.lvl0=spas"><div class="dir-dropdown-item">Spas</div></a>
          <router-link class="dir-dropdown-item" :to="{ path: '/search/restaurants' }">Restaurants</router-link>
          <router-link class="dir-dropdown-item" :to="{ path: '/search/spas' }">Spas</router-link>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import DownArrow from './ui/DownArrow.vue';

export default {
  name: 'directory-switcher',
  mounted() {
    let directoryDropdown = document.getElementById("directory-dropdown");
    
    directoryDropdown.addEventListener("click", function(e){
      e.stopPropagation();// this will stop propagation of this event to upper level
    });

    let that = this;
    document.body.addEventListener("click", 
      function(e) {
        that.choosing = false;
        console.log("You clicked outside the area!");
      }
    );
  },
  data () {
    return {
      choosing: false,
    }
  },
  methods: {
    toggleChoosing: function(e) {
      e.preventDefault();
      this.choosing = !this.choosing;
    },
  },
  computed: {
    currentDirectory() {
      // let searchPageTitle = "Directories";
      // let selectValue = 'Choose One';
      if (this.$route.query['hcategory.lvl0']) {
        // selectValue = 'Switch Directory';
        return this.$route.query['hcategory.lvl0'];
      } else if (this.$route.params.cat) {
        return this.$route.params.cat;
      }

    }
  },
  components: {
    'down-arrow': DownArrow,
  },
}
</script>

<style lang="scss">
.dir-card__facets {

    font-weight: 600;
    font-size: 15px;
    line-height: 14px;
    line-height: 16px;
    margin-bottom: 5px !important;

}
</style>
