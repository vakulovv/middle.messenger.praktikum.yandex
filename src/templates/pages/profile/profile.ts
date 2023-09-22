import template from './profile.hbs?raw';
import Component from '../../../core/Component';

class Profile extends Component {
  constructor() {
    super({ componentName: 'Profile' });
  }

  render() {
    return template;
  }
}

export default Profile;
