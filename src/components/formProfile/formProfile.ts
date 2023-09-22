import Component from '../../core/Component';
import formValidate from '../../core/Validate';

export default class FormProfile extends Component {
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
      componentName: 'FormProfile',
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
    const { name, value } = target;
    const input = { [name]: value };
    const errorField: Record<string, string> = formValidate(input);
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
                                name="name" 
                                label="Имя в чате"
                                class="text-input_flat text-input_flat_ocean"
                                toggle=true
                                value=state.name
                                error="${error?.name || ''}"
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
                         
                        <div class="signup-form__buttons">
                            <div class="mb-1">
                                {{{Button class="btn_full btn_md btn_ocean btn_corner" label="Зарегистрироваться" name="signup" }}}
                            </div>
                            <div>
                                {{{Button class="btn_full btn_sm btn_subtle" label="Войти" name="login" }}}
                            </div>
                        </div>
                    </form>
                    `);
  }
}
