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

Handlebars.registerPartial('layoutProfile', layoutProfile);

Object.entries(Components).forEach((component) => register(component));

const Login = new LoginPage();
const Signup = new SignupPage();
const Profile = new ProfilePage();
const ProfileEdit = new ProfileEditPage();
const Chats = new ChatsPage();
const Error404 = new ErrorPage({ code: 404, text: 'Не туда попали' });
const Error500 = new ErrorPage({ code: 500, text: 'Мы уже фиксим' });
const ProfileEditPassword = new ProfileEditPasswordPage();

const urlParams = new URLSearchParams(window.location.search);
const page: string | null = urlParams.get('page');

const pages: Record<string, Component> = {
  login: Login,
  signup: Signup,
  chats: Chats,
  profile: Profile,
  profileEdit: ProfileEdit,
  404: Error404,
  500: Error500,
  profileEditPassword: ProfileEditPassword,
};
const root = document.querySelector('#root');
if (root) {
  if (page) {
    const node = pages[page].getNode();
    root.append(node);
  } else {
    root.innerHTML = indexPage;
  }
}
