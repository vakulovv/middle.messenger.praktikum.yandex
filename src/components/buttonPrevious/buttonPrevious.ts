import Component from '../../core/Component';

export default class ButtonPrevious extends Component {
  constructor(props: Record<string, string | number>) {
    super({ componentName: 'Button', ...props });
  }

  init() {
    this.events = {
      click: this.onClick.bind(this),
    };
    return true;
  }

  onClick() {
    this.router.back();
  }

  render() {
    return (`
            {{{Button
                     icon='<span class="arrow-icon">←</span>'
                     onClick=onProfile
                     class="btn-icon btn-icon_prev btn-icon_gray"
                     type="button"
                     name="button"
                     }}}
        `);
  }
}
