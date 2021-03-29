<template>
  <div>
  
    <div :class="[{ 'hide' : !showing},'warning']">
      <p>
        Thank you for entering our contest.
        <strong> Please follow social-distancing guidelines and Covid-19 restrictions while participating.</strong>
        
      </p>
      <span @click="exit" class="exit">x</span>
    </div>
     
    <div class="njmonthly-nav">
       
      <header id="masthead" class="site-header" role="banner">
        <div class="container container-md-height">
          <div :class="[{'addMargin' : showing},'site-branding']">
            <a href="https://njmonthly.com/" title="New Jersey Monthly" rel="home">
              <svg viewBox="0 0 574.19 128.35"><path class="cls-1" d="M433,148.46v-.9l1.52-.28-.52-10.1-4.23,11.28H429l-4.17-11-.46,9.79,1.51.32v.9h-4.23v-.9l1.55-.32.57-11.48-1.56-.32v-.9h4L430,144.66l3.82-10.13h3.92v.9l-1.58.28.63,11.57,1.55.27v.9Z" transform="translate(-8.63 -20.54)"/><path class="cls-1" d="M447.74,148.81c-3.59,0-6.21-2.8-6.21-7.21s2.74-7.43,6.32-7.44,6.21,2.8,6.22,7.21S451.37,148.81,447.74,148.81Zm0-13.47c-2.19,0-3.71,2.15-3.71,6s1.64,6.26,3.83,6.26,3.7-2.15,3.7-6C451.56,137.91,449.92,135.34,447.74,135.34Z" transform="translate(-8.63 -20.54)"/><path class="cls-1" d="M468.79,135.78v12.75h-1.18L460.08,138v9.23l1.54.36v.9h-4.26v-.9l1.54-.36V136.33l-.49-.7-1-.21v-.9h3.26l7,9.83v-8.57l-1.53-.36v-.91h4.25v.91Z" transform="translate(-8.63 -20.54)"/><path class="cls-1" d="M484.2,138.39h-1l-.28-2.71h-3.06v11.58l1.54.27v.9H476v-.9l1.54-.27V135.68h-3.06l-.27,2.71h-1v-3.89h11Z" transform="translate(-8.63 -20.54)"/><path class="cls-1" d="M495,148.42v-.9l1.61-.27v-5.5h-5.52v5.49l1.62.27v.9h-5.48v-.9l1.54-.28V135.68l-1.53-.27v-.91h5.47v.9l-1.62.28v4.9h5.52v-4.91L495,135.4v-.9h5.48v.9l-1.54.27v11.58l1.54.27v.9Z" transform="translate(-8.63 -20.54)"/><path class="cls-1" d="M504,148.42v-.91l1.53-.27V135.67L504,135.4v-.91h5.6v.9l-1.74.28V147.2h4.34l.31-2.58h1v3.79Z" transform="translate(-8.63 -20.54)"/><path class="cls-1" d="M525.57,135.7l-3.4,7v4.56l1.54.27v.91h-5.4v-.9l1.53-.28V143l-3.59-7.32-1.14-.27v-.9h5.3v.91l-1.58.27,2.72,5.81,2.76-5.77-1.58-.31v-.91h4v.9Z" transform="translate(-8.63 -20.54)"/><text x="-8.63" y="-20.54"></text><path class="cls-1" d="M93.75,29.7l0,91.05H85L28.89,45.23l0,65.87,11.45,2.57v6.46l-31.7,0v-6.46l11.44-2.58,0-77.49-3.67-5L8.63,27.17V20.71l24.21,0L85,90.89l0-61.18L73.49,27.13V20.67l31.7,0v6.46Z" transform="translate(-8.63 -20.54)"/><path class="cls-1" d="M115.5,85.87v1.94c0,13.23,7.35,25.33,18.8,25.33,8.8,0,13.94-3.88,18.63-8.89l4.26,5.32c-7.48,8.08-14.82,12.44-26.56,12.45-18.78,0-32-12.9-32-34.85,0-21,14.07-34.88,32.56-34.89,17,0,26.86,11.45,26.87,29.53v4Zm14.66-27.13c-9.1,0-13.35,9.69-14.23,19.86h25.69C141.61,68.26,139.55,58.73,130.16,58.74Z" transform="translate(-8.63 -20.54)"/><path class="cls-1" d="M255.19,62.22l-23.88,60.39h-6.46L208.39,81,192,122.63h-6.46l-24-60.36-7.63-1.93V54.53l32.14,0v5.81l-7.92,1.62,14.4,39.22,11.58-30.68-3.24-8.23-7-1.93V54.5h32.72V60.3l-9.24,1.62,14.55,39.22,15-39.24-9.4-1.61V54.48l25.24,0v6Z" transform="translate(-8.63 -20.54)"/><path class="cls-1" d="M295.44,28.94l.05,83.49c0,21.95-8.84,33.79-35.9,33.92h-2.93L254.89,140c20,0,23.29-9,23.28-25.1L278.12,29,266.38,27V20.56l40.5,0V27Z" transform="translate(-8.63 -20.54)"/><path class="cls-1" d="M316.92,85.76v1.93c0,13.24,7.35,25.34,18.8,25.33,8.8,0,13.94-3.88,18.63-8.88l4.26,5.32c-7.48,8.08-14.81,12.44-26.55,12.44-18.79,0-32-12.89-32-34.84,0-21,14.07-34.88,32.56-34.89,17,0,26.87,11.44,26.88,29.53v4Zm14.66-27.13c-9.1,0-13.35,9.69-14.23,19.86H343C343,68.14,341,58.62,331.58,58.63Z" transform="translate(-8.63 -20.54)"/><path class="cls-1" d="M407.9,70.85l-12.48-6.61C389.41,67,386,74.58,386,85.88l0,26.31,14.09,1.93v5.81l-38.89,0v-5.81l8.95-1.94,0-48.43L361.23,62V55.86l23.63-3.08V68.12l.73.32C390.13,56,396.44,52.13,403,52.13a13,13,0,0,1,9.4,4Z" transform="translate(-8.63 -20.54)"/><path class="cls-1" d="M433.17,122.66a25.8,25.8,0,0,1-15.56-5l-1.46,4.2h-5l-.6-22.76,5.57-.49c1.77,11,6.91,17,16.89,16.94,5.28,0,9.54-3.71,9.53-9.2,0-6.62-4.11-8.39-15.85-14-8.37-4-14.39-10.16-14.4-20,0-12.59,9.38-20.18,20.83-20.19,5.87,0,10.12,1,14.68,3.87l1.76-3.88h4.69l-.57,21.47h-5.58c-1-9.36-4.56-15-13.22-15-5.28,0-9.53,3.07-9.53,8.88,0,6.46,4.41,8.07,14.83,13.07,9.69,4.67,16.59,10.32,16.6,20.33C456.79,114.41,446.08,122.65,433.17,122.66Z" transform="translate(-8.63 -20.54)"/><path class="cls-1" d="M475.71,85.67V87.6c0,13.24,7.35,25.34,18.79,25.34,8.81,0,13.95-3.89,18.64-8.89l4.26,5.32c-7.48,8.08-14.82,12.44-26.56,12.45-18.78,0-32-12.9-32-34.85,0-21,14.07-34.88,32.56-34.89,17,0,26.86,11.45,26.87,29.53v4Zm14.66-27.13c-9.1,0-13.35,9.69-14.23,19.86h25.68C501.82,68.05,499.76,58.53,490.37,58.54Z" transform="translate(-8.63 -20.54)"/><path class="cls-1" d="M575.48,62l-23.3,61.68-7.73,25.17H530.61l14.09-27.76L521.18,62.07l-7.34-1.93V54.32l33.31,0v5.82l-9.39,1.62,14.69,40.35,14.66-40.37-9.4-1.61V54.3h25.1v6Z" transform="translate(-8.63 -20.54)"/></svg>
            </a>
          </div>
        </div>
      </header>
        <div id="nav">
          <nav id="site-navigation">

            <div :class="mobileMenu ? 'mobile-menu' : ''">
              <div class="menu-icon" v-on:click="mobileMenu = !mobileMenu">
                <svg x="0px" y="0px"
                  viewBox="0 0 53 53">
                  <g>
                    <path d="M2,13.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,13.5,2,13.5z"/>
                    <path d="M2,28.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,28.5,2,28.5z"/>
                    <path d="M2,43.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,43.5,2,43.5z"/>
                  </g>
                </svg>
              </div>

              <div  class="container">
                <div class="menu-primary-menu-container">
                  <ul id="menu-primary-menu">
                    <li id="menu-item-34027" class="menu-item">
                      <router-link to="/contests">Contests</router-link>
                    </li>
                    <li id="menu-item-34027" class="menu-item">
                      <a href="#" v-on:click="menuActive = !menuActive">New Jersey Monthly </a>
                      <ul v-if="menuActive" id="njm-menu">
                          <li><a href="https://njmonthly.com/news-features/" target="_blank">News &amp; Features</a></li>
                          <li><a href="https://njmonthly.com/eat-drink/" target="_blank">Eat &amp; Drink</a></li>
                          <li><a href="https://njmonthly.com/towns-schools/" target="_blank">Towns &amp; Schools</a></li>
                          <li><a href="https://njmonthly.com/find-a-dentist/" target="_blank">Top Dentists</a></li>
                          <li><a href="https://njmonthly.com/find-a-doctor/" target="_blank">Top Doctors</a></li>
                          <li><a href="https://njmonthly.com/health/" target="_blank">Health</a></li>
                          <li ><a href="https://njmonthly.com/things-to-do-in-nj/" target="_blank">Things To Do</a></li>
                          <li><a href="https://njmonthly.com/arts-entertainment/" target="_blank">Arts &amp; Entertainment</a></li>
                          <li><a href="https://njmonthly.com/category/social-datebook/" target="_blank">Giving Back</a></li>
                          <li><a href="https://njmonthly.com/shopping/" target="_blank">Shopping &amp; Style</a></li>
                          <li><a href="https://njmonthly.com/home-garden/" target="_blank">Home &amp; Garden</a></li>
                          <li><a href="https://njmonthly.com/jersey-shore/" target="_blank">Shore &amp; Travel</a></li>
                      </ul>
                    </li>
                    <li class="menu-item">
                      <a href="#" v-if="user || hasToken" v-on:click.prevent="handleLogout">Logout</a>
                      <a href="#" v-else v-on:click.prevent="toggleLoginPopup">Login</a>
                    </li>
                    <li v-if="user && user.admin_level === 10" class="menu-item">
                      <router-link to="/super">Super Admin</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </nav>
        </div>


      <div class="block">

        
      </div>
    </div>
    <div :class="this.$store.state.showLoginPopup ? 'popup' : 'display-none'">
      <div class="popup-overlay" v-on:click="toggleLoginPopup"></div>
      <auth />
    </div>
  </div>
</template>

<script>
import Auth from 'components/user/Auth.vue';


export default {

  data () {
    return {
      mobileMenu: false,
      menuActive: false,
      showing:true
    }
  },
  components: {
		Auth

  },
  computed: {
    showLoginPopup() {
      return this.$store.state.showLoginPopup;
    },
    user() {
      return this.$store.state.user;
    },
    hasToken() {
      if (typeof window !== "undefined") {
        var laravelAuthToken = localStorage.getItem('laravelAuthToken');
        return laravelAuthToken ? true : false;
      } else {
        return false;
      }
    }
  },
  created() {


  },
  mounted() {
  
  // var broadstreetadsScript = document.createElement('script');
  // var broadstreetadsScript2 = document.createElement('script');
	// 	broadstreetadsScript.setAttribute('src', 'https://cdn.broadstreetads.com/init-2.min.js');
	// 	document.body.appendChild(broadstreetadsScript);
	// 	const options = {
  //     networkId: 4933 
  //   }


    
    window.onload = function() {
      // const JSON_options = JSON.stringify(options);
      // broadstreet.watch(options);
    }

    setTimeout(()=>{
      this.showing = false
    },20000)
  },

  methods: {
    exit(e){
      this.showing = !this.showing;
    },
    toggleLoginPopup() {
      this.$store.dispatch('TOGGLE_LOGIN_POPUP');
    },
    handleLogout() {
      this.$store.dispatch('LOGOUT_USER');
    }
	},



}
</script>

<style lang="scss" scoped>
  .warning{
    position: fixed;
    text-align: center;
    background-color:#ffcb00;
    padding: 5px;
    margin: 5px 0 25px;
    width: 100%;
    left: 0;
    top: -5px;
    z-index: 999999999;
  }

  .exit {

    position: absolute;
    right: 20px;
    top: 8px;
    background-color: #12995c;
    height: 28px;
    width: 28px;
    padding: 0;
    border-radius: 100%;
    color:white;
    cursor: pointer;

}

.hide{
  display: none;
}

.addMargin{
  margin-top:60px;
}

@media only screen and (max-width:600px){
  .hide-on-mobile{display: none}
};
</style>






















