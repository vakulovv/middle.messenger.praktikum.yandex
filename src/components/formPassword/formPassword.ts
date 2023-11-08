import Component from '../../core/Component';
import formValidate from '../../core/Validate';
import UserController from '../../controller/UserController';
import connect from '../../core/Connect';
import { Indexed } from '../../types/types';

const userController = new UserController();

class FormPassword extends Component {
  // static readonly componentName = "FormSignup";
  protected initial = {
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    password: '',
    phone: '',
    error: {},
  };

  constructor() {
    super({
      componentName: 'FormPassword',
      onBlur: (e: Record<string, any>) => {
        this.validateField(e);
      },

    });

    this.setProps(this.initial);
  }

  init(): boolean {
    this.events = {
      submit: this.onSubmit.bind(this),
    };
    return true;
  }

  validateField(event: Record<string, any>) {
    event.preventDefault();
    const { target } = event;
    const { name, value } : Record<string, any> = target;
    const input = { [name]: value };
    const errorField: Record<string, string> | boolean = formValidate(input);
    const { props } = this;
    const { error } = props.state;
    const updateError = { ...error, [name]: errorField[name] };
    this.setProps({
      ...input,
      error: updateError,
    });
  }

  validateForm(formObject: object) {
    const error = formValidate(formObject);
    this.setProps({ ...formObject, error });
    return Object.keys(error).length === 0;
  }

  onSubmit(event: Record<string, any>) {
    event.preventDefault();
    const { target } = event;

    const formData = new FormData(target);
    const formObject = Object.fromEntries(formData.entries());

    const isValid = this.validateForm(formObject);

    if (!isValid) {
      return;
    }

    userController.password(formObject);
  }

  componentDidUpdate(): boolean {
    const { state } = this.props;
    /* eslint no-console: 0 */
    console.log(state);
    return true;
  }

  render() {
    return (`
                   <form action="#" name="password">
            <ul class="flat-list profile__bio">
                <li class="flat-list__item">
                    <div class="row row_between row_middle row_height">
                        <div>
                            <label for="oldPassword" class="text-bold">Старый пароль</label>
                        </div>
                        <div>
                            <input id="oldPassword" type="password" name="oldPassword" class="text-input text-input_full text-right text-muted" value="" />
                        </div>
                    </div>
                </li>
                <li class="flat-list__item">
                    <div class="row row_between row_middle row_height">
                        <div>
                            <label for="newPassword" class="text-bold">Новый пароль</label>
                        </div>
                        <div>
                            <input id="newPassword" type="password" name="newPassword" class="text-input text-input_full text-right text-muted" value="" />
                        </div>
                    </div>
                </li>
                <li class="flat-list__item">
                    <div class="row row_between row_middle row_height">
                        <div>
                            <label for="newPassword2" class="text-bold">Повторите новый пароль</label>
                        </div>
                        <div>
                            <input id="newPassword2" type="password" name="first_name2" class="text-input text-input_full text-right text-muted" value="" />
                        </div>
                    </div>
                </li>
            </ul>
            <div class="profile__buttons text-center">
                <button type="submit" class="btn btn_md btn_ocean btn_corner">
                    Сохранить
                </button>
            </div>
        </form>
                    `);
  }
}

const mapUserToProps = (state: Indexed) => ({
  user: state.user,
});

export default connect(mapUserToProps)(FormPassword);
