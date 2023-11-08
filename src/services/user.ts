import HTTPTransport from '../core/Fetch';
import { API_URL } from './constant';

export default class ApiUser {
  private headers: Record<string, any>;

  private fetch: HTTPTransport;

  private baseUrl: string;

  constructor() {
    this.baseUrl = API_URL;
    this.fetch = new HTTPTransport();
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  login(data: Record<string, any>) {
    return this.fetch.post(`${this.baseUrl}/api/v2/auth/signin`, { headers: this.headers, data, withCredentials: true });
  }

  user() {
    return this.fetch.get(`${this.baseUrl}/api/v2/auth/user`, { headers: this.headers, withCredentials: true });
  }

  signup(data: Record<string, any>) {
    return this.fetch.post(`${this.baseUrl}/api/v2/auth/signup`, { headers: this.headers, data });
  }

  logout() {
    return this.fetch.post(`${this.baseUrl}/api/v2/auth/logout`, { headers: this.headers, withCredentials: true });
  }

  find(login: string) {
    return this.fetch.post(`${this.baseUrl}/api/v2/user/search`, { headers: this.headers, data: { login }, withCredentials: true });
  }

  avatar(data: Record<string, any>) {
    return this.fetch.put(`${this.baseUrl}/api/v2/user/profile/avatar`, { headers: {}, data, withCredentials: true });
  }

  profile(data: Record<string, any>) {
    return this.fetch.put(`${this.baseUrl}/api/v2/user/profile`, { headers: this.headers, data, withCredentials: true });
  }

  password(data: Record<string, any>) {
    return this.fetch.put(`${this.baseUrl}/api/v2/user/password`, { headers: this.headers, data, withCredentials: true });
  }
}
