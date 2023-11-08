import Component from '../../core/Component';

export default class Modal extends Component {
  constructor(props: Record<string, string | number>) {
    super({ componentName: 'Modal', ...props });
  }

  init(): boolean {
    const { props } = this;
    this.events = {
      click: () => props.toggle(),
    };

    this.toggle()

    return true;
  }

  toggle() {
    if (this.props.open) {
      this.show()

    } else {
      this.hide()
    }
  }

  componentDidUpdate(): boolean {
    console.log("state_5", this)
    // this.toggle()
    return false;
  }

  render() {
    return (`
        <!-- Modal -->
        <div class="modal" tabindex="0">
            {{{content}}}
        </div>
      `);
  }
}
