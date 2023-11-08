import Component from '../../core/Component';
import template from './chats.hbs?raw';
import { Contacts } from './contacts/index';
import { Chat } from './chat/index';
import { dataContacts } from './contacts/mocks';
import ChatsController from '../../controller/ChatsController';
import store from '../../core/Store.ts';

const active = dataContacts.find((i) => i.user === 'Mario');

class Chats extends Component {
  protected initial = {
    createChatModal: false,
    appendUserModal: false,
    removeUserModal: false,
    chatsMenu: false,
    activeChatId: null,
    token: null,
  };

  constructor(props: Record<string, string | number>) {
    super({
      componentName: 'Chats',
      user: active?.user,
      void: 'test',
      onProfile: () => {
        this.onProfile.apply(this);
      },
      toggleCreateChatModal: () => {
        this.toggleCreateChatModal.apply(this);
      },
      toggleAppendUserModal: () => {
        this.toggleAppendUserModal.apply(this);
      },
      toggleRemoveUserModal: () => {
        this.toggleRemoveUserModal.apply(this);
      },
      toggleChatsMenu: () => {
        this.toggleChatsMenu.apply(this);
      },
      setActive: (id: string) => {
        store.set('activeChatId', id);

        setTimeout(() => {
          this.setActiveChat(id);
        }, 0);
      },
      ...props,

    }, { Contacts, Chat });

    this.setProps(this.initial);
  }

  async setActiveChat(id: string) {
    const token = await ChatsController.getToken(id);
    ChatsController.toChat(id, token);
  }

  componentDidUpdate(): boolean {
    return true;
  }

  toggleRemoveUserModal() {
    const { state: { removeUserModal } } = this.props;
    this.setProps({ removeUserModal: !removeUserModal, chatsMenu: false });
  }

  toggleAppendUserModal() {
    const { state: { appendUserModal } } = this.props;
    this.setProps({ appendUserModal: !appendUserModal, chatsMenu: false });
  }

  toggleCreateChatModal() {
    const { state: { createChatModal } } = this.props;
    this.setProps({ createChatModal: !createChatModal, chatsMenu: false });
  }

  toggleChatsMenu() {
    const { state: { chatsMenu } } = this.props;
    this.setProps({ chatsMenu: !chatsMenu });
  }

  onProfile() {
    // console.log("this.router 1", this.router)
    this.router.go('profile');
  }

  render() {
    return template;
  }
}

export default Chats;
