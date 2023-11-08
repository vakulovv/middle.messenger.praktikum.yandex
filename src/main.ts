import Handlebars from 'handlebars';
import './style/index.scss';
import './templates/pages/login/login.ts';
import * as Components from './components/index.ts';
import ProfileEditPage from './templates/pages/profileEdit/index.ts';
import SignupPage from './templates/pages/signup/index.ts';
import LoginPage from './templates/pages/login/index.ts';
import ChatsPage from './templates/pages/chats/index.ts';
import ErrorPage from './templates/pages/error/index.ts';
import layoutProfile from './templates/layout/layoutProfile.hbs?raw';

import { register } from './core/Template.ts';
import ProfileEditPasswordPage from './templates/pages/profileEditPassword/index.ts';
import ProfilePage from './templates/pages/profile/index.ts';

import Router from './core/Router.ts';
import store, { StoreEvents } from './core/Store.ts';
import UserController from './controller/UserController';

Handlebars.registerPartial('layoutProfile', layoutProfile);

Object.entries(Components).forEach((component) => register(component));

const userController = new UserController();

const root = document.querySelector('#root');

const router = new Router(root);

const auth = window.localStorage.getItem('auth');

store.on(StoreEvents.Updated, (prop) => {
  const state: Record<string, any> = store.getState();
  const location = window.location.pathname.slice(1);

  if (prop === 'auth') {
    if (Router.instance) {
      router.routes = [];
    }

    if (state.auth) {
      router.redirect('', 'messenger');
      router.use('settings', ProfileEditPage);
      router.use('password', ProfileEditPasswordPage);
      router.use('profile', ProfilePage);
      router.use('messenger', ChatsPage);

      userController.getUser();
      return;
    }
    router.redirect('', 'login');
    router.use('login', LoginPage);
    router.use('sign-up', SignupPage);

    router.error('404', ErrorPage);
  }

  if (router._currentRoute && !router.getRoute(location)) {
    router.go('');
  }
  if (!router._currentRoute) {
    router.start();
  }
});

store.set('auth', auth && JSON.parse(auth));
