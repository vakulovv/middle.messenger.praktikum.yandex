import template from './chats.hbs?raw';
import Component from '../../../core/Component';

class Chats extends Component {
  constructor() {
    super({ componentName: 'Chats' });
  }

  componentDidMount() {
    return true;
  }

  render() {
    return template;
  }
}

export default Chats;
