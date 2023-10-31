import Component from '../../core/Component';
import template from './chats.hbs?raw';
import { Contacts } from './contacts/index';
import { Chat } from './chat/index';
import { dataContacts } from './contacts/mocks';

const active = dataContacts.find((i) => i.user === 'Mario');
export default class Chats extends Component {
  constructor() {
    super({ componentName: 'Chats',
      user: active?.user,
      void: "test",
      messages: active?.dialog,
      onProfile: () => {
        this.onProfile.apply(this);
      },
    }, { Contacts, Chat });
  }

  onProfile() {
    // console.log("this.router 1", this.router)
    this.router.go("profile");
  }

  render() {
    return template;
  }
}
