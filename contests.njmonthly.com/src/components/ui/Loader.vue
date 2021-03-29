<template>
<div>
    <div id="loader" :class="loading ? 'loader active' : 'loader'">
      <div class="loader-content">
      loading
        <div class="loader loader--style7" title="6">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
            <rect x="0" y="0" width="4" height="20" fill="#333">
              <animate attributeName="opacity" attributeType="XML"
                values="1; .2; 1" 
                begin="0s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="7" y="0" width="4" height="20" fill="#333">
              <animate attributeName="opacity" attributeType="XML"
                values="1; .2; 1" 
                begin="0.2s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="14" y="0" width="4" height="20" fill="#333">
              <animate attributeName="opacity" attributeType="XML"
                values="1; .2; 1" 
                begin="0.4s" dur="0.6s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>
      </div>
    </div>
</div>
</template>

<script>
  export default {
    name: 'loader',
    computed: {
      loading () {
        return this.$store.state.loading
      },
    },
  }
</script>

<style lang="scss">
  // @import "~base";

  // .loading {
  //   @include absolute-center;
  //   @include size(64);
  //   @include background-cover("loading.svg");

  //   position: fixed;
  //   z-index: 999;
  // }
#loader {
    display: none;
    position: fixed;
    z-index: 10000;
    top: 0px;
    left: 0;
    background: rgba(255, 255, 255, 0.3);
    text-align: center;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#loader .loader-content {
    position: fixed;
    z-index: 10000;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#loader.loader.active {
    display: block;
}
</style>
