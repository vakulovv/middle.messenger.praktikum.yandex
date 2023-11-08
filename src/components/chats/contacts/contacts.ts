import Component from '../../../core/Component';
import template from './contacts.hbs?raw';
import { ContactsItem } from './contactsItem/index';
import connect from '../../../core/Connect';
import { formatTime } from '../../../core/Utils';
import ChatsController from '../../../controller/ChatsController';
import { Indexed } from '../../../types/types';

class Contacts extends Component {
  constructor(props: Record<string, string | number>) {
    super({
      componentName: 'Contacts',
      ...props,
    }, {
      ContactsItem,
    });
  }

  init(): boolean {
    ChatsController.getChats();
    return true;
  }

  componentDidUpdate(): boolean {
    return true;
  }

  render() {
    return template;
  }
}

const formatChats = function formatChats(chats: any[], chatId: string | null) {
  return chats.map((chat: Record<string, any>) => ({
    ...chat,
    active: chat.id === chatId,
    created_by: formatTime(chat.created_by),
  }));
};

const mapChatToProps = (state: Indexed) => {
  const chats = formatChats(state.chats, state.activeChatId);
  return {
    contacts: chats,
  };
};

export default connect(mapChatToProps)(Contacts);
