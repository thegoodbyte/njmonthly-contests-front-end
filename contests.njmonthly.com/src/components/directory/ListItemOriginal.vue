<template>
	<div :class="listItemClass">
			<div class='hits-wrapper'>
				<div class='row'>
					<div class='col-md-12'>
						<div class='row'>
							<div v-if="image" class='col-md-3 cl-xs-12 img-col'>
								
								<div class='hit-image'>
										<img :src="listing.image" />
                    <div v-bind:style='{ backgroundImage: "url(" + listing.image + ")", }' class="table-wrapper" ></div>
								</div>
							</div>

							<div :class="colWidthForContent">
								<div class="row">
									<div class='col-md-6 col-xs-12'>
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
									<div class='col-md-6 col-xs-12 right'>
										<div class="dir-card__distance">
											<span class="distance-text">{{distance}} mi</span>
										</div>
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
				profile = profile.slice(0, 300) + '...';
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
</style>
