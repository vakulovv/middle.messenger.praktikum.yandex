import Component from '../../../core/Component';
import ChatsController from '../../../controller/ChatsController';
import connect from '../../../core/Connect';
import { Indexed, User } from '../../../types/types';

class AppendUserModalList extends Component {
  constructor(props: Record<string, any>) {
    super({
      componentName: 'appendUserModalList',
      addUser: (e: Event) => {
        const target = e.target as HTMLElement;
        const { activeChatId } = props.state;
        const userId: string = target.dataset.id || '';

        ChatsController.appendUser([userId], activeChatId);
      },
      ...props,
    });
  }

  init(): boolean {
    return true;
  }

  componentDidUpdate(): boolean {
    const { state } = this.props;
    /* eslint no-console: 0 */
    console.log('state', state);
    console.log('this.props4', JSON.stringify(this.props));
    return true;
  }

  render() {
    const { props } = this;
    const { users = [] } = props.state;

    return (`
                <ul class="flat-list">
                    ${users.length ? users.map((user: User) => `
                        <li class="">
                         {{{ Button class="btn btn_full btn_plain" label="${user.login}" onClick=addUser data-id="${user.id}" }}}
                        </li>`).join('') : ''}
                </ul>
                    `);
  }
}

const mapStateToProps = (state: Indexed) => ({
  users: state.users,
  activeChatId: state.activeChatId,
});

export default connect(mapStateToProps)(AppendUserModalList);
