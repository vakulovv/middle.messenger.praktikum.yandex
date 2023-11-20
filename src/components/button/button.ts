import Component from '../../core/Component';

export default class Button extends Component {
  constructor(props: Record<string, string | number>) {
    super({ componentName: 'Button', ...props });
  }

  init() {
    const { props } = this;
    this.events = {
      click: props.onClick,
    };
    return true;
  }

  render() {
    return (`
            <button type="{{type}}" name="{{name}}" class="btn {{class}}" data-id="{{data-id}}"> {{ label }} {{{icon}}}</button>
        `);
  }
}
