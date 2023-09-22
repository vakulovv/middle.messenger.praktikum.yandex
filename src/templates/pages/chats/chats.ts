import template from './chats.hbs?raw';
import Component from '../../../core/Component';

class Chats extends Component {
  constructor() {
    super({ componentName: 'Chats' });
  }

  render() {
    return template;
  }
}

export default Chats;
