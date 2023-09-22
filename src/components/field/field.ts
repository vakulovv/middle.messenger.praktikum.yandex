import Component from '../../core/Component';

export default class Field extends Component {
  constructor(props: Array<Record<string, any>>) {
    super({ componentName: 'Field', ...props });
  }

  render() {
    return (`
            <div class="input">
                {{#if toggle }}
                    <label for="{{ name }}" class="label label_toggle">{{ label }}</label>
                {{/if}}
                {{{ Input name=name label=label class=class onBlur=onBlur value=value }}}
                {{#if error}} <span class="text-small text-error">{{error}}</span> {{/if}}
            </div>
        `);
  }
}