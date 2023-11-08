import HTTPTransport from '../core/Fetch';
import { API_URL, SOCKET_URL } from './constant';

export default class ApiChat {
  private baseUrl: string;

  private fetch: HTTPTransport;

  private headers: Record<string, any>;

  constructor() {
    this.baseUrl = API_URL;
    this.fetch = new HTTPTransport();
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  getToken(id: string) {
    return this.fetch.post(`${this.baseUrl}/api/v2/chats/token/${id}`, { headers: this.headers, withCredentials: true });
  }

  getUsers(id: string) {
    return this.fetch.get(`${this.baseUrl}/api/v2/chats/${id}/users`, { headers: this.headers, withCredentials: true });
  }

  chats() {
    return this.fetch.get(`${this.baseUrl}/api/v2/chats`, { headers: this.headers, withCredentials: true });
  }

  create(data: Record<string, any>) {
    return this.fetch.post(`${this.baseUrl}/api/v2/chats`, { headers: this.headers, data, withCredentials: true });
  }

  getChat(userId: string, chatId: string, token: string) {
    return new WebSocket(`${SOCKET_URL}${userId}/${chatId}/${token}`);
  }

  appendUser(users: [string], chatId: string) {
    return this.fetch.put(`${this.baseUrl}/api/v2/chats/users`, { headers: this.headers, data: { users, chatId }, withCredentials: true });
  }

  removeUser(users: [string], chatId: string) {
    return this.fetch.delete(`${this.baseUrl}/api/v2/chats/users`, { headers: this.headers, data: { users, chatId }, withCredentials: true });
  }
}
