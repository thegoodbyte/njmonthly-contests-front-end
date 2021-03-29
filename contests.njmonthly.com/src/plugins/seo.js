export default {
  install (Vue) {
    Vue.prototype.$seo = function $seo (page, title, imageUrl, description) {
      const list = {
        common: ['', '', ''],
        singleEntry: ['s% | New Jersey Monthly Contests', 's%'],
        contest: ['s% | New Jersey Monthly Contests', 's%'],
        user: ['New Jersey Monthly Contests | User | s%'],
      }
      const item = list[page] || list.common
      const meta = {}

      if (title && item[0]) {
        meta.title = item[0].replace('s%', title)
      } else {
        meta.title = title || item[0]
      }


      if (imageUrl && item[1]) {
        meta.imageUrl = item[1].replace('s%', imageUrl)
      } else {
        meta.imageUrl = imageUrl || item[1]
      }

      console.log('SEO', meta);

      if (description && item[2]) {
        meta.description = item[2].replace('s%', description)
      } else {
        meta.description = description || item[2]
      }

      
      return {
        title: meta.title,
        meta: [
          { vmid: 'description', name: 'description', content: meta.description },
          { vmid: 'og:image', property: 'og:image', content: meta.imageUrl },
        ],
      }
    }
  },
}
