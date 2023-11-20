import template from './profileEdit.hbs?raw';
import Component from '../../../core/Component';

class ProfileEdit extends Component {
  constructor(props: Record<string, string | number>) {
    super({ componentName: 'ProfileEdit', ...props });
  }

  render() {
    return template;
  }
}

export default ProfileEdit;
