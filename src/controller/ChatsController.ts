import ApiChat from '../services/chat.ts';
import store from '../core/Store';
import { isArray } from '../core/Utils';

class ChatsController {
  private api: ApiChat;

  private socket: WebSocket | null;

  constructor() {
    this.api = new ApiChat();
    this.socket = null;
  }

  public createChat(body: Record<string, any>) {
    this.api.create(body).then((data: Record<string, any>) => {
      if (data.status === 200) {
        this.getChats();
      }
    }).catch((error) => {
      console.log(`Failed auth${error}`);
    });
  }

  getToken(id: string) {
    return this.api.getToken(id).then((data: Record<string, any>) => {
      if (data.status === 200) {
        return JSON.parse(data.response).token;
      }
      return {};
    }).catch((error) => {
      console.log(`Token get failed ${error}`);
    });
  }

  getMessages(socket: WebSocket) {
    socket.send(JSON.stringify({
      content: '0',
      type: 'get old',
    }));
  }

  appendMessages(message: Record<string, any>[]) {
    this.socket?.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }

  toChat(activeChatId: string, token: string) {
    const { user } = store.getState();

    const messages: Record<string, any>[] = [];

    const socket = this.api.getChat(user?.id, activeChatId, token);

    socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      this.getMessages(socket);
      this.getUsers(activeChatId);
    });

    socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        /* eslint no-console: 0 */
        console.log('Соединение закрыто чисто');
      } else {
        /* eslint no-console: 0 */
        console.log('Обрыв соединения');
      }
      /* eslint no-console: 0 */
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', (event) => {
      /* eslint no-console: 0 */
      console.log('Получены данные', event.data);

      const data = JSON.parse(event.data);

      if (isArray(data)) {
        const sort = (a:Record<string, any>, b: Record<string, any>) => (b.time - a.time ? 1 : -1);
        const sortedMessages = data.sort(sort);
        messages.push(...sortedMessages);
        store.set('messages', [...messages]);
      } else {
        messages.push(data);
        store.set('messages', [...messages]);
      }
    });

    socket.addEventListener('error', (event: Record<string, any>) => {
      /* eslint no-console: 0 */
      console.log('Ошибка', event.message);
    });

    this.socket = socket;
  }

  appendUser(users: [string], chatId: string) {
    this.api.appendUser(users, chatId).then((data: Record<string, any>) => {
      if (data.status === 200) {
        this.getUsers(chatId);
      }
    }).catch((error) => {
      console.log(`Failed append user to chat ${error}`);
    });
  }

  removeUser(users: [string], chatId: string) {
    this.api.removeUser(users, chatId).then((data: Record<string, any>) => {
      if (data.status === 200) {
        // store.set('chats', JSON.parse(data.response));
        this.getUsers(chatId);
      }
    }).catch((error) => {
      console.log(`Failed remove user from chat ${error}`);
    });
  }

  public getChats() {
    this.api.chats().then((data: Record<string, any>) => {
      if (data.status === 200) {
        store.set('chats', JSON.parse(data.response));
      }
      return true;
    }).catch((error) => {
      console.log(`Failed get chats from user ${error}`);
    });
  }

  public getUsers(id: string) {
    this.api.getUsers(id).then((data: Record<string, any>) => {
      if (data.status === 200) {
        store.set('chatUsers', JSON.parse(data.response));
      }
      return true;
    }).catch((error) => {
      console.log(`Failed get users for chat ${error}`);
    });
  }
}

export default new ChatsController();
