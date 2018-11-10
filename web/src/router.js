import Vue from 'vue';
import Router from 'vue-router';

import GroupPage from './components/GroupPage';
import CasePage from './components/CasePage';
import HomePage from './components/HomePage';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      components: {default: HomePage}
    },
    {
      path: '/group/:id',
      name: 'group',
      components: {default: GroupPage}
    },
    {
      path: '/case/:id',
      name: 'case',
      components: {default: CasePage}
    }
  ]
});
