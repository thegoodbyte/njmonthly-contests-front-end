<template>
  <div class="stars-container clear-fix">
    <span class="star" v-for="index in ratingNumber" :key="index">
        <star></star>
    </span>
    <span class="half star" v-if="ratingIsNotWholeNumber">
          <star></star>
    </span>
  </div>
</template>

<script>
import Star from './ui/Star.vue';
export default {
  name: 'stars',
  props: ['rating'],
  components: {
    Star,
  },
  computed: {
    ratingNumber() {
      return parseInt(this.rating);
    },
		ratingIsNotWholeNumber() {
      const starsCount = parseFloat(this.rating);
      console.log('starsCount', starsCount);
			return !Number.isInteger(starsCount);
		}
  },
  methods: {

  }
}
</script>

<style lang="scss">

</style>
