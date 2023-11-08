import template from './signup.hbs?raw';
import Component from '../../../core/Component';

class Signup extends Component {
  constructor() {
    super({ componentName: 'Signup' });
  }

  render() {
    return template;
  }
}

export default Signup;
