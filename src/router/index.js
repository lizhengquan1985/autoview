import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '../views/layout/Layout';

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true,
  },
  {
    path: '/authredirect',
    component: _import('login/authredirect'),
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: _import('dashboard/index'),
        name: 'dashboard',
        meta: {title: 'dashboard', icon: 'dashboard', noCache: true},
      }],
  },
];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap,
});

export const asyncRouterMap = [
  {
    path: '/charts',
    component: Layout,
    children: [
      {
        path: 'index',
        component: _import('charts/line'),
        name: 'icons',
        meta: {title: 'icons', icon: 'icon', noCache: true},
      }],
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table/complex-table',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example',
    },
    children: [
      {
        path: 'tab/index',
        icon: 'tab',
        component: _import('example/tab/index'),
        name: 'tab',
        meta: {title: 'tab'},
      },
      {
        path: 'tab/pigMoreToday',
        icon: 'tab',
        component: _import('example/PigMoreToday'),
        name: 'spotRecord',
        meta: {title: 'spotRecord'},
      },
      // {
      //   path: 'tab/dogMoreFinished',
      //   icon: 'tab',
      //   component: _import('example/DogMoreFinished'),
      //   name: 'dogMoreFinished',
      //   meta: {title: 'dogMoreFinished'},
      // },
      {
        path: 'tab/dogControl',
        icon: 'tab',
        component: _import('example/DogControl'),
        name: 'dogControl',
        meta: {title: 'dogControl'},
      },
      {
        path: 'tab/dogMoreFinished',
        icon: 'tab',
        component: _import('example/DogMoreFinished'),
        name: 'dogMoreFinished',
        meta: {title: 'dogMoreFinished'},
      },
      {
        path: 'tab/dogMoreNotFinished',
        icon: 'tab',
        component: _import('example/DogMoreNotFinished'),
        name: 'dogMoreNotFinished',
        meta: {title: 'dogMoreNotFinished'},
      },
      // {
      //   path: 'tab/dogMoreForEmpty',
      //   icon: 'tab',
      //   component: _import('example/DogMoreForEmpty'),
      //   name: 'dogMoreNotFinished',
      //   meta: {title: 'dogMoreForEmpty'},
      // },
      {
        path: 'tab/dogEmptyNotFinished',
        icon: 'tab',
        component: _import('example/DogEmptyNotFinished'),
        name: 'dogEmptyNotFinished',
        meta: {title: 'dogEmptyNotFinished'},
      },
    ],
  },

  {
    path: '/form',
    component: Layout,
    redirect: 'noredirect',
    name: 'form',
    meta: {
      title: 'form',
      icon: 'form',
    },
    children: [
      {
        path: 'create-form',
        component: _import('form/create'),
        name: 'createForm',
        meta: {title: 'createForm', icon: 'table'},
      },
      {
        path: 'edit-form',
        component: _import('form/edit'),
        name: 'editForm',
        meta: {title: 'editForm', icon: 'table'},
      },
    ],
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: {title: 'zip', icon: 'zip'},
    children: [
      {
        path: 'download',
        component: _import('zip/index'),
        name: 'exportZip',
        meta: {title: 'exportZip'},
      }],
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: _import('theme/index'),
        name: 'theme',
        meta: {title: 'theme', icon: 'theme'},
      }],
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: _import('clipboard/index'),
        name: 'clipboardDemo',
        meta: {title: 'clipboardDemo', icon: 'clipboard'},
      }],
  },

  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: _import('i18n-demo/index'),
        name: 'i18n',
        meta: {title: 'i18n', icon: 'international'},
      }],
  },

  {path: '*', redirect: '/404', hidden: true},
];
