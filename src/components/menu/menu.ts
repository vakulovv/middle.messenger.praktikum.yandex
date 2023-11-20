import Component from '../../core/Component';

export default class Menu extends Component {
  constructor(props: Record<string, string | number>) {
    super({ componentName: 'Menu', ...props });
  }

  init(): boolean {
    const { props } = this;

    this.events = {
      focusout: (event: FocusEvent) => {
        const target = event.relatedTarget as Node;
        if (this.getNode().contains(target)) {
          return true;
        }
        props.toggle();
        return true;
      },
    };

    this.toggle();

    return true;
  }

  toggle() {
    const { props: { open } } = this;
    if (open) {
      this.show();
      setTimeout(() => {
        const html = this.getNode() as HTMLElement;
        html.focus();
      }, 0);
    } else {
      this.hide();
    }
  }

  componentDidUpdate(): boolean {
    return true;
  }

  render() {
    return (`
        <!-- Modal -->
        <div class="menu" tabindex="-1" id="menuChats" >
        </div>
      `);
  }
}
