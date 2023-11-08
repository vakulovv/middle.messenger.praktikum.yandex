import Component from '../../../core/Component';
import template from './contacts.hbs?raw';
import { ContactsItem } from './contactsItem/index';
import connect from "../../../core/Connect";
import {formatTime, isEqual} from "../../../core/Utils";
import ChatsController from "../../../controller/ChatsController";

class Contacts extends Component {
  constructor(props: Record<string, string | number>) {
    super({
      componentName: 'Contacts',
      ...props,
    }, {
      ContactsItem
    });

    console.log("this.props12",  this.props.setActive )
    console.log("ChatsController.getChats_0");
  }

  init(): boolean {
    console.log("click_01_init",  )
    ChatsController.getChats()
  }

  componentDidMount(): boolean {

  }

  componentDidUpdate(): boolean {
    console.log("ChatsController.getChats");
    console.log("click_01_update",  )
    return true
  }


  render() {
    return template;
  }
}

const formatChats = (chats, chatId) => {
  return chats.map(chat => ({...chat, active: chat.id === chatId, created_by: formatTime(chat.created_by)}))
}

const mapChatToProps = (state) => {
  const chats = formatChats(state.chats, state.activeChatId)
  return {
    "contacts": chats,
    // activeChatId: state.activeChatId,
  }
}

export default connect(mapChatToProps)(Contacts);