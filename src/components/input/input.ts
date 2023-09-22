import Component from '../../core/Component';

interface IPropsInput {
  name: string,
  label: string,
  class: string,
  value: string,
}

export default class Input extends Component {
  constructor(props: IPropsInput) {
    super({
      componentName: 'Input',
      ...props,
    });
  }

  init() {
    const { props } = this;
    this.events = {
      blur: props.onBlur,
    };
    return true;
  }

  render() {
    return (`
            <input id="{{ name }}" type="text" name="{{ name }}" placeholder="{{ label }}" class="text-input {{ class }}" value="{{value}}" />
        `);
  }
}
