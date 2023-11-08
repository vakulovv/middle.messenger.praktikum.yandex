import Component from '../../core/Component';
import formValidate from '../../core/Validate';
import UserController from '../../controller/UserController';

const userController = new UserController();

export default class FormSignup extends Component {
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
      componentName: 'FormSignup',
      onBlur: (e: Record<string, any>) => {
        this.validateField(e);
      },
      onLogin: () => {
        this.onLogin.apply(this);
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
      userController.signUp(formObject);
    }
  }

  onLogin() {
    this.router.go('login');
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
                     <form action="#" name="auth" class="signup-form">
                        <div class="mb-1">
                            {{{ Field 
                                name="email" 
                                label="Почта"
                                class="text-input_flat text-input_flat_ocean"
                                toggle=true
                                value=state.email
                                error="${error?.email || ''}"
                                onBlur=onBlur
                                }}}
                        </div>
                        <div class="mb-1">
                            {{{ Field 
                                name="login" 
                                label="Логин"
                                class="text-input_flat text-input_flat_ocean"
                                toggle=true
                                value=state.login
                                error="${error?.login || ''}"
                                onBlur=onBlur
                                }}}
                        </div>
                        <div class="mb-1">
                            {{{ Field 
                                name="first_name" 
                                label="Имя"
                                class="text-input_flat text-input_flat_ocean"
                                toggle=true
                                value=state.first_name
                                error="${error?.first_name || ''}"
                                onBlur=onBlur
                                }}}
                        </div>
                         <div class="mb-1">
                            {{{ Field 
                                name="second_name" 
                                label="Фамилия"
                                class="text-input_flat text-input_flat_ocean"
                                toggle=true
                                value=state.second_name
                                error="${error?.second_name || ''}"
                                onBlur=onBlur
                                }}}
                        </div>
                         <div class="mb-1">
                            {{{ Field 
                                name="phone" 
                                label="Телефон"
                                class="text-input_flat text-input_flat_ocean"
                                toggle=true
                                value=state.phone
                                error="${error?.phone || ''}"
                                onBlur=onBlur
                                }}}
                        </div>
                        <div class="mb-1">
                            {{{ Field 
                                name="password" 
                                label="Пароль"
                                class="text-input_flat text-input_flat_ocean"
                                toggle=true
                                value=state.password
                                error="${error?.password || ''}"
                                onBlur=onBlur
                                }}}
                        </div>
                        <div class="mb-1">
                            {{{ Field 
                                name="password2" 
                                label="Пароль (eще раз)"
                                class="text-input_flat text-input_flat_ocean"
                                toggle=true
                                value=state.password2
                                error="${error?.password2 || ''}"
                                onBlur=onBlur
                                }}}
                        </div>
                        <div class="signup-form__buttons">
                            <div class="mb-1">
                                {{{Button class="btn_full btn_md btn_ocean btn_corner" label="Зарегистрироваться" name="signup"  }}}
                            </div>
                            <div>
                                {{{Button class="btn_full btn_sm btn_subtle" label="Войти" name="login" type="button" onClick=onLogin }}}
                            </div>
                        </div>
                    </form>
                    `);
  }
}
