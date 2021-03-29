<template>
  <ul :class="containerClass" v-if="!noLiSurround">
    <li v-if="firstLastButton" :class="[pageClass, firstPageSelected() ? disabledClass : '']">
      <a @click="selectFirstPage()" @keyup.enter="selectFirstPage()" :class="pageLinkClass" :tabindex="firstPageSelected() ? -1 : 0" v-html="firstButtonText"></a>
    </li>

    <li v-if="!(firstPageSelected() && hidePrevNext)" :class="[prevClass, firstPageSelected() ? disabledClass : '']">

      <a @click="prevPage()" @keyup.enter="prevPage()" :class="prevLinkClass" :tabindex="firstPageSelected() ? -1 : 0" v-html="prevText">
        
      </a>

    </li>

    <li v-for="page in pages" :class="[pageClass, page.selected ? activeClass : '', page.disabled ? disabledClass : '', page.breakView ? breakViewClass: '']">

      <a v-if="page.breakView" :class="[pageLinkClass, breakViewLinkClass]" tabindex="0">

        <slot name="breakViewContent">

          {{ breakViewText }}

        </slot>

      </a>

      <a v-else-if="page.disabled" :class="pageLinkClass" tabindex="0">

        {{ page.content }}

      </a>

      <a v-else @click="handlePageSelected(page.index + 1)" @keyup.enter="handlePageSelected(page.index + 1)" :class="pageLinkClass" tabindex="0">

        {{ page.content }}

      </a>

    </li>

    <li v-if="!(lastPageSelected() && hidePrevNext)" :class="[nextClass, lastPageSelected() ? disabledClass : '']">

      <a @click="nextPage()" @keyup.enter="nextPage()" :class="nextLinkClass" :tabindex="lastPageSelected() ? -1 : 0" v-html="nextText">
        
      </a>

    </li>

    <li v-if="firstLastButton" :class="[pageClass, lastPageSelected() ? disabledClass : '']">

      <a @click="selectLastPage()" @keyup.enter="selectLastPage()" :class="pageLinkClass" :tabindex="lastPageSelected() ? -1 : 0" v-html="lastButtonText">
        
      </a>

    </li>

  </ul>

  <div :class="containerClass" v-else>
    <a v-if="firstLastButton" @click="selectFirstPage()" @keyup.enter="selectFirstPage()" :class="[pageLinkClass, firstPageSelected() ? disabledClass : '']" tabindex="0" v-html="firstButtonText"></a>
    <a v-if="!(firstPageSelected() && hidePrevNext)" @click="prevPage()" @keyup.enter="prevPage()" :class="[prevLinkClass, firstPageSelected() ? disabledClass : '']" tabindex="0" v-html="prevText"></a>
    <template v-for="page in pages">
      <a v-if="page.breakView" :class="[pageLinkClass, breakViewLinkClass, page.disabled ? disabledClass : '']" tabindex="0"><slot name="breakViewContent">{{ breakViewText }}</slot></a>
      <a v-else-if="page.disabled" :class="[pageLinkClass, page.selected ? activeClass : '', disabledClass]" tabindex="0">{{ page.content }}</a>
      <a v-else @click="handlePageSelected(page.index + 1)" @keyup.enter="handlePageSelected(page.index + 1)" :class="[pageLinkClass, page.selected ? activeClass : '']" tabindex="0">{{ page.content }}</a>
    </template>
    <a v-if="!(lastPageSelected() && hidePrevNext)" @click="nextPage()" @keyup.enter="nextPage()" :class="[nextLinkClass, lastPageSelected() ? disabledClass : '']" tabindex="0" v-html="nextText"></a>
    <a v-if="firstLastButton" @click="selectLastPage()" @keyup.enter="selectLastPage()" :class="[pageLinkClass, lastPageSelected() ? disabledClass : '']" tabindex="0" v-html="lastButtonText"></a>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    },
    pageCount: {
      type: Number,
      required: true
    },
    forcePage: {
      type: Number
    },
    clickHandler: {
      type: Function,
      default: () => { }
    },
    pageRange: {
      type: Number,
      default: 3
    },
    marginPages: {
      type: Number,
      default: 1
    },
    prevText: {
      type: String,
      default: 'Prev'
    },
    nextText: {
      type: String,
      default: 'Next'
    },
    breakViewText: {
      type: String,
      default: '…'
    },
    containerClass: {
      type: String
    },
    pageClass: {
      type: String
    },
    pageLinkClass: {
      type: String
    },
    prevClass: {
      type: String
    },
    prevLinkClass: {
      type: String
    },
    nextClass: {
      type: String
    },
    nextLinkClass: {
      type: String
    },
    breakViewClass: {
      type: String
    },
    breakViewLinkClass: {
      type: String
    },
    activeClass: {
      type: String,
      default: 'active'
    },
    disabledClass: {
      type: String,
      default: 'disabled'
    },
    noLiSurround: {
      type: Boolean,
      default: false
    },
    firstLastButton: {
      type: Boolean,
      default: false
    },
    firstButtonText: {
      type: String,
      default: 'First'
    },
    lastButtonText: {
      type: String,
      default: 'Last'
    },
    hidePrevNext: {
      type: Boolean,
      default: false
    }
  },
  beforeUpdate() {
    if (this.forcePage === undefined) return
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage
    }
  },
  computed: {
    selected: function() {
      return this.value;
    },
    pages: function () {
      let items = {}
      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          let page = {
            index: index,
            content: index + 1,
            selected: index === (this.selected - 1)
          }
          items[index] = page
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2)

        console.log('halfPageRange', halfPageRange);

        let setPageItem = index => {
          let page = {
            index: index,
            content: index + 1,
            selected: index === (this.selected - 1)
          }

          items[index] = page
        }

        let setBreakView = index => {
          let breakView = {
            disabled: true,
            breakView: true
          }

          items[index] = breakView
        }

        // 1st - loop thru low end of margin pages
        for (let i = 0; i < this.marginPages; i++) {
          setPageItem(i);
        }

        console.log('this.selected', this.selected);

        // 2nd - loop thru selected range
        let selectedRangeLow = 0;
        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange;
        }

        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1;
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
        }

        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
          setPageItem(i);
        }

        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1)
        }

        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1)
        }

        // 3rd - loop thru high end of margin pages
        for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
          setPageItem(i);
        }
      }

      console.log('items finish', items);
      return items
    }
  },
  methods: {
    handlePageSelected(selected) {
      if (this.selected === selected) return

      this.$emit('input', selected)
      this.clickHandler(selected)
    },
    prevPage() {
      console.log(this.selected);
      if (this.selected <= 1) return

      this.$emit('input', this.selected - 1)
      this.clickHandler(this.selected - 1)
    },
    nextPage() {
      console.log(this.selected, this.pageCount, this.selected >= this.pageCount);
      if (this.selected >= this.pageCount) return

      this.$emit('input', this.selected + 1)
      this.clickHandler(this.selected + 1)
    },
    firstPageSelected() {
      return this.selected === 1
    },
    lastPageSelected() {
      return (this.selected === this.pageCount) || (this.pageCount === 0)
    },
    selectFirstPage() {
      if (this.selected <= 1) return

      this.$emit('input', 1)
      this.clickHandler(1)
    },
    selectLastPage() {
      if (this.selected >= this.pageCount) return

      this.$emit('input', this.pageCount)
      this.clickHandler(this.pageCount)
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
}
.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  margin-bottom: 100px;
  border-radius: 4px;
}
.pagination > li {
  display: inline;
}
.pagination > li > a,
.pagination > li > span {
  position: relative;
  float: left;
  padding: 6px 12px;
  line-height: 1.42857143;
  text-decoration: none;
  color: #333;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  margin-left: -1px;
}
.pagination > li:first-child > a,
.pagination > li:first-child > span {
  margin-left: 0;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
}
.pagination > li:last-child > a,
.pagination > li:last-child > span {
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
}
.pagination > li > a:hover,
.pagination > li > span:hover,
.pagination > li > a:focus,
.pagination > li > span:focus {
  z-index: 3;
  color: #159b5d;
  background-color: #eeeeee;
  border-color: #dddddd;
}
.pagination > .active > a,
.pagination > .active > span,
.pagination > .active > a:hover,
.pagination > .active > span:hover,
.pagination > .active > a:focus,
.pagination > .active > span:focus {
  z-index: 2;
  color: #ffffff;
  background-color: #159b5d;
  border-color: #159b5d;
  cursor: default;
}
.pagination > .disabled > span,
.pagination > .disabled > span:hover,
.pagination > .disabled > span:focus,
.pagination > .disabled > a,
.pagination > .disabled > a:hover,
.pagination > .disabled > a:focus {
  color: #777777;
  background-color: #ffffff;
  border-color: #dddddd;
  cursor: not-allowed;
}
.pagination-lg > li > a,
.pagination-lg > li > span {
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
}
.pagination-lg > li:first-child > a,
.pagination-lg > li:first-child > span {
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
}
.pagination-lg > li:last-child > a,
.pagination-lg > li:last-child > span {
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
}
.pagination-sm > li > a,
.pagination-sm > li > span {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
}
.pagination-sm > li:first-child > a,
.pagination-sm > li:first-child > span {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
}
.pagination-sm > li:last-child > a,
.pagination-sm > li:last-child > span {
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
}
</style>
