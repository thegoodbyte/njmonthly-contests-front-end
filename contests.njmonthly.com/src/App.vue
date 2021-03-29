<template>
  <div id="app">
    <!-- <header class="header">
      <nav class="inner">
        <router-link :to="linkTo()" exact>
          <img class="logo" src="~public/logo.png" alt="logo">
        </router-link>
        <router-link :to="linkTo('top')">Top</router-link>
        <router-link :to="linkTo('new')">New</router-link>
        <router-link :to="linkTo('show')">Show</router-link>
        <router-link :to="linkTo('ask')">Ask</router-link>
        <router-link :to="linkTo('job')">Jobs</router-link>
        <router-link :to="linkTo('directory')">Directory</router-link>
        <a class="github" href="https://github.com/vuejs/vue-hackernews-2.0" target="_blank" rel="noopener">
          Built with Vue.js
        </a>
      </nav>
    </header> -->

    <global-header/>

    <!-- <div id="loader" :class="this.$store.state.loading ? 'loader active' : 'loader'">
      <div class="loader-content">
      loading
      <loader></loader>
      </div>
    </div> -->
    <!-- <transition name="fade" mode="out-in"> -->
      <router-view class="container"></router-view>

      <global-footer />
    <!-- </transition> -->

    <!-- <loading/> -->
    <loader></loader>
  </div>
</template>

<script>
  // import Loading from 'components/ui/Loading.vue'
  import GlobalHeader from 'components/GlobalHeader.vue';
  import GlobalFooter from 'components/GlobalFooter.vue';
  import Loader from 'components/ui/Loader.vue';

  export default {
    components: {
      Loader,
      GlobalFooter,
      'global-header': GlobalHeader,
    },

    data () {
      return {

      }
    },

    created() {

      // if (typeof window !== "undefined") {
      //   var ua = window.navigator.userAgent;
      //   var isIE = /MSIE|Trident/.test(ua);

      //   if ( isIE ) {
      //     const msg = {
      //       content: '<p>We apologize for the inconvenience.</p><p>This site is currently incompatible with Internet Explorer.</p><p>Please try, again, using <a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank">Firefox</a> or a different browser.',
      //       cancel: false,
      //       confirmText: 'okay',
      //       btnConfirm: '',
      //     }
      //     this.$ui.alert.show(msg)
      //     // this.$alert.show('At the moment, this site is incompatible with Internet Explorer');
      //   }
      // }

      if (typeof window !== "undefined" && localStorage.getItem('laravelAuthToken')) {
        this.$store.dispatch('GET_USER');
      }

    },

    metaInfo () {
      return this.$seo()
    },

    beforeMount () {
      var hubspot_script = document.createElement('script');
      hubspot_script.setAttribute('src','https://js.hs-scripts.com/1746707.js');
      hubspot_script.setAttribute('async',true);
      hubspot_script.setAttribute('defer',true);
      document.head.appendChild(hubspot_script);

    },

    mounted () {

      console.log("mhalla: App.vue loaded ");
    },
  }
</script>

<style lang="scss">
  @import "sass/app";

  body {
    // font-family: "Open Sans", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    // font-size: 14px;
    // background-color: #fff;
    // margin: 0;
    // padding-top: 55px;
    overflow-y: scroll
  }

  // a,
  // body {
  //   color: #000;
  // }

  a {
    text-decoration: none
  }

  .header {
    background-color: #f60;
    position: fixed;
    z-index: 999;
    height: 55px;
    top: 0;
    left: 0;
    right: 0
  }

  .header .inner {
    max-width: 800px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 15px 5px
  }

  .header a {
    color: hsla(0, 0%, 100%, .8);
    line-height: 24px;
    transition: color .15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300;
    letter-spacing: .075em;
    margin-right: 1.8em
  }

  .header a:hover {
    color: #fff
  }

  .header a.router-link-active {
    color: #fff;
    font-weight: 400
  }

  .header a:nth-child(6) {
    margin-right: 0
  }

  .header .github {
    color: #fff;
    font-size: .9em;
    margin: 0;
    float: right
  }

  .logo {
    width: 24px;
    margin-right: 10px;
    display: inline-block;
    vertical-align: middle
  }

  .view {
    max-width: 1000px;
    margin: 0 auto;
    position: relative
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  @media (max-width: 860px) {
    .header .inner {
      padding: 15px 30px
    }

  }

  @media (max-width: 600px) {
    .header .inner {
      padding: 15px
    }

    .header a {
      margin-right: 1em
    }

    .header .github {
      display: none
    }

  }
</style>
