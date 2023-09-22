import Component from '../../core/Component';
import formValidate from '../../core/Validate';

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
    });

    this.setProps(this.initial);
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

  validateForm(form: HTMLFormElement) {
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    const error = formValidate(formObject);

    this.setProps({ ...formObject, error });
  }

  onSubmit(event: Record<string, any>) {
    event.preventDefault();
    const { target } = event;
    this.validateForm(target);
  }

  componentDidUpdate(): boolean {
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
                                label="Пароль"
                                class="text-input_flat text-input_flat_ocean"
                                toggle=true value=state.password
                                onBlur=onBlur
                                error="${error?.password || ''}"
                            }}}
                        </div>
                        <div class="login-form__buttons">
                            <div class="mb-1">
                                {{{Button class="btn_full btn_md btn_ocean btn_corner" label="Войти" name="login" }}}
                            </div>
                            <div>
                                {{{Button class="btn_full btn_sm btn_subtle" label="Нет аккаунта?" name="register" }}}
                            </div>
                        </div>
                    </form>
                    `);
  }
}
