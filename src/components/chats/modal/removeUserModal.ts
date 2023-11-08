import Component from '../../../core/Component';
import ChatsController from '../../../controller/ChatsController';
import connect from '../../../core/Connect';
import { Indexed, User } from '../../../types/types';

class RemoveUserModal extends Component {
  protected initial = {
    message: '',
    error: {},

  };

  constructor(props: Record<string, any>) {
    super({
      componentName: 'RemoveUserModal',
      removeUser: (e: Event) => {
        const target = e.target as HTMLElement;
        const { activeChatId } = props.state;
        const userId: string = target.dataset.id || '';
        ChatsController.removeUser([userId], activeChatId);
      },
      ...props,
    });

    this.setProps(this.initial);
  }

  init(): boolean {
    this.events = {

      click: (e) => e.stopPropagation(),
    };
    return true;
  }

  render() {
    const { props } = this;
    const { chatUsers = [] } = props.state;

    return (`
                <div class="modal-content">
                    <h2>Удалить пользователя из чата</h2> 
                      <ul class="flat-list">
                        ${chatUsers.length ? chatUsers.map((user: User) => `
                        <li class="">
                         {{{ Button class="btn btn_full btn_plain" label="${user.login}" onClick=removeUser data-id="${user.id}" }}}
                        </li>`).join('') : ''}
                    </ul>
                </div>
                    `);
  }
}

const mapUserToProps = (state: Indexed) => ({
  activeChatId: state.activeChatId,
  chatUsers: state.chatUsers,
});

export default connect(mapUserToProps)(RemoveUserModal);
