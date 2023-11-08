import template from './login.hbs?raw';
import Component from '../../../core/Component';

class Login extends Component {
  constructor() {
    super({ componentName: 'Login' });
  }

  render() {
    return template;
  }
}

export default Login;
