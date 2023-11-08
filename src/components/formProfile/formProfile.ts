import Component from '../../core/Component';
import formValidate from '../../core/Validate';
import UserController from '../../controller/UserController';
import connect from '../../core/Connect';
import { Indexed } from '../../types/types';

const userController = new UserController();

class FormProfile extends Component {
  // static readonly componentName = "FormSignup";
  protected initial = {
    display_name: '',
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    password: '',
    phone: '',
    error: {},
    changeAvatarModal: false,
  };

  constructor(props: Record<string, any>) {
    super({
      componentName: 'FormProfile',
      onBlur: (e: Record<string, any>) => {
        this.validateField(e);
      },
      toggleChangeAvatarModal: () => {
        this.toggleChangeAvatarModal.apply(this);
      },
      ...props,
    });

    this.setProps({ ...this.initial, ...props.state.user });
  }

  toggleChangeAvatarModal() {
    const { state: { changeAvatarModal } } = this.props;
    this.setProps({ changeAvatarModal: !changeAvatarModal });
  }

  init(): boolean {
    this.events = {
      submit: this.onSubmit.bind(this),
      click: (e) => e.stopPropagation(),
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

  validateForm(form: HTMLFormElement): boolean {
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    const error = formValidate(formObject);

    this.setProps({ ...formObject, error });
    return true;
  }

  async onSubmit(event: Record<string, any>) {
    event.preventDefault();
    event.stopPropagation();
    const { target } = event;
    const error = this.validateForm(target);

    const formData = new FormData(target);
    const formObject = Object.fromEntries(formData.entries());

    if (!error) {
      await userController.profile(formObject);
    }

    return true;
  }

  componentDidUpdate(): boolean {
    const { state } = this.props;
    /* eslint no-console: 0 */
    console.log(state);
    return true;
  }

  render() {
    const { props } = this;
    const { user = {} } = props.state;
    const { error } = props.state;

    return (`

                     <form   class="signup-form">
                        <div class="profile__avatar row row_center">
                            <div class="text-center">
                                <div class="avatar">
                                    {{{Button type="button " class=" btn_subtle" icon="<img class='avatar' src='${user?.avatar ? `https://ya-praktikum.tech/api/v2/resources${user.avatar}` : '/public/vite.svg'}' >" onClick=toggleChangeAvatarModal }}}
                                </div>
                                <h2>{{{state.user.first_name}}}</h2>
                            </div>
                        </div>
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
                                name="display_name" 
                                label="Имя в чате"
                                class="text-input_flat text-input_flat_ocean"
                                toggle=true
                                value=state.display_name
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
                         
                        <div class="profile__buttons text-center">
                          <button type="submit" class="btn btn_md btn_ocean btn_corner">
                              Сохранить
                          </button>
                      </div>
                      {{#Modal open=state.changeAvatarModal toggle=toggleChangeAvatarModal  }}
                          {{{ ChangeAvatarModal toggle=toggle }}}
                      {{/Modal}}
                    </form>
                    `);
  }
}

const mapUserToProps = (state: Indexed) => ({
  user: state.user,
});

export default connect(mapUserToProps)(FormProfile);
