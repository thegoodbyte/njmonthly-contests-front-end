import Vue from 'vue'
import 'es6-promise/auto'
import Utils from 'utils'
import ProgressBar from 'components/ProgressBar.vue'
import createApp from './app'
import VueAnalytics from 'vue-analytics'
// import Loading from 'components/Loading.vue'
// Google Analytics
Vue.use(VueAnalytics, {
  id: 'UA-743072-8',
  debug: {
    enabled: false
  }
});

// global progress bar
const bar = new Vue(ProgressBar).$mount()
Vue.prototype.$bar = bar
document.body.appendChild(bar.$el)


// // global loading overlay
// const loading = new Vue(Loading).$mount();
// Vue.prototype.$loading = loading;
// document.body.appendChild(loading.$el)






// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        to: to,
        from: from
      }).then(next).catch(next)
    } else {
      next()
    }
  },
})






const { app, router, store } = createApp()
const { location } = window

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      diffed = diffed || prevMatched[i] !== c
      return diffed
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    const prevProject = Utils.getProject()

    Utils.getProject(to)

    if (!asyncDataHooks.length) {
      if (prevProject !== Utils.getProject()) location.reload()

      return next()
    }
    bar.start()
    store.dispatch('TOGGLE_LOADING', {loading: store.state.loading})

    return Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        bar.finish()
        store.dispatch('TOGGLE_LOADING', {loading: store.state.loading})
        next()
      })
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})

// service worker
if (location.protocol === 'https:' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/vue-contests/service-worker.js')
}
