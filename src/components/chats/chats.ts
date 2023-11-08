import Component from '../../core/Component';
import template from './chats.hbs?raw';
import { Contacts } from './contacts/index';
import { Chat } from './chat/index';
import { dataContacts } from './contacts/mocks';
import ChatsController from "../../controller/ChatsController";
import {Modal} from "../modal";
import store from "../../core/Store.ts"
import connect from "../../core/Connect";

const active = dataContacts.find((i) => i.user === 'Mario');

class Chats extends Component {
  private createChatModal: boolean;

  private activeChatId: number | null;

  protected initial = {
    createChatModal: false,
    appendUserModal: false,
    removeUserModal: false,
    chatsMenu: false,
    activeChatId: null,
    token: null,
  };

  constructor() {
    super({
      componentName: 'Chats',
      user: active?.user,
      void: "test",
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
        console.log("modal_test")
        this.toggleRemoveUserModal.apply(this);
      },
      toggleChatsMenu: () => {
        this.toggleChatsMenu.apply(this);
      },
      setActive: (id) => {
        store.set('activeChatId', id);

        setTimeout(()=> {
          this.setActiveChat(id);
        }, 0)
      }

    }, { Contacts, Chat });

    this.activeChatId = null;

    this.setProps(this.initial);

    console.log("state.getStateconstructor", store.getState())

  }

  async setActiveChat(id) {
      const token = await ChatsController.getToken(id);
      ChatsController.toChat(id, token);
  }


  componentDidUpdate(): boolean {
    console.log("messages_177")
    return true;
  }

  toggleRemoveUserModal(e) {
    console.log("check_0", "toggleRemoveUserModal")
    this.setProps({"removeUserModal": !this.props.state.removeUserModal, chatsMenu: false})
  }

  toggleAppendUserModal(e) {
    this.setProps({"appendUserModal": !this.props.state.appendUserModal, chatsMenu: false})
  }

  toggleCreateChatModal() {
    this.setProps({"createChatModal": !this.props.state.createChatModal, chatsMenu: false})
  }

  toggleChatsMenu() {
    this.setProps({"chatsMenu": !this.props.state.chatsMenu})
  }

  onProfile() {
    // console.log("this.router 1", this.router)
    this.router.go("profile");
  }

  render() {

    return template;
  }
}



export default Chats