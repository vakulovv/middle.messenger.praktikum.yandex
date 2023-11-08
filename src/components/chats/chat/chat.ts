import Component from '../../../core/Component';
import template from './chat.hbs?raw';
import { FormMessage } from './formMessage/index';
import connect from "../../../core/Connect";
import {isArray, formatTime} from "../../../core/Utils";

interface IPropsChat {
  author: string,
  time: string,
}

const formatMessages = (messages: [], userId) => {
    console.log("messages_90", messages)
  return messages && messages?.map(item => ({
      ...item,
      author: item.user_id === userId,
      time: formatTime(item.time),
    }))
}
class Chat extends Component {
  constructor(props:IPropsChat) {
    super({ componentName: 'Chat', ...props }, { FormMessage });

    console.log("props_8", props)
  }

  componentDidUpdate(): boolean {
      console.log("messages_12",this.props.state.messages)
      return true;
  }

  render() {
    let messages = [];

    const {user = {}} = this.props.state;


    if(isArray(this.props.state.messages)) {
        messages = formatMessages(this.props.state.messages, this.props.state.user.id);
    } else if(this.props.state.messages) {
        messages.push(...formatMessages([this.props.state.messages], this.props.state.user.id))
    }

    return (`

    ${!this.props.state.activeChatId 
        ? `<div class="chat row row_height row_center      ">
            <div ><p>Выберите чат</p></div>
           </div>` 
        : `<div class="chat">
        <div class="chat__header row row_nowrap row_gap  row_between">
            <div class="row  row_gap  row_middle ">
                <img class='avatar avatar_small' src='${user?.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + user.avatar : '/public/vite.svg' }' />
                <h4 class="chats__title">{{ state.user.first_name }}</h4>
            </div>
    
            <div class="menu-wrapper">
   
             {{{Button
                     onClick=toggleChatsMenu
                     class="btn-icon" type="button" name="button"
                     type="button"
                     icon='<span class="arrow-icon arrow-icon_gray">
                              <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="1.5" cy="2" r="1.5" fill="#3369F3"/>
                              <circle cx="1.5" cy="8" r="1.5" fill="#3369F3"/>
                              <circle cx="1.5" cy="14" r="1.5" fill="#3369F3"/>
                              </svg>
                          </span>'
                     }}}
    
                    {{#Menu open=chatsMenu toggle=toggleChatsMenu toggleAppendUserModal=toggleAppendUserModal user=user toggleRemoveUserModal=toggleRemoveUserModal}}
                        <ul class="menu-chat" >
                            <li>{{{Button onClick=toggleAppendUserModal class="btn btn btn_md btn_plain" type="button" name="addUser" label="Добавить пользователя"  }}}</li>
                            <li>{{{Button onClick=toggleRemoveUserModal class="btn btn btn_md btn_plain" type="button" name="removeUser" label="Удалить пользователя" }}} </li>
                        </ul>
                   {{/Menu}}
            </div>
    
        </div>
         
        <div class="dialog chat__dialog">
        
            ${messages?.map(item => (`
              <div class="row mb-2 ${item.author ? `dialog__sent row_end` : `dialog__receive`}">
                    <div class="row">
                            <div class="${item.author ? `message message_sent` : `message message_receive`}">
                                ${item.content}
                                ${item.is_read ? `
                                    <svg width="11" height="5" viewBox="0 0 11 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line y1="-0.5" x2="3.765" y2="-0.5" transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33301)" stroke="#3369F3"/>
                                        <line y1="-0.5" x2="5.6475" y2="-0.5" transform="matrix(0.705933 -0.708278 0.705933 0.708278 3.35828 5)" stroke="#3369F3"/>
                                        <line y1="-0.5" x2="5.6475" y2="-0.5" transform="matrix(0.705933 -0.708278 0.705933 0.708278 6.01587 5)" stroke="#3369F3"/>
                                        </svg>` : ""}
                                <span class="message__time">${item.time}</span>
                            </div>
                    </div>
                </div>
            `)).join(" ")}
     
        </div>
     
        <div class="chat__footer">
            {{{ FormMessage }}}
        </div>
    </div>`}
    `);
  }
}



const mapChatToProps = (state) => {
  return {
    "messages": state.messages,
    "user": state.user,
    "activeChatId": state.activeChatId,
  }
}

export default connect(mapChatToProps)(Chat);
