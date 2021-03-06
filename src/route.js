import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('./views/Home.vue');

// Daily activity views for desktop
const ActivityDaily = () => import('./views/activity/daily/ActivityDaily.vue');
const ActivityDailySummary = () => import('./views/activity/daily/ActivityDailySummary.vue');
const ActivityDailyWindow = () => import('./views/activity/daily/ActivityDailyWindow.vue');
const ActivityDailyBrowser = () => import('./views/activity/daily/ActivityDailyBrowser.vue');
const ActivityDailyEditor = () => import('./views/activity/daily/ActivityDailyEditor.vue');

const ActivityAndroid = () => import('./views/activity/ActivityAndroid.vue');
const Buckets = () => import('./views/Buckets.vue');
const Bucket = () => import('./views/Bucket.vue');
const QueryExplorer = () => import('./views/QueryExplorer.vue');
const Timeline = () => import('./views/Timeline.vue');
const Log = () => import('./views/Log.vue');
const Settings = () => import('./views/Settings.vue');
const Stopwatch = () => import('./views/Stopwatch.vue');
const Dev = () => import('./views/Dev.vue');

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    // Must be before general activity view such that it matches first
    { path: '/activity/android/:host/:date?', component: ActivityAndroid, props: true },
    {
      path: '/activity/:host/:periodLength?/:date?',
      component: ActivityDaily,
      props: true,
      children: [
        {
          path: 'window',
          name: 'activity-daily-window',
          component: ActivityDailyWindow,
          props: true,
        },
        {
          path: 'browser',
          name: 'activity-daily-browser',
          component: ActivityDailyBrowser,
        },
        {
          path: 'editor',
          name: 'activity-daily-editor',
          component: ActivityDailyEditor,
        },
        // Default view is the summary view (needs to be last since otherwise it'll always match first)
        {
          path: '',
          name: 'activity-daily-summary',
          component: ActivityDailySummary,
          props: true,
        },
      ],
    },
    { path: '/buckets', component: Buckets },
    { path: '/buckets/:id', component: Bucket, props: true },
    { path: '/timeline', component: Timeline },
    { path: '/query', component: QueryExplorer },
    { path: '/log', component: Log },
    { path: '/settings', component: Settings },
    { path: '/stopwatch', component: Stopwatch },
    { path: '/dev', component: Dev },
  ],
});

export default router;
