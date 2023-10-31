import template from './chats.hbs?raw';
import Component from '../../../core/Component';
import connect from "../../../core/Connect";

class Chats extends Component {
  constructor() {
    super({ componentName: 'Chats' });
  }

  render() {
    return template;
  }
}

const mapUserToProps = (state) => {
  return {
    name: state.user.name,
  }
}

export default connect(mapUserToProps)(Chats);
