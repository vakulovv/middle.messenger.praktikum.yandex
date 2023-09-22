import Component from '../../core/Component';

export default class Button extends Component {
  constructor(props: Record<string, string | number>) {
    super({ componentName: 'Button', ...props });
  }

  render() {
    return (`
            <button type="submit" name="{{name}}" class="btn {{class}}">{{ label }}</button>
        `);
  }
}
