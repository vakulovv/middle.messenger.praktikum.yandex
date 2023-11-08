import template from './profileEditPassword.hbs?raw';
import Component from '../../../core/Component';

class ProfileEditPassword extends Component {
  constructor() {
    super({ componentName: 'ProfileEditPassword' });
  }

  render() {
    return template;
  }
}

export default ProfileEditPassword;
