import template from './profileEdit.hbs?raw';
import Component from '../../../core/Component';

class ProfileEdit extends Component {
  constructor() {
    super({ componentName: 'ProfileEdit' });
  }

  render() {
    return template;
  }
}

export default ProfileEdit;
