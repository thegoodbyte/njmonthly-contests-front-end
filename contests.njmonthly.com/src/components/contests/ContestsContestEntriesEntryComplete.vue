<template>

  <div>

  <div class="row" v-if="contest">
    <div class="col-md-12">
      <contest-header />
    </div>
  </div>

  <div class="row">

    <div v-if="page" class="enter-text col-md-5">
      <h1>{{ page.title }}</h1>
      <div v-html="page.content"></div>

        <div>
          <h4>Share with your friends!</h4>

          <div class="share-buttons-container">

            <a class="share-icon" :href="'https://www.facebook.com/sharer/sharer.php?u=' + MAIN_URL + '/contests/' + contest.slug + '/entries/' + '&quote=' + share_text" target="_blank">
              <div class="facebook-icon">
                <facebook-icon />
              </div>
            </a>

            <a class="share-icon" :href="'http://twitter.com/share?url=' + MAIN_URL + '/contests/' + this.contest.slug + '/entries/' + '&text=' + share_text" target="_blank">
              <div>
                <twitter-icon />
              </div>
            </a>

            <a class="link-icon-container share-icon" :href="'mailto:?subject=' + share_text + '&body=' + share_text">
              <email-icon />
            </a>

          </div>
        </div>

    </div>
    

    <div class="col-md-7 pet-info-form enter">
      <div class="cell example example2">
        <!-- <loading-crescent v-if="loading" ></loading-crescent> -->
        <div v-if="is_loading">Loading</div>

        <form v-on:submit="handleSubmit" id="payment-form" :class="is_loading">


          <div class="row">
            <h3 v-if="contest.slug == 'scavenger-hunt'" class="form-title-scavenger">After submitting your entry, you will receive a confirmation email as well as updates on your progress as you continue your 
            adventure in The Great New Jersey Monthly Scavenger Hunt.</h3>
            <h3 v-else class="form-title">Payment Info</h3>
          </div>

          <div v-if="userForm && addonForm">

            <div v-for="field in userForm.fields" :key="field.name" :class="field.missing && field.required === 'true' ? 'field has-error ' + field.classes : 'field ' + field.classes">
              <div v-if="field.field_type === 'text'">
                  <label :for="field.name" class="form-check-label">{{ field.title }} <span v-if="field.required === 'true'" class="red">*</span></label>
                  <input 
                    :id="field.name"
                    :name="field.name"
                    type="text" 
                    class="input text empty" 
                    v-model="field.value"
                    :required="field.required === 'true' ? true : false"
                    :placeholder="field.placeholder"
                    autocomplete="salkfjd23jk9s8dfjlk232jl"
                  />
                  <div class="baseline"></div>
              </div>
              
              <div v-if="field.field_type === 'password' && !user">
                <label :for="field.name" class="form-check-label">{{ field.title }} <span v-if="field.required === 'true'" class="red">*</span></label>
                <input 
                  :id="field.name"
                  :name="field.name"
                  type="password" 
                  class="input text empty" 
                  v-model="field.value"
                  :required="field.required === 'true' ? true : false"
                  :placeholder="field.placeholder"
                  autocomplete="salkfjd23jk9s8dfjlk232jl"
                />
                <div class="baseline"></div>
              </div>

              <div v-if="field.field_type === 'checkbox'">
                <div :class="'checkbox'">
                  <input 
                    :name="field.name" 
                    :id="field.name" 
                    type="checkbox" 
                    v-model="field.value" />
                  <label :for="field.name" class="checkbox-label">
                    &nbsp;{{ field.title }}
                  </label>
                </div>
              </div>
            </div>

            <div v-if="!contest.settings['free']" class="field">
              <label for="coupon" class="form-check-label">Coupon</label>
              <input 
                id="coupon"
                name="coupon"
                type="text" 
                class="input text empty" 
                v-model="coupon"
                placeholder="Coupon"
              />
              <div class="baseline"></div>
            </div>

            <div v-for="field in addonForm.fields" :key="field.name" :class="field.missing && field.required === 'true' ? 'field has-error ' + field.classes : 'field ' + field.classes">
              
              <div v-if="field.field_type === 'text' && ((!field.dependent) || (field.dependent && addonForm.fields[field.dependent_on].value))">
                <label :for="field.name" class="form-check-label">{{ field.title }} <span v-if="field.required === 'true'" class="red">*</span></label>
                <input 
                  :id="field.name"
                  :name="field.name"
                  type="text" 
                  class="input text empty" 
                  v-model="field.value"
                  :required="field.required === 'true' ? true : false"
                  :placeholder="field.placeholder"
                />
                <div class="baseline"></div>
              </div>

              <div v-if="field.type === 'checkbox'">
                <div :class="'checkbox'">
                  <input 
                    :name="field.name" 
                    :id="field.name" 
                    type="checkbox" 
                    v-model="field.value" />
                  <label :for="field.name" class="checkbox-label">
                    &nbsp;{{ field.title }}
                  </label>
                </div>
              </div>
            </div>

          </div>
          
          <div :class=" total > 0 || !hidePaymentForm ? 'show' : 'hide'" >

                 <div>
            <div class="checkbox" style="margin: 0px 0 20px 0;" ><input name="save_card_info" v-on:change = "saveCardInfo" id="save_card_info" type="checkbox">
     
              <label for="" class="checkbox-label" v-on:change = "saveCardInfo">
                  Yes, I would like New Jersey Monthly to securely save my card information for future entries.
                </label>
            </div>
          </div>
            <div v-if="!couponLengthCorrect" class="field">
              <label for="example2-card-number">Card number</label>
              <div id="example2-card-number" class="input text empty StripeElement"></div>
              <div class="baseline"></div>
            </div>
            </div>


          <div id="card-errors" role="alert"></div>
        
          <button v-if="total > 0" v-on:click="handleSubmit" type="submit">{{  "Pay $" + total }}</button> 
          <button v-else v-on:click="handleSubmit" type="submit">Complete Submission</button> 
          <!-- handleSubmit -->

        </form>
        
      </div>
    </div>

  </div>

  </div>
</template>

<script>
import {ENV_URL, MAIN_URL, STRIPE_PUBLISHABLE} from '../../environment.js';
import ContestHeader from 'components/contests/ContestHeader.vue';
// import queryString from 'query-string';
import queryString from 'qs';
import axios from 'axios';
import FacebookIcon from 'components/ui/FacebookIcon.vue';
import TwitterIcon from 'components/ui/TwitterIcon.vue';
import EmailIcon from 'components/ui/EmailIcon.vue';

var smoothScroll = require('smoothscroll');

// import SelectedFilters from 'components/SelectedFilters.vue';
// import Paginate from 'vuejs-paginate';
// import {Pagination} from 'vue-pagination-2';
// import broadstreet from '../custom/broadstreet.js';

const isBrowser = typeof window !== 'undefined';
var stripe = isBrowser ? window.Stripe(STRIPE_PUBLISHABLE) : undefined;
if (isBrowser ) {
	var elements = stripe.elements();
	var elementStyles = {
		base: {
		color: '#32325D',
		fontWeight: 500,
		fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
		fontSize: '16px',
		fontSmoothing: 'antialiased',
	
		'::placeholder': {
			color: '#CFD7DF',
		},
		':-webkit-autofill': {
			color: '#e39f48',
		},
		},
		invalid: {
		color: '#E25950',
	
		'::placeholder': {
			color: '#FFCCA5',
		},
		},
	};
	
	var elementClasses = {
		focus: 'focused',
		empty: 'empty',
		invalid: 'invalid',
	};
	var card = elements.create('card', {
		style: elementStyles,
		classes: elementClasses,
		hidePostalCode: true
	});
}




export default {
  name: 'directory-view',

  components: {
    ContestHeader,
    FacebookIcon,
    TwitterIcon,
    EmailIcon,
  },



  data () {
 
    return {
      places: null,
      displayMobileFilters: false,
      is_loading: false,
      MAIN_URL: MAIN_URL,
      coupon: '',
      save_card_info:true,
      hidePaymentForm:false,
      copiedData:null,
     

      // page: this.$route.query['page'] ? Number(this.$route.query['page']) : 1,
    }

  },
  created() {
  
    if (this.user) {
      if (this.userForm) {
        console.log("copying the data")
        this.copyUserInfoToUserForm();
      }
      
    }
    let userForm = this.$store.state.userForm;
    let contest = this.$store.state.contest;
    // if (!userForm || (contest && contest.slug !== this.$route.params.id)) {
 
      const uri = ENV_URL + this.$route.path;
      let test = this.$store.dispatch('CONTESTS_CONTEST_ENTRIES_ENTRY_COMPLETE', {uri: uri}).then(() => {
        this.copyUserInfoToUserForm();

      })
    // }
  },
  // beforeCreate() {
  // 	this.$store.dispatch('FETCH_CURRENTLY_SELECTED_FACETS', {});
  // },


  computed: {
    entryForm() {
  
      return this.$store.state.entryForm;
    },
    displayMobileFiltersClass() {
      return this.displayMobileFilters ? 'filter mobile' : 'filter';
    },
    user() {
      return this.$store.state.user;
    },
    addonForm() {
   
      return this.$store.state.addonForm;
    },
    userForm() {
      return this.$store.state.userForm;
    },
    page() {

      return this.$store.state.page;
    },
    contest() {
      return this.$store.state.contest;
    },

    contestApis() {
      return this.$store.state.contestApis;
    },
    share_text() {
      return this.$store.state.contest ? "Check out the " + this.contest.title + " Contest!" : '';
    },
    total() {

      let total = 0;
      if (this.addonForm) {
        this.addonForm.fields.map( (field) => {
          if (field.field_type === 'purchase' && field.value === true) {
            total += field.price;
        
          }
     
        })
      }

      total ==  0 ? this.hidePaymentForm = true : ""; 
      return total;

    },
    couponLengthCorrect() {
      return this.coupon.length === 22;
    }

  },

  mounted() {
    this.$nextTick(function () {
      if(Boolean(this.contest) && Boolean(this.contest.settings)){
        this.contest.settings["free"] ? this.hidePaymentForm = true : "";
      }
    this.contestApis = this.$store.state.contestApis;
    const uri = ENV_URL + this.$route.path;
    

		card.mount('#example2-card-number');

		// Handle real-time validation errors from the card Element.
		card.addEventListener('change', function(event) {
			var displayError = document.getElementById('card-errors');
			if (event.error) 
			{
				displayError.textContent = event.error.message;
			} 
			else 
			{
				displayError.textContent = '';
      }
      
       
    });
    

		// var broadstreetadsScript = document.createElement('script');
		// broadstreetadsScript.setAttribute('src', 'https://cdn.broadstreetads.com/init-2.min.js');
		// document.body.appendChild(broadstreetadsScript);
		// const options = {
    //   networkId: 4933,
    //   "targets": {
    //     'url_segment': window.location.pathname.split(/[\/\-_]/g).filter(function (o) { return o ? o : false })
    //   },  
    // }
    
    // window.onload = function() {
    //   const JSON_options = JSON.stringify(options);
    //   broadstreet.watch(options);
    // }

    if (typeof window !== "undefined") {

      this.$ga.set(this.$route.fullPath);
      this.$ga.page(this.$route.fullPath);
      
    }
   })
  },

  serverAsyncData({store, to, from}) {
    // const state = store.state;
    // return store.dispatch('FETCH_SEARCH_OPTIONS_SERVER', {to, state}).then(function() {
    //   return store.dispatch('FETCH_DIRECTORY', {to, state})
    // });
    // return store.dispatch('FETCH_DIRECTORY_METADATA', {to, state});
    // store.dispatch('FETCH_DIRECTORY_METADATA', {});
    // return store.dispatch('FETCH_DIRECTORY', {to, state})

    const state = store.state;

    // Set the rest of the searchOptions using the query.
    // to and from are undefined when coming from a different page
    // and when the page first loads, so use the query in the route
    let route = {};
    if (to !== undefined) {
      route = to;
    } else if (from === undefined) {
      route = state.route;
    } else {
      route = state.route.from
    }
    // return store.dispatch('FETCH_DIRECTORY', {route})

    const uri = ENV_URL + route.path;


    return store.dispatch('CONTESTS_CONTEST_ENTRIES_ENTRY_COMPLETE', {uri: uri});
  },

  metaInfo () {

    let title = '';
    let query = Object.assign({}, this.$route.query);

    if (query['hcategory.lvl1']) {
      const categories = query['hcategory.lvl1'].split(',');
      const categorySections = categories[0].split(' > ');
      title = categorySections[1] + ' ' + categorySections[0]
    } else {
      title = this.section;
    }


    if (query['city']) {
      title += ' in ' + query['city'];
    }

    return this.$seo('item', title)
  },

  methods: {
	// Handle updating the state for each input
	// If it is required, make
	// e.target.name is the name of the input
	// If the input is required, the abscence or presence of user input will be noted in the state
	// Any required inputs should be set to null in the "missing" object in the state in the constructor
  handleInputTextChange(e, index){

		e.persist();

		let userForm = Object.assign({}, this.userForm);

    userForm.fields[index].value = e.target.value;

		if (e.target.value === '') {
      userForm.fields[index].missing = true;
		} else {
      userForm.fields[index].missing = false;
		}

		this.props.setUserFormData(userForm);

  },
  
  saveCardInfo(e){
 
    this.save_card_info = e.target.checked;

  },

	handleCheckboxChange(e, index) {
    console.log("checkbox change")
		e.persist();
		
		let form = Object.assign({}, this.props.addonForm);
		
    form.fields[index].value = e.target.checked;

    if (!e.target.checked) {
      form.fields[index].missing = true;
		} else {
      form.fields[index].missing = false;
    }
    
    this.props.setAddonFormData(form);
    
	},

	validateData() {
     
    let showMissing = false;
    let error = [];
    let userForm = Object.assign({}, this.$store.state.userForm);
 

    // Check to see if any required fields are missing by looping
    // through the fields of the user form that was retrieved from
    // the database.
    // console.dir(userForm.fields)
    // for(fieldIndex in userForm.fields){
        
    // }
		for(let fieldIndex in userForm.fields){
      let field = userForm.fields[fieldIndex];
      console.log("Label: ",field.label);
			let isRequired =  (field.required === "true" && field.name !== "id" || field.name === 'password' && !this.user);
			if (isRequired) {
        if(field.name === 'password' && !this.user){
          if(field.value === null || field.value === '' || field.value === undefined || field.value === false){
            console.log(`recording empty: ${field.name} is required ${isRequired} you entered: ${field.value}`);
            console.dir(field)
            field.missing = true;
            showMissing = true;
          }
        }

        
        // // make an exception for the password if the user is logged in
        // if (field.name === 'password' && this.user) {
        //   field.missing = false;
        //   showMissing = false;
        // }
 
        
        if(showMissing){
      
          let missingField = field.name ? field.name : "";
          
          if(missingField  !== ""){
            error.push(missingField + "\n");
          }
        }  
			}
    };
    
    this.$store.dispatch('SET_USER_FORM', {userForm: userForm})
    let addonForm = Object.assign({}, this.$store.state.addonForm);
    let entryForm = Object.assign({}, this.$store.state.entryForm);

    // Also, check to see if any required fields are missing
    // on the addon form.
		addonForm.fields.map(function(field, index) {
			const requiredIsMissing = field.classes !== "hidden" && (field.value === '' || field.value === undefined || field.value === false) && field.required === "true";
			if (requiredIsMissing) {
        
      
        field.missing = true;
        showMissing = true;
      }
      

      
     
    })

    // this.$store.dispatch('SET_ENTRY_FORM', {entryForm: entryForm})
    this.$store.dispatch('SET_ADDON_FORM', {addonForm: addonForm})

		if (showMissing) {
   
			return [false,error.toString()];   
		}

    return [true,""];
    
	},

  getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
  },

  handleSubmit(e) {

    this.$store.dispatch('LOADING', true);

    e.preventDefault();
    
    const isValid = this.validateData();
  
		if (!isValid[0]) {
      // alert('Some required information is missing. Please review the form.');
      alert("The following fields cannot be blank \n" + isValid[1]);
      this.$store.dispatch('LOADING', false);
			return;
    }

    const that = this;

    let authHeaders = {};

    let query = Object.assign({}, that.$route.query);
    const search = queryString.stringify(query) ?  '?' + queryString.stringify(query) : '';
    let uri = '';

    // If the user is logged in, include the JWT in the auth headers
    // when posting the data to the server. This will authenticate him.
    if (this.user) {
      var laravelAuthToken = localStorage.getItem('laravelAuthToken');
      authHeaders = {
        headers: {"Authorization" : `Bearer ${laravelAuthToken}`}
      };
      uri = ENV_URL + that.$route.path + '/updateUserAndAttachEntry' + search;
    } else {
      uri = ENV_URL + that.$route.path + '/createUserAndAttachEntry' + search;
    }

    // Include the data from the user form, the entry form,
    // and the coupon field
    let data = {};
     
    data.userFormData = that.userForm.fields;
    data.entry_id = that.$route.params.entry_id;
    data.coupon = that.coupon;
    data.item = that.entryForm.fields;
    
    // If the user entered the correct coupon code,
    // skip the purchase part.

    if (this.couponLengthCorrect || this.total === 0) {
      this.completeSubmit(uri, data, authHeaders);
    } else {

      // Get the user's info for Stripe
      let stripeData = {};
      this.userForm.fields.map(function(field) {
        if (field['type'] === 'field') {
          stripeData[field['name']] = field['value'];
     
        }
      })
      console.log("data for stripe")
      console.dir(stripeData)
      console.log("the card is: " )
      console.dir(card)
      stripe.createToken(card, {
        stripeData
      }).then(function(result) {
        console.log("the result is: " );
        console.dir(result)
        if (result.error) {
          that.$store.dispatch('LOADING', false);
          // Inform the customer that there was an error
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
          console.log("the error is: ");
          console.log(result.error.message);
          return false;
        } else {
          const purchaseData = {
            source: result.token.id,
            addonFormData: that.addonForm.fields,
            coupon: that.coupon,
            save_card_info : that.save_card_info,
            hubspotutk: that.getCookie('hubspotutk'),
          }
          data.purchaseData = purchaseData;
          console.log("the add on form us  ", data.purchaseData);
          // let data_for_hubspot = that.getDataValues(data.userFormData,false);
          // let addon_for_hubspot = that.getDataValues(data.purchaseData.addonFormData,true);
          // data_for_hubspot['addon'] = addon_for_hubspot;
          // console.dir("the data for hubspot is ", data_for_hubspot);
          // that.saveInfoToHubspot(data_for_hubspot);
          //this.saveInfoToHubspot(data); //save to hubspot api for now, will change to save to api and allow an api class to figure out what api is being used,using factory pattern, by passing in the contestsApi object as parameter.
          that.completeSubmit(uri, data, authHeaders);
        }

       //remove after testing

     //remove after testing
        



      });
    }

  },

  // Finally, send all the data (user's data, entry, data, payment data)
  // to the server (contestsapi.njmonthly.com)
  completeSubmit(uri, data, authHeaders) {
   
  
    axios.post(uri, data, authHeaders)
    .then((response) => {
      console.dir(response)
      if (response.data.error === true) {
        // that.loading = false;
        this.loading = false;

        alert(response.data.message);

        // If the user is trying to create a user with an email
        // that already exists, open up the popup to login
        if (response.data.error_type === 'email_exists') {
          this.$store.dispatch('TOGGLE_LOGIN_POPUP');
          
        }
      } else {
        // If a JWT was sent back, set it to the user's local storage.
        // The JWT is used to authenticate a user, and it will only be sent
        // back if a new user is created.
        if (response.data.laravelAuthToken) {
          localStorage.setItem('laravelAuthToken', response.data.laravelAuthToken);
          this.$store.commit('SET_USER', response.data.user);
        }
        this.$router.push({ path: '/contests/' + this.contest.slug + '/purchase-complete', query: {}})
          fbq('track', 'Purchase', {
            value: 30,
            currency: 'USD',
          });

        // Calculate how much the user paid
        // and include it in FB and GA
        let total = 0;
        if (this.addonForm) {
          this.addonForm.fields.map(function(field) {
            if (field.name === 'entry') {
              total += field.price;
            }
          })
        }

        window.fbq.push('track', 'Purchase', {
            content_name: this.contest.slug,
            content_category: 'contest',
            content_type: 'product',
            value: this.total, 
            currency: 'USD'
          }
        );

        this.$ga.event({
          eventCategory: 'Contests',
          eventAction: 'Purchase',
          eventLabel: this.contest.slug,
          value: this.total,
        })
      }

      this.$store.dispatch('LOADING', false);
    })
    .catch((err) => {
      if(err){
        console.dir(err)
        // console.dir(response.data)
        // this.catchError(response.data);
      }

    });
  },
   
   getDataValues(data,is_addon){
     let output = {};
     data.map((info)=>{
    
       console.dir(info)
       if(is_addon && info.type == 'checkbox'){
         output[info.name] = !info.value ? 'No' : 'Yes';
       }
       else{
        output[info.name] = info.value;
       }
       
      //  let index = data[info].name;
      //  let value = data[info].value;
      //  output[index] = value;
     });
     return output;
   },

  saveInfoToHubspot(data){ //rename to saveInfo to API
    // let contestApi = this.$store.state.contestApis;
    let contestApi = this.$store.state.contestApis;
    console.log(`the uri is : ${ENV_URL}`)
    console.log( "the client id is: ", contestApi[0].client_id);
    
      data['client_id'] = contestApi[0].client_id;
      data['connection_id'] = contestApi[0].connection_id;
      data['provider_name'] =contestApi[0].provider_name;
      data['url'] = contestApi[0].url;
    let data_to_send = {
      'data':data
    }
    
    console.log("i am trying to send", data_to_send)
    var _hsq = window._hsq = window._hsq || [];
    _hsq.push(['setPath', this.$route.path]);

    axios.post(`${ENV_URL}/hubspot`,data_to_send).
    then(response => {
      console.dir(response.data)
      }).
    catch(message => console.dir(message))
  

  },
	copyUserInfoToUserForm() {
    // let userForm = Object.assign({}, this.props.userForm);

    // let user = this.props.user;
  
     let userFormFields = Object.keys(this.userForm.fields);

    userFormFields.map((key, index) => {
      let field = this.userForm.fields[key];
  
      // console.log('field', index);

      if (field.type === 'field' ) {

        field.value = this.user[key];
     
      } else if (field.type === 'meta' && this.user.meta[key]) {
        field.value = this.user.meta[key].value;
      }


    })
	},

	removeUserInfoFromUserForm() {

    this.userForm.fields.map((field, index) => {

      // console.log('field', index);

      if (field.type === 'field' || field.type === 'meta') {
        field.value = '';
      }


    })

	},
  
  catchError(err) {
    alert(err.error_type + ': ' + err.message);
    this.$store.dispatch('LOADING', false);
    return err.message;
  },

  },




  watch: {
    '$route' (to, from) {
      
    },
    user(newUser, oldUser) {
      console.log('new user', newUser, oldUser);
      if (!oldUser && newUser) {
        this.copyUserInfoToUserForm();
      } 
      // If the user logged out, then prevProps will have a user, but
      // the current props won't. Remove the users data from the user form.
      if (oldUser && !newUser) {
        this.removeUserInfoFromUserForm();
      }
    }
  },

  // beforeRouteUpdate(to, from, next) {
  //   console.log('beforeRouteUpdate', to, from, next);
  //   this.name = to.params.name
  //   next()
  // }

}


</script>

<style lang="scss">
@import "~base";
.hide{display:none;}
.show{display: block;}
.user-view {
  background-color: #fff;
  box-sizing: border-box;
  padding: 2em 3em
}

.user-view h1 {
  margin: 0;
  font-size: 1.5em
}

.user-view .meta {
  list-style-type: none;
  padding: 0
}

.user-view .label {
  display: inline-block;
  min-width: 4em
}

.user-view .about {
  margin: 1em 0
}

.user-view .links a {
  text-decoration: underline
}

.pagination > .active > a, .pagination > .active > a:focus, .pagination > .active > a:hover, .pagination > .active > span, .pagination > .active > span:focus, .pagination > .active > span:hover {

  background-color: #159b5d;
  border-color: #159b5d;

}
</style>

