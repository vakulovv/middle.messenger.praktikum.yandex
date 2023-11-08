import Component from '../../../../core/Component';

interface IPropsContact {
  user: string,
  message: string,
  time: string,
  unread: string,
}

export default class ContactsItem extends Component {
  constructor(props:IPropsContact) {
    super({ name: 'ContactsItem', ...props });
  }

  init() {
    const {props} = this;
    console.log("props12", JSON.stringify(props))
    this.events = {
      click: (e) => {
        props.onClick(props.id)
      },
    };
    return true;
  }


  render() {
    return `
            <div class="row row_gap row_nowrap mb-1">
                <div class="avatar avatar_small">
                    <img src="/public/vite.svg" alt="">
                </div> 
                <div class="row_center">
                    <h4 class="chats__title">{{ title }}</h4>
                    <div class="text-light text-small"> {{last_message.user.first_name}} </div>
                </div>
                <div>
                    <time class="text-light text-small">{{created_by}}</time>
                    {{#if unread}}
                        <div class="chats__badge circle text-small">{{unread}}</div>
                    {{/if}}
                </div>
            </div>
        `;
  }
}
