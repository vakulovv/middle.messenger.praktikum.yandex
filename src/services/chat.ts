import HTTPTransport from "../core/Fetch";
import {API_URL, SOCKET_URL} from './constant';

export default class ApiChat {
    constructor() {
        this.baseUrl = API_URL;
        this.socketUrl = API_URL;
        this.fetch = new HTTPTransport;
        this.headers = {
            'Content-Type': 'application/json',
        };
        this.token = null;
    }

    getToken(id) {
        return this.fetch.post(this.baseUrl + '/api/v2/chats/token/' + id, { headers: this.headers, withCredentials: true  });
    }

    getUsers(id) {
        return this.fetch.get(this.baseUrl + '/api/v2/chats/' + id + '/users', { headers: this.headers, withCredentials: true  });
    }

    chats() {
        return this.fetch.get(this.baseUrl + '/api/v2/chats', { headers: this.headers, withCredentials: true  });
    }

    create(data) {
        return this.fetch.post(this.baseUrl + '/api/v2/chats', { headers: this.headers, data, withCredentials: true });
    }

    getChat(userId, chatId, token) {
        return new WebSocket(SOCKET_URL + `${userId}/${chatId}/${token}`);
    }

    appendUser(users, chatId) {
        return this.fetch.put(this.baseUrl + '/api/v2/chats/users', { headers: this.headers, data: {users, chatId}, withCredentials: true })
    }

    removeUser(users, chatId) {
        return this.fetch.delete(this.baseUrl + '/api/v2/chats/users', { headers: this.headers, data: {users, chatId}, withCredentials: true })
    }


}