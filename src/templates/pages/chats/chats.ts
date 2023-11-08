import template from './chats.hbs?raw';
import Component from '../../../core/Component';
import connect from "../../../core/Connect";
import ChatsController from "../../../controller/ChatsController";



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

const mapUserToProps = (state) => {
  return {
    // messages: state.messages,
  }
}

export default connect(mapUserToProps)(Chats);
