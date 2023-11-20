import Component from '../../../core/Component';
import ChatsController from '../../../controller/ChatsController';

export default class AppendChatModal extends Component {
  protected initial = {
    message: '',
    error: {},
  };

  constructor(props: Record<string, any>) {
    super({
      componentName: 'addChatModal',
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

  onSubmit(event: Record<string, any>) {
    event.preventDefault();
    const { target } = event;
    const { toggle } = this.props;
    const formData = new FormData(target);
    const formObject = Object.fromEntries(formData.entries());
    ChatsController.createChat(formObject);
    toggle();
  }

  componentDidUpdate(): boolean {
    const { state } = this.props;
    /* eslint no-console: 0 */
    console.log(state);
    return true;
  }

  render() {
    const { props } = this;
    const { error } = props.state;

    return (`
                <div class="modal-content">
                <h2>Введите название чата</h2>
                <form action="#" name="comment" class="row row_nowrap row_gap-sm" style="width: 100%">
                    <div class="textarea corner">
                    {{{ Field 
                        name="title" 
                        label="Сообщение"
                        class=""
                        value=state.message
                        error="${error?.message || ''}"
                        onBlur=onBlur
                        }}}
                    </div>
                    <button class="btn" type="submit" name="button">
                        Создать
                   </button>
                </form>
                </div>
                    `);
  }
}
