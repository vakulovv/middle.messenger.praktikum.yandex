import HTTPTransport from "../core/Fetch";
import {API_URL} from './constant';

export default class ApiUser {
    constructor() {
       this.baseUrl = API_URL;
       this.fetch = new HTTPTransport;
       this.headers = {
           'Content-Type': 'application/json',
       };
    }

    login(data) {
       return this.fetch.post(this.baseUrl + '/api/v2/auth/signin', { headers: this.headers, data, withCredentials: true  });
    }

    user() {
        return this.fetch.get(this.baseUrl + '/api/v2/auth/user', { headers: this.headers, withCredentials: true });
    }

    signup(data) {
        return this.fetch.post(this.baseUrl + '/api/v2/auth/signup', { headers: this.headers, data });
    }

    logout() {
        return this.fetch.post(this.baseUrl + '/api/v2/auth/logout', { headers: this.headers, withCredentials: true });
    }

    find(login) {
        return this.fetch.post(this.baseUrl + '/api/v2/user/search', {headers: this.headers, data: {login}, withCredentials: true});
    }

    avatar(data) {
        return this.fetch.put(this.baseUrl + '/api/v2/user/profile/avatar', { headers: {}, data, withCredentials: true});
    }

    profile(data) {
        return this.fetch.put(this.baseUrl + '/api/v2/user/profile', { headers: this.headers, data, withCredentials: true});
    }

    password(data) {
        return this.fetch.put(this.baseUrl + '/api/v2/user/password', { headers: this.headers, data, withCredentials: true});
    }



}
