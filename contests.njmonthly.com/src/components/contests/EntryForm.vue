<template>

  <div v-if="entryForm && entryForm.title" class="cell example example2">

    <form v-on:submit="formSubmitted" id="payment-form" :class="loading ? 'is_loading' : '' ">

      <div class="">
        
        <h3 v-if="entryForm.title.toLowerCase() !== 'scavenger hunt'" v-html="entryForm.title" class="form-title test"></h3>
        <h3  v-else class="form-title test">{{currentCategory}}</h3>
      </div>
      <div v-for="(field, idx) in entryForm.fields" :key="field.name" :class="field.missing && field.required === 'true' ? 'field has-error ' + field.classes  : 'field ' + field.classes">


          <div v-if="field.field_type === 'student' && entryForm.fields[4].value === 'Student'">
            <label for="field.name" class="form-check-label">
              {{ field.title }} <span v-if="field.required === 'true'" class="red">*</span>
            </label>
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


        <div v-if="field.field_type === 'date'">
            <label :for="field.name" class="form-check-label textarea">{{ field.title }} <span v-if="field.required === 'true'" class="red">*</span></label>
            <input type="date" v-model="field.value" />
        </div>

        <div v-if="field.field_type === 'select'">
          <div class="field">
          <label class="form-check-label">{{ field.title }} <span class="red">*</span></label>
            <v-select @input="(val) => selected(val, idx)" :value="field.value" :options="selectOptions" :placeholder="'Select a ' + field.title"></v-select>
          </div>
        </div>

        <div v-if="field.field_type === 'select_single'">
          <div class="field">
          <label class="form-check-label">{{ field.title }} <span v-if="field.required === true" class="red">*</span></label>
            <v-select :value="selectedSingleCategories[field.name]" @input="(val) => selectedSingle(val, field.name)" label="full_name" :options="selectSingleCategories[field.name]" :placeholder="'Select a ' + field.title"></v-select>
          </div>
        </div>

        <div v-if="field.field_type === 'select_options'">
          <div class="field">
          <label class="form-check-label">{{ field.title }} <span v-if="field.required === true" class="red">*</span></label>
            <v-select :value="field.value" @input="(val) => selectedOption(val, idx)" :options="field.options" :placeholder="'Select a ' + field.title"></v-select>
          </div>
        </div>

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
            />
            <div class="baseline"></div>
        </div>


        <div v-if="field.field_type === 'image'" class="image-field">
            <label class="file-label">{{ field.title }} <span class="red">*</span></label> 
            <!-- <ExtraInfo text="For the a cover image, vertical photos work best. Submit photos in high-resolution." /> -->
            <div class="d-block">
              <input id="upload" ref="upload" type="file" accept="image/*"
                v-on:change="handleImageUploadChange"
                v-on:click ="(event)=> { 
                  event.target.value = null
                }"
              />
            </div>
            
            <div v-if="field.value || field.image_id" id="image-overlay">
              <img :src="field.value ? field.value : S3_URL + '/' + field.image_id + '/conversions/large.jpg'" />

            </div>

        </div>
      

        <div v-if="field.field_type === 'image_covered'" class="image-field">
            <label class="file-label">{{ field.title }} <span class="red">*</span> - Photo Tips</label> 
            <!-- <ExtraInfo text="For the a cover image, vertical photos work best. Submit photos in high-resolution." /> -->
            <div class="d-block">
              <input id="upload" ref="upload" type="file" accept="image/*"
                v-on:change="handleImageUploadChange"
                v-on:click ="(event)=> { 
                  event.target.value = null
                }"
              />
            </div>
            
            <div v-if="field.value || field.image_id" id="covered-image">
              <img id="user-image" :src="field.value ? field.value : S3_URL + '/' + field.image_id + '/conversions/large.jpg'" />
              <img v-if="entryForm.title.toLowerCase() !== 'scavenger hunt'" id="coverImage" src='/images/cover_template.png' />
            </div>

        </div>


        <div v-if="field.field_type === 'textarea'">
          <div class="textarea">
              <label for="item-description" class="form-check-label textarea">{{ field.title }} <span class="red">*</span></label>
              <textarea value="field.value" required id="item-description" name="item_description" type="text" class="" 
              v-model="field.value" 
              placeholder="limit of 600 characters" />
              <div class="baseline"></div>
          </div>
          <p :class="field.missing && field.required === 'true' ? 'error-message' : 'display-none'">This field cannot be blank. It must be between 1 and 600 characters.</p>
        </div>

        <div v-if="field.field_type === 'permission'">
          <div class="checkbox">
          
              <input required :name="field.name" id="pic-perm" type="checkbox" v-model="field.value" /> 
              <label for="pic-perm" class="checkbox-label">
                &nbsp;{{ field.title }} <span class="red">*</span>
              </label>
              
              <div v-if="field.info" v-html="field.info" />

              <div class="baseline"></div>

          </div>
          <p :class="field.missing && field.required === 'true' ? 'error-message' : 'display-none'">Permission to use photo must be checked.</p> 
        </div>


      </div>
      <div class="text-center full-width">
        <span class="scroll btn btn-primary" v-on:click="formSubmitted">Next Step</span>
      </div>

    </form>
  </div>
</template>



<script>
import {API_URL,S3_URL} from '../../environment.js';
import vSelect from '../vue-select';
import axios from 'axios';
// import "core-js/stable";
// import "regenerator-runtime/runtime";

export default {
  name: 'comment',
  props: ['id','category'],
  data () {
    return {
      open: true,
      user_id:this._props['id'],
      S3_URL: S3_URL,
      selectOptions: [
          { value: 'Architectural', label: 'Architectural (including cityscapes, interiors, industrial, transportation, infrastructure)' },
        { value: 'Landscape & Nature', label: 'Landscape & Nature (including plant life, waterfronts, sunrises and sunsets, but not wildlife or Jersey Shore photos)' },
        { value: 'Lifestyle', label: 'Lifestyle (including pets, farm animals, portraits, children, sports and culture)' },
        {value: 'Wildlife', label:'Wildlife (including wild birds, fish and animals living wild, but not pets or domesticated or farm animals, which are in the Lifestyle category)'},
        { value: 'Down the shore', label: 'Down the shore (including all photos taken at jersey shore locations)' },
        { value: 'Special', label: 'Special (abstract, conceptual, night photography, long exposure, digitally manipulated, multiple exposure, multiple images)' },
        { value: 'Student', label: 'Photographs by Students (7th through 12th grade; students under the age of 18 must have permission of parents to enter)'},
        { value: 'Drone and Aerial', label: 'Drone & Aerial (any eligible subject matter taken with a drone device or from an elevated position)'}
        ],
      update:false,
      count:1,
      makingRequest:false
    }
  },

  created() {
  
    
  },

  beforeUpdate(){
   console.log(" before update ")
   this.update = !this.update;
  },
  beforeMount(){
    // console.log("before Mount: "+ this.contest.slug );
    // console.log("before Mount: "+ this.$store.state.contest.slug );
    // if(contest.slug !== "scavenger-hunt"){
    //   this.defaultOptions();
    // }
  },
  mounted(){
   console.log("Mounted The contest. " + this.contest.slug)
   console.log("Mounted The contest. " + this.$store.state.contest.slug)
   this.$nextTick(function(){

    //  console.dir(this.id)
   })
    
  },

  computed: {
    contest () {
      return this.$store.state.contest;
    },

    currentCategory(){
      let cat = this.$props.category;
      if(cat == "northern-new-jersey"){cat = "Northern New Jersey"}
      if(cat == "southern-new-jersey"){cat = "Southern New Jersey"}
      if(cat == "central-nj"){cat = "Central New Jersey"}
      if(cat == "down-the-shore"){cat = "Down The Shore"}
      if(cat == "historic-sites"){cat = "Historic Sites"}
      if(cat == "take-a-hike"){cat = "Take A Hike"}
     console.dir(cat)
      return cat;
    },

    entryForm() {
      return this.$store.state.entryForm;
    },
    gallery_or_vote() {
      return this.contest.status === 'vote' ? 'Vote' : 'Gallery';
    },
    loading() {
      return this.$store.state.loading;
    },
    entry() {
      return this.$store.state.entry;
    },
    selectedSingleCategories() {
      return this.$store.state.selectedSingleCategories;
    },
    selectSingleCategories() {
      return this.$store.state.selectSingleCategories;
    },

    user() {
      return this.$store.state.user;
    }
  },
  components: {
    'v-select': vSelect,
  },
  methods: {

     updateSelectOptions(){
      
      let query = this.$route.query.cat;
      if(query !== ""){
        let uri = `${API_URL}/api/getsubcategories/${this.$route.query.cat}/${this.user.id}`;
        let response = axios.get(uri)
        .then((response) => {
          this.makingRequest = true;
          this.handleSubCategories(response.data);
        })
        .catch( (error) => {})
      }
      
    },
    handleSubCategories(data){
      this.clearSelectOptions();
      data ? this.assignSelectOptions(data) : this.defaultOptions();
    },
    
    clearSelectOptions(){
      this.selectOptions = [];
    },

    assignSelectOptions(data){
      data.map(item =>{
        if(!item.disabled){
        this.selectOptions.push({ value:item.name,label:item.name})
        }
      }) 
    },
    
    defaultOptions(){
      let defaultOptions = [
        { value: 'Architectural', label: 'Architectural (including cityscapes, interiors, industrial, transportation, infrastructure)' },
        { value: 'Landscape & Nature', label: 'Landscape & Nature (including plant life, waterfronts, sunrises and sunsets, but not wildlife or Jersey Shore photos)' },
        { value: 'Lifestyle', label: 'Lifestyle (including pets, farm animals, portraits, children, sports and culture)' },
        {value: 'Wildlife', label:'Wildlife (including wild birds, fish and animals living wild, but not pets or domesticated or farm animals, which are in the Lifestyle category)'},
        { value: 'Down the shore', label: 'Down the shore (including all photos taken at jersey shore locations)' },
        { value: 'Special', label: 'Special (abstract, conceptual, night photography, long exposure, digitally manipulated, multiple exposure, multiple images)' },
        { value: 'Student', label: 'Photographs by Students (7th through 12th grade; students under the age of 18 must have permission of parents to enter)'},
        { value: 'Drone and Aerial', label: 'Drone & Aerial (any eligible subject matter taken with a drone device or from an elevated position)'}
        ];

      defaultOptions.map( item =>{
        console.log(item.value)
        this.selectOptions.push({value:item.value, label :item.label})
      })
    },
    pluralize: n => n + (n === 1 ? ' reply' : ' replies'),
    selected(val, idx) {
      let form = Object.assign({}, this.entryForm);
      form.fields[idx].value = val.value;
      console.log('form', form);
      this.$store.dispatch('ENTRY_FORM', {entryForm: form});
    },
    selectedSingle(val, taxonomy) {
      console.log('selected single', val, taxonomy, this.selectedSingleCategories);
      let selectedSingleCategories = Object.assign({}, this.selectedSingleCategories);
      selectedSingleCategories[taxonomy] = val;
      this.$store.dispatch('SET_STATE', {key: 'selectedSingleCategories', data: selectedSingleCategories})
    },
    selectedOption(val, idx) {
      let form = Object.assign({}, this.entryForm);
      form.fields[idx].value = val.value;
      console.log('form', form);
      this.$store.dispatch('ENTRY_FORM', {entryForm: form});
    },
    handleImageUploadChange(e){

      console.log('image index');
      
      // add the uploaded image to the input
      const reader = new FileReader();
      const file = e.target.files[0];
      const file_size = file.size;
      
      console.log("The file is " + file);
      console.log("The file size is " + file_size);
      if (file_size > 10000000) {
        alert('Your file is too big (' + file_size/1000000 + 'mb). Please upload an image less than 10mb.');
        return;
      }

      reader.onload = (upload) => {
        var img = new Image();
        img.src = reader.result;
        img.onload = function(e) {

          let form = Object.assign({}, this.entryForm);
          form.fields[0].value = upload.target.result;
          form.fields[0].filename = file.name;
          form.fields[0].filetype = file.type;
          this.$store.dispatch('ENTRY_FORM', {entryForm: form});

        }.bind(this);

      };

      
      reader.readAsDataURL(file);

    },


    

    validateItem() {

      let showMissing = false;
      let error = []
      let form = Object.assign({}, this.entryForm);
  
      form.fields.map((field, index) => {
        const requiredIsMissing =  field.required === "true" && field.name !== "id" && (field.value === null ||  field.value === '' || field.value === undefined || field.value === false);
        if(field.name === "item_name"){
          field.value = this.setNameIfEmpty();
        }
        if (requiredIsMissing) {
          showMissing = true;
          field.missing = true;

        }
        
        if(showMissing){
          let missingField = field.name ? field.name : "";
          console.log("the missing field is " + missingField)
            
          if(missingField  !== "undefined"){
            error.push(missingField + "\n");
            }
        }
      })


      

      // if ((this.state.data_uri == undefined || !this.state.data_uri) && !this.props.entryForm.fields.media) {
      // 	showMissing = true;
      // }

      if (showMissing) {
        this.$store.dispatch('ENTRY_FORM', {entryForm: form});
        this.missingRequired = true;

        // this.props.setContestEntryFormData(this.props.item, form)

        
        return [false,error.toString()];  

      }

      return [true,""];
    },


    setNameIfEmpty(){
      let item_name = document.getElementById('item_name');
      if(item_name){
      let category = this.$route.query.cat;
      item_name.value = category  != '' && item_name.value.trim() === "" && item_name.required === false? category  : item_name.value;
      return item_name.value;
      }
    },
    formSubmitted(e) {
      e.preventDefault();
      const isValid = this.validateItem();
      if (!isValid[0]) {
        console.log("the erors are...")
        console.dir(isValid)
        console.log("the erors are ended...")
        // alert('Some required information is missing. Please review the form.');
        alert("The following fields cannot be blank \n" + isValid[1]);

        return;
      }
      
      this.$emit('submitted');

    },
  },

  watch:{
    update: function(){
      if(this.user){
        if(!this.makingRequest){
        console.log("making a request " + this.makingRequest)
          this.updateSelectOptions();
        }
      }
      // this.selectOptions.push({value:"updated item", label :"updated item"})
    }
  }
}
</script>

<style lang="scss" scoped>
.v-select .dropdown-menu{
  text-transform: capitalize;
}

#covered-image {
    position: relative;
    overflow: hidden;
}
#user-image {
    position: absolute;
}
.v-select.single .selected-tag{
  text-transform: capitalize;
}

.category{
  font-size: 1.3em;
}
</style>
