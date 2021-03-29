import Vue from 'vue'
import Router from 'vue-router'




const ContestsContestEntriesEntryComplete = () => import('../components/contests/ContestsContestEntriesEntryComplete.vue');
const ContestsContestEntriesEntry = () => import('../components/contests/ContestsContestEntriesEntry.vue');
const ContestsContestEntriesCreate = () => import('../components/contests/ContestsContestEntriesCreate.vue');
const ContestsContestEntries = () => import('../components/contests/ContestsContestEntries.vue');
const ContestsContestPage = () => import('../components/contests/ContestsContestPage.vue');
const Contests = () => import('../components/contests/Contests.vue');

const SuperContestsContestEntries = () => import('../components/super/SuperContestsContestEntries.vue');
const SuperEntriesEntryUpdate = () => import('../components/super/SuperEntriesEntryUpdate.vue');
const SuperContests = () => import('../components/super/SuperContests.vue');
const SuperContestsCreate = () => import('../components/super/SuperContestsCreate.vue');
const SuperContestsContest = () => import('../components/super/SuperContestsContest.vue');
const SuperContestsContestUpdate = () => import('../components/super/SuperContestsContestUpdate.vue');
const SuperContestsContestPages = () => import('../components/super/SuperContestsContestPages.vue');
const SuperContestsContestPagesPageUpdate = () => import('../components/super/SuperContestsContestPagesPageUpdate.vue');
const SuperContestsContestPagesCreate = () => import('../components/super/SuperContestsContestPagesCreate.vue');
const SuperContestsCreateType = () => import('../components/super/SuperContestsCreateType.vue');
const SubscriptionsTable = () => import('../components/super/SubscriptionsTable.vue');
const Super = () => import('../components/super/Super.vue');
const createImageWithZip = () => import('../components/super/CreateImageZip.vue');
const ScavengerHunt = () => import('../components/contests/ScavengerHunt.vue');
const ScavengerHuntMain = () => import('../components/contests/ScavengerHuntMain.vue');
const ScavengerHuntAbout = () => import('../components/contests/ScavengerHuntAbout.vue');
const ScavengerHuntLocationPrizes = () => import('../components/contests/ScavengerHuntLocationPrizes.vue');


const ResetPassword = () => import('../components/user/ResetPassword.vue');

const Home = () => import('../components/Home.vue');

Vue.use(Router)


const routes = [
  // { path: '/directory/:section', component: DirectoryView },

  {path: '/contests/:contest_id/locations-prizes',component:ScavengerHuntLocationPrizes},
  { path: '/contests/:id/entries/complete', component: ContestsContestEntriesEntryComplete },

  { path: '/contests/:id/entries/create', component: ContestsContestEntriesCreate },
 
  { path: '/contests/:contest_id/entries/:id', component: ContestsContestEntriesEntry },
  { path: '/contests/:contest/:id/entries', component: ContestsContestEntries },
  { path: '/contests/:id/entries', component: ContestsContestEntries },

  { path: '/contests/:id/finalists', component: ContestsContestEntries },
 
  { path: '/contests/:id/rules', component: ContestsContestPage },
  { path: '/contests/:contest_id/about', component: ContestsContestPage },
  { path: '/contests/:contest_id/help', component: ContestsContestPage },
  { path: '/contests/:contest_id/prizes', component: ContestsContestPage },
  { path: '/contests/:contest_id/purchase-complete', component: ContestsContestPage },
  { path: '/contests/createimagewithzip', component: createImageWithZip},
  { path: '/contests', component: Contests },


  { path: '/super/contests/:contest/entries', component: SuperContestsContestEntries },
 
  { path: '/super/entries/:id', component: SuperEntriesEntryUpdate },
  { path: '/super/contests', component: SuperContests },
  { path: '/super/contests/create/:type', component: SuperContestsCreate },
  { path: '/super/contests/:contest', component: SuperContestsContest },
  { path: '/super/contests/:contest/subscriptions-table', component: SubscriptionsTable },
  { path: '/super/contests/:contest/subscriptions-table/:product', component: SubscriptionsTable },
  { path: '/super/contests/:contest/purchases-table/:product', component: SubscriptionsTable },
  { path: '/super/contests/create/:contest', component: SuperContestsCreateType },
  { path: '/super/contests/:contest/update', component: SuperContestsContestUpdate },
  { path: '/super/contests/:contest/pages/create', component: SuperContestsContestPagesCreate },
  { path: '/super/contests/:contest/pages/:id/update', component: SuperContestsContestPagesPageUpdate },
  { path: '/super/contests/:contest/pages', component: SuperContestsContestPages },

  
  { path: '/super', component: Super },
  
  {path: '/contests/scavenger-hunt/locations', component: ScavengerHunt},
  {path: '/contests/scavenger-hunt', component: ScavengerHuntAbout},
  { path: '/user/reset_password/:token', component: ResetPassword },

  { path: '/', component: Home },

] 




// routes.forEach((item) => {
//   const { meta } = item
//   let { path } = item
//   let baseDir = '/vue-contests'

//   if (meta && meta.project) {
//     baseDir = `/${meta.project}`
//   }

//   if (path === '/home') {
//     path = `${baseDir}/`
//   } else if (path === '/' && item.redirect) {
//     item.redirect = `${baseDir + item.redirect}/`
//   } else {
//     path = `${baseDir + path}`
//   }

//   item.path = path
// })




export default function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    routes,
    scrollBehavior(to, from, savedPosition) {
      console.log('scrollBehavior', to, from, savedPosition);
      if (savedPosition !== null) {
        console.log('scrollBehavior returning')
        return savedPosition;
      }
      // Only scroll to the top of the page if we are
      // changing pages (not just query params)
      if (to.path !== from.path) {
        return { x: 0, y: 0 }
      }
      // if (savedPosition) {
      //   return savedPosition
      // } else {
      //   console.log('no saved position')
        
      // }
    },
    
  })
}
