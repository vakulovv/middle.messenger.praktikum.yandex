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
import indexPage from './templates/pages/index.hbs?raw';
import { register } from './core/Template.ts';
import ProfileEditPasswordPage from './templates/pages/profileEditPassword/index.ts';
import ProfilePage from './templates/pages/profile/index.ts';
import Component from './core/Component.ts';
import Router from './core/Router.ts';
import store, {StoreEvents} from './core/Store.ts';
import UserController from "./controller/UserController";

Handlebars.registerPartial('layoutProfile', layoutProfile);

Object.entries(Components).forEach((component) => register(component));

// const Login = new LoginPage();

// const urlParams = new URLSearchParams(window.location.search);
// const page: string | null = urlParams.get('page');

const userController  = new UserController();


const root = document.querySelector('#root');

const router = new Router(root);

const state = store.getState();

store.on(StoreEvents.Updated, () => {
    const state = store.getState();
    console.log("state updated", state);

    if (!state.user) {
        router.use('login', LoginPage);
        router.use('sign-up', SignupPage);

    } else {
        router.use('settings', ProfilePage);
        router.use('profile', ProfilePage);
        router.use('messenger', ChatsPage);

        router.go('messenger');
    }

    router.error('404', ErrorPage);
    router.start();
});

const auth = window.localStorage.getItem('auth');

if (auth && JSON.parse(auth)) {
    userController.getUser();
} else {
    store.set('user', null);
}


