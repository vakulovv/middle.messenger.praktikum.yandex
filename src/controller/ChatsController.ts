import ApiChat from "../services/chat.ts";
import store from "../core/Store";
import {isArray} from "../core/Utils";


class ChatsController {
    private api: ApiChat;
    private socket: WebSocket;
    constructor() {
        this.api = new ApiChat();
        this.socket = null;
    }

    public createChat(body) {
        this.api.create(body).then(data => {
            if (data.status === 200) {
                this.getChats();
            }
        }).catch((error)=> {
            throw new Error('Failed auth' + error)
        });
    }


    getToken(id) {
        return this.api.getToken(id).then(data => {
            if (data.status === 200) {
                // store.set('chats', JSON.parse(data.response));
                return JSON.parse(data.response).token;
            }
        }).catch((error)=> {
            throw new Error('Failed auth' + error)
        });
    }

    getMessages(socket) {
        socket.send(JSON.stringify({
            content: '0',
            type: 'get old',
        }));
    }

    appendMessages(message) {
        console.log("this.socket", this.socket)
        this.socket.send(JSON.stringify({
            content: message,
            type: 'message',
        }));
    }

    toChat(activeChatId, token) {
        const {user } = store.getState();

        let messages = [];

        const socket = this.api.getChat(user.id, activeChatId, token);

        socket.addEventListener('open', () => {
            console.log('Соединение установлено');

            this.getMessages(socket);
            this.getUsers(activeChatId);
        });

        socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('message', event => {
            console.log('Получены данные', event.data);

            const data = JSON.parse(event.data);
            // store.set('messages', messages);

            if(isArray(data)) {
                messages.push(...data.sort((a,b) => b.time - a.time ? 1 : -1));
                store.set('messages', [...messages]);
            } else {
                messages.push(data);
                store.set('messages', [...messages]);

            }
        });

        socket.addEventListener('error', event => {
            console.log('Ошибка', event.message);
        });

        this.socket = socket;

    }

    appendUser(users, chatId) {
        this.api.appendUser(users, chatId).then(data => {
            if (data.status === 200) {
                // store.set('chats', JSON.parse(data.response));
             this.getUsers(chatId)


            }
        }).catch((error)=> {
            throw new Error('Failed auth' + error)
        });
    }

    removeUser(users, chatId) {
        this.api.removeUser(users, chatId).then(data => {
            if (data.status === 200) {
                // store.set('chats', JSON.parse(data.response));
                this.getUsers(chatId)


            }
        }).catch((error)=> {
            throw new Error('Failed auth' + error)
        });
    }

    public getChats() {
        this.api.chats().then(data => {
            if (data.status === 200) {
                store.set('chats', JSON.parse(data.response));
            }
            return true;
        }).catch((error)=> {
            throw new Error('Failed auth' + error)
        });
    }

    public getUsers(id) {
        this.api.getUsers(id).then(data => {
            if (data.status === 200) {
                store.set('chatUsers', JSON.parse(data.response));
            }
            return true;
        }).catch((error)=> {
            throw new Error('Failed auth' + error)
        });
    }

}

export default new ChatsController;
