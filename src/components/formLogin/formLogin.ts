import Component from '../../core/Component';
import formValidate from '../../core/Validate';
import Router from "../../core/Router"
import ApiUser from "../../services/user";
import store from '../../core/Store.ts';
import UserController from "../../controller/UserController.ts";

const userController  = new UserController();

export default class FormLogin extends Component {
  protected initial = {
    login: '',
    password: '',
    error: {},
  };

  constructor() {
    super({
      onBlur: (e: Record<string, any>) => {
        this.validateField(e);
      },
      onSignup: () => {
        this.onSignup.apply(this);
      },
    });

    this.setProps(this.initial);
    console.log("router", this.router)
  }

  init():boolean {
    this.events = {
      submit: this.onSubmit.bind(this),
    };
    return true;
  }

  validateField(event: Record<string, any>) {
    event.preventDefault();
    const { target } = event;
    const { name, value } = target;
    const input = { [name]: value };
    const errorField: Record<string, any> | boolean = formValidate(input);
    const { props } = this;
    const { error } = props.state;
    const updateError = { ...error, [name]: errorField[name] };
    this.setProps({
      ...input,
      error: updateError,
    });
  }

  validateForm(formObject) {
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

    userController.authUser(formObject);
  }

  onSignup() {
    // console.log("this.router 1", this.router)
    this.router.go("sign-up");
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
                     <form action="#" name="auth" class="login-form">
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
                                name="password"
                                type="password"
                                label="Пароль"
                                class="text-input_flat text-input_flat_ocean"
                                toggle=true value=state.password
                                onBlur=onBlur
                                error="${error?.password || ''}"
                            }}}
                        </div>
                        <div class="login-form__buttons">
                            <div class="mb-1">
                                {{{Button class="btn_full btn_md btn_ocean btn_corner" label="Войти" name="login" type="submit" }}}
                            </div>
                            <div>
                                {{{Button class="btn_full btn_sm btn_subtle" label="Нет аккаунта?" name="register" type="button" onClick=onSignup }}}
                            </div>
                        </div>
                    </form>
                    `);
  }
}
