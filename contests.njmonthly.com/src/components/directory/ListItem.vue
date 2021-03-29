<template>
	<div :class="listItemClass">
			<div class='hits-wrapper'>
				<div class='row'>
					<div class='col-md-12'>
            <div class=''>
              <span class="distance-text-mobile">{{distance}} mi</span>
              <div class="dsr-hit-main-content">
                <div class="list-item-title-container clear-fix">
                  <div v-if="pinned" class="sponsored-text">Ad</div>
                  <h3 class="dir-card__title" v-html="listing.title"></h3>
                </div>
                <stars v-if="listing.rating" :rating="listing.rating"></stars>
                <p class='dir-card__city'>{{ listing.city }}</p>
                <p v-if="cleanCategories" class="dir-card__facets">
                  <span v-for="(categoryName, index) in cleanCategories" :key="index">
                    {{ categoryName }}{{ index + 1 === cleanCategories.length ? '' : ','}}
                  </span>
                </p>
              </div>
            </div>
						<div class='row'>
							<div v-if="image" class='col-md-3 cl-xs-12 img-col'>
								
								<div class='hit-image'>
										<img :src="listing.image" />
                    <div v-bind:style='{ backgroundImage: "url(" + listing.image + ")", }' class="table-wrapper" ></div>
								</div>
							</div>

							<div :class="colWidthForContent">
								<div class="row">

									<div class='col-md-12 col-xs-12 right'>
										<!-- <div class="dir-card__distance">
											<span class="distance-text">{{distance}} mi</span>
										</div> -->
										<div v-if="awards">
											<div v-for="award in awards" :key="award" class="award-button">
												<span>{{ award }}</span> <div class="trophy-icon"><trophy></trophy></div>
											</div>
										</div>
									</div>
								</div>
								<div v-if="displayProfile" class="row">
									<div class="col-md-12">
										<div class="row">
											<div class="col-md-12">
												<div class="listing-profile" v-html="profile"></div>
											</div>
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
import Stars from './Stars.vue';
import Trophy from './ui/Trophy.vue';

export default {
  name: 'list-item',
	props: ['listing'],
	components: {
		Stars,
		Trophy
	},
  computed: {
	  listItemClass() {
		  return 'dsr-hits--item level_' + this.listing.ad_level;
	  },
	  disabled() {
		  return this.listing.ad_level === 0 ? true : false;
		},
		colWidthForContent() {
			return this.listing.image && this.listing.ad_level !== 0 ? 'col-md-9' : 'col-md-12';
		},
		image() {
			return this.listing.image && this.listing.ad_level !== 0;
		},
		distance() {
      let computedMiles = '';
      if (this.listing._rankingInfo.matchedGeoLocation) {
        const miles = this.listing._rankingInfo.matchedGeoLocation.distance * 0.000621371;
        computedMiles = Math.round(miles * 10) / 10;
      }
			return computedMiles;
		},
		pinned() {
			return this.listing.ad_level === 2;
		},
		ratingIsNotWholeNumber() {
			const starsCount = parseFloat(this.listing.rating);
			return !Number.isInteger(starsCount);
		},
		displayProfile() {
			const userCanHaveProfile = this.listing.content && this.listing.ad_level !== 0;
			// console.log('this.listing.content', this.listing.content, userCanHaveProfile)
			return userCanHaveProfile;
		},
		profile() {
			var full_desc = this.listing.content;
			let profile = full_desc.replace(/<(?:.|\n)*?>/gm, '');
			if (profile.length > 300) {
				profile = profile.slice(0, 300) + '... Read more';
			} else {
				profile = profile;
			}
			return profile;
		},
    cleanCategories() {
      let categories = '';
      if (this.listing.hcategory) {
        if (this.listing.hcategory['lvl2']) {
          categories = this.listing.hcategory['lvl2'];
        } else if (this.listing.hcategory['lvl1']) {
          categories = this.listing.hcategory['lvl1'];
        } else if (this.listing.hcategory['lvl0']) {
          categories = this.listing.hcategory['lvl0'];
        }

        let cleanCategories = [];
        categories.map(function(category) {
          var parts = category.split(' > ');
          var cleanCategory = parts[parts.length - 1];
          cleanCategories.push(cleanCategory);
        })
  
        return cleanCategories;
      }

      return false;

		},
		
		awardYears() {

		},

    awards() {
			let hawards = '';
			let hawardsWithYears = [];
      if (this.listing.hawards) {

				// If this listing has an award (Critics' Pick)
        if (this.listing.hawards['lvl0']) {
					hawards = this.listing.hawards['lvl0'];
					
					// For each award, add the years to it (2018, 2017)
					// The end product will look like  Critics' Picks (2018, 2017)
					// hawards = ['Critics Picks', 'Best Breakfasts']
					hawards.map(function(haward) {

						let hawardWithYear = haward;

						// If this award has a sub category (2017, 2018, etc)
						if (this.listing.hawards['lvl1']) {

							// The years string will look like "(2017, 2018)" once finished
							let years = ' (';

							// Get the relevant years by checking to see if the award name (Best Breakfast)
							// is in the year sub category name (Best Breakfast > 2018)
							let relevantYears = [];
							this.listing.hawards['lvl1'].map(function(year) {
								if (year.indexOf(haward) !== -1) {
									var parts = year.split(' > ');
									var cleanYear = parts[parts.length - 1];
									relevantYears.push(cleanYear);

								}
							});

							// Add to the years string
							relevantYears.map(function(year, index) {
								years += year;
								if (index + 1 !== relevantYears.length) {
									years += ', ';
								}
							})
							
							years += ')';

							if (relevantYears.length > 0) {
								hawardWithYear += years;
							}
							
							
						}

						hawardsWithYears.push(hawardWithYear);
					}, this)
        }
        return hawardsWithYears;
      }
      return false;

			// console.log('hawards', this.listing.hawards.lvl0)
			// if (this.listing.hawards !== undefined && this.listing.hawards.lvl0 !== undefined && this.listing.hawards.lvl0.length > 0) {
			// 	console.log('return awards', this.listing.hawards);
			// 	return this.listing.hawards.lvl0;
			// }
			// return false;
    }
		// category() {
		// 	if (this.listing.sub_category !== undefined && this.listing.sub_category.length > 0) {
		// 		return this.listing.sub_category;
		// 	} else if (this.listing.category !== undefined && this.listing.category.length > 0) {
		// 		return this.listing.category;
		// 	}
		// 	return false;
		// },

		// awards() {
    //   let hawards = '';
    //   if (this.listing.hawards['lvl1']) {
    //     hawards = this.listing.hawards['lvl1'];
    //   } else if (this.listing.hawards['lvl0']) {
    //     hawards = this.listing.hawards['lvl0'];
    //   } else {
    //     return false;
		// 	}
		// 	return hawards;

		// 	// console.log('hawards', this.listing.hawards.lvl0)
		// 	// if (this.listing.hawards !== undefined && this.listing.hawards.lvl0 !== undefined && this.listing.hawards.lvl0.length > 0) {
		// 	// 	console.log('return awards', this.listing.hawards);
		// 	// 	return this.listing.hawards.lvl0;
		// 	// }
		// 	// return false;
		// }
  },
  methods: {

  }
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

.img-col {
    overflow: hidden;
}




.hits-wrapper .stars-container {
  margin-left: 0px;
}


.dir-card__distance {
  text-align: right;
  display: none;
}

.dir-card__title {

  font-size: 17px;
  margin-bottom: 1px;
  color: black !important;
  font-weight: 800;
  margin-top: 5px;
  // max-width: 200px;
}


.dir-card__city {

text-transform: uppercase;
font-size: 13px !important;
letter-spacing: 1px;
margin-bottom: 0px !important;

}


.dir-card__facets {

font-weight: 600;
font-size: 15px;
line-height: 14px;
line-height: 16px;
margin-bottom: 5px !important;

}


.dsr-hits--item.level_2 .dir-card__title {

color: #4b4b4b;

}


.list-item-title-container .sponsored-text, 
.list-item-title-container .dir-card__title__link {
    float: left;
}
.list-item-title-container .dir-card__title {
    margin-top: 0px;
}

.dsr-hits--item.level_1,
.dsr-hits--item.level_2 {
    background: white;
    transition: all .3s ease-in-out;
}

.dsr-hits--item.level_1:hover,
.dsr-hits--item.level_2:hover {
    background: #edf5ff;
    //background: #cfffca;
}


.dsr-hits--item {
    // padding: 6px 5px;
    // border-bottom: 1px solid #f0f8ff;
    border-bottom: 1px solid #E4E9E9;
}

.dsr-hits--item .hits-wrapper {
    padding: 10px 10px;
    color: black;
}

.sponsored-hits .dsr-hits--item.level_2 .hits-wrapper {
  background-color: #FFFBDB;
  transition: all .3s ease-in-out;
}

.sponsored-hits .dsr-hits--item.level_2 .hits-wrapper:hover {
  background-color: #FFFCE8;
}

.listing-profile {
    // font-style: italic;
    margin-top: 3px;
}

.sponsored-text {

    text-transform: uppercase;
    font-size: 8px;
    border: 1px solid #787878;
    color: #787878;
    display: inline-block;
    padding: 1px 2px;
    border-radius: 3px;
    margin-right: 5px;
    top: 4px;
    position: relative;

}
.dsr-hits--item .sponsored-text {
    display: none;
}

.sponsored-hits .dsr-hits--item .sponsored-text {
    display: inline-block;
}

.distance-text {

    font-size: 12px;

}

// .sponsored-hits .dsr-hits--item.level_2 .distance-text {
//     display: none;
// }

// .sponsored-hits .dsr-hits--item.level_2 .distance-text-mobile {
//   display: none;
// }

.distance-text-mobile {
  font-size: 12px;
}
.distance-text-mobile,
.sponsored-text-mobile {
    float: right;
}



// .dir-card__title__link {

//     display: inline-block;

// }



// Hide the text designating a listing as sponsored in the
// normal listings
// .sponsored-text,
// .sponsored-text-mobile {
//     display: none;
// }
// .sponsored-hits .sponsored-text,
// .sponsored-hits .sponsored-text-mobile {
//     display: block;
// }

// .dir-card__title {
//     font-size: 16px;
//     margin-bottom: 5px;
// }
.dsr-hits--item p {
    margin-bottom: 3px;
}

.dsr-hits--item p:last-child {
    margin-bottom: 0px;
}

// .dsr-hits--item .hit-image img {
//     max-height: 100px;
// }
// .table-wrapper {
//     position: relative;
//     display: table;
//     width: 150px;
//     height: 150px;
// }


.hits-wrapper .hit-image {

  height: 150px;
  width: 150px;
  overflow: hidden;
  position: relative;

}
.hits-wrapper .hit-image img {

  position: relative;
  z-index: 10;
  height: 100%;
  max-width: initial;
  margin-left: 50%;
  transform: translateX(-50%);
}

.table-wrapper {
    background-size: 1000% 1000%;
    background-position: top right;
    background-color: #f2f2f2;
    background-size: 400%;
    -webkit-filter: blur(5px);
    filter: blur(5px);
    width: 120%;
    height: 120%;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    z-index: 1;
}

// .hit-image {
//     display: inline-block;
//     vertical-align: top;
//     margin-bottom: 10px;
// }
// .hit-image {
//     max-height: 150px;
//     max-width: 150px;
//     vertical-align: middle;
//     display: table-cell;
// }

// .dsr-hit-main-content {
//     display: inline-block;
// }
// .award-button {
//     display: inline-block;
//     padding: 3px 6px;
//     border: 1px solid #9b9b9b;
//     border-radius: 3px;
//     margin-bottom: 4px;
//     box-shadow: 1px 1px 1px #c5c5c5;
// }

// .award-button {

//     background-color: #159B5D;
//     color: white;
//     padding: 3px 6px;
//     display: inline-block;
//     margin-bottom: 4px;

// }


// .award-button {

//     background-color: #FFFF00;
//     color: black;
//     padding: 3px 6px;
//     display: inline-block;
//     margin-bottom: 4px;
//     text-transform: uppercase;
//     font-size: 10px;
//     letter-spacing: .9px;
//     font-weight: bold;

// }

.award-button {
    color: #e61700;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: .9px;
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
    line-height: 14px;
}


// .dsr-hits--item {
//     padding: 20px;
//     border-bottom: 1px solid aliceblue;
// }
/* Sponsored List Items */

@media (min-width: 768px) {
    .dir-card__title {
        max-width: none;
    }
}
</style>
