import Component from '../../../core/Component';
import UserController from '../../../controller/UserController';

const userController = new UserController();

export default class ChangeAvatarModal extends Component {
  protected initial = {
    message: '',
    error: {},
  };

  constructor(props: Record<string, any>) {
    super({
      componentName: 'ChangeAvatarModal',
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
    const { props: { toggle } } = this;
    const formData = new FormData(target);
    userController.avatar(formData);
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
                <h2>Выберите изображение</h2>
                <form action="#"  class="row row_nowrap row_gap-sm" style="width: 100%">
                    <div class="textarea corner">
                    {{{ Field 
                        name="avatar" 
                        label="Сообщение"
                        class=""
                        value=state.message
                        error="${error?.message || ''}"
                         
                        type="file"
                        }}}
                    </div>
                    <button class="btn" type="submit" name="button">
                        Загрузить
                   </button>
                </form>
                </div>
                    `);
  }
}
