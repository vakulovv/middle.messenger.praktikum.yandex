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

  render() {
    return `
            <div class="row row_gap row_nowrap">
                <div class="avatar avatar_small">
                    <img src="/public/vite.svg" alt="">
                </div> 
                <div class="row_center">
                    <h4 class="chats__title">{{ user }}</h4>
                    <div class="text-light text-small"> {{message}} </div>
                </div>
                <div>
                    <time class="text-light text-small">{{time}}</time>
                    {{#if unread}}
                        <div class="chats__badge circle text-small">{{unread}}</div>
                    {{/if}}
                </div>
            </div>
        `;
  }
}
