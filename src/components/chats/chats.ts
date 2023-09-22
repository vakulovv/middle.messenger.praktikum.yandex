import Component from '../../core/Component';
import template from './chats.hbs?raw';
import { Contacts } from './contacts/index';
import { Chat } from './chat/index';
import { dataContacts } from './contacts/mocks';

const active = dataContacts.find((i) => i.user === 'Mario');
export default class Chats extends Component {
  constructor() {
    super({ componentName: 'Chats', user: active?.user, messages: active?.dialog }, { Contacts, Chat });
  }

  render() {
    return template;
  }
}
