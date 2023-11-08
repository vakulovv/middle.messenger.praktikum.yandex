import Component from '../../core/Component';

export default class Menu extends Component {
  constructor(props: Record<string, string | number>) {
    super({ componentName: 'Menu', ...props });
  }

  init(): boolean {
    const { props } = this;
    console.log("props_menu", props)

    this.events = {
      // focusout: () => props.toggle(),
      // mouseout: () => {
      //   console.log("test_05")
      //   props.toggle()
      // },
      focusout: (event) => {
        console.log("focusout")

        if (this.getNode().contains(event.relatedTarget)) {
          console.log("check_0")
          // don't react to this

          return true;
        }
        // //
        props.toggle()
        return true;


      },
      focus: () => {
        console.log("domElement focus", )
      },

    };

    this.toggle()



    return true;
  }



  toggle() {
    if (this.props.open) {
      this.show()
      setTimeout(() => {
        this.getNode().focus()
      }, 0)
    } else {
      this.hide()
    }
  }

  componentDidUpdate(): boolean {
    console.log("focus1")
    return true
  }


  render() {

    return (`
        <!-- Modal -->
        <div class="menu" tabindex="-1" id="menuChats" >
        
        </div>
      `);
  }
}
