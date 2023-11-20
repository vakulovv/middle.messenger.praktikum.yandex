import Component from '../../../core/Component';
import ChatsController from '../../../controller/ChatsController';
import UserController from '../../../controller/UserController';
import { debounce } from '../../../core/Utils';

const userController = new UserController();

class AppendUserModal extends Component {
  protected initial = {
    message: '',
    error: {},

  };

  constructor(props: Record<string, any>) {
    super({
      componentName: 'appendUserModal',
      onInput: debounce((e: Event) => {
        const target = e.target as HTMLInputElement;
        this.findUser(target);
      }),
      ...props,
    });

    this.setProps(this.initial);
  }

  init(): boolean {
    this.events = {
      submit: this.onSubmit.bind(this),
      click: (e) => e.stopPropagation(),
    };

    return true;
  }

  findUser(target: HTMLInputElement) {
    userController.search(target.value);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const formObject = Object.fromEntries(formData.entries());
    ChatsController.createChat(formObject);
  }

  componentDidUpdate(): boolean {
    const { state } = this.props;
    /* eslint no-console: 0 */
    console.log('state', JSON.stringify(state));

    return true;
  }

  render() {
    const { props } = this;
    const { error } = props.state;

    return (`
                <div class="modal-content">
                    <h2>Введите имя пользователя</h2> 
                    <form action="#" name="comment" class="row row_nowrap row_gap-sm" style="width: 100%">
                        <div class="textarea corner">
                        {{{ Field 
                            name="title" 
                            label="Имя"
                            class=""
                            value=""
                            error="${error?.message || ''}"
                            onInput=onInput
                            }}}
                        </div>
                    </form>
                   {{{ AppendUserModalList activeChatId=activeChatId }}} 
                </div>
                    `);
  }
}

export default AppendUserModal;
