import Component from '../../../core/Component';
import template from './chat.hbs?raw';
import { FormMessage } from './formMessage/index';

interface IPropsChat {
  author: string,
  messages: [],
  time: string,
}

export default class Chat extends Component {
  constructor(props:IPropsChat) {
    super({ componentName: 'Chat', ...props }, { FormMessage });
  }

  render() {
    return template;
  }
}
