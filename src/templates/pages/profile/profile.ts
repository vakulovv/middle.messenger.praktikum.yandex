import template from './profile.hbs?raw';
import Component from '../../../core/Component';
import UserController from '../../../controller/UserController';
import connect from '../../../core/Connect';
import { Indexed, User } from '../../../types/types';

const userController = new UserController();

class Profile extends Component {
  constructor(props:Record<string, any>) {
    super({
      componentName: 'Profile',
      onLogout: () => {
        this.onLogout.apply(this);
      },
      onSettings: () => {
        this.onSettings.apply(this);
      },

      onChangePassword: () => {
        this.onChangePassword.apply(this);
      },
      ...props,
    });
  }

  onLogout() {
    userController.logout();
  }

  onSettings() {
    this.router.go('settings');
  }

  onChangePassword() {
    this.router.go('password');
  }

  render() {
    return template;
  }
}

const mapUserToProps = (state: Indexed): User => ({
  first_name: state.user?.first_name,
  second_name: state.user?.second_name,
  display_name: state.user?.display_name,
  login: state.user?.login,
  email: state.user?.email,
  phone: state.user?.phone,
  avatar: state.user?.avatar,
  id: state.user?.id,
});

export default connect(mapUserToProps)(Profile);
