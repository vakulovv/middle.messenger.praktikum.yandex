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
       return this.fetch.post(this.baseUrl + '/api/v2/auth/signin', { headers: this.headers, data });
    }

    user() {
        return this.fetch.get(this.baseUrl + '/api/v2/auth/user', { headers: this.headers });
    }

    signup(data) {
        return this.fetch.post(this.baseUrl + '/api/v2/auth/signup', { headers: this.headers, data });
    }
}
