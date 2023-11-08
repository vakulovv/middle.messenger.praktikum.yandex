import template from './profileEdit.hbs?raw';
import Component from '../../../core/Component';
import connect from "../../../core/Connect";

class ProfileEdit extends Component {
  constructor(props) {
    super({componentName: 'ProfileEdit', ...props});
  }



  render() {
    console.log("props.state", this.props.state)
    return template;
  }
}

export default ProfileEdit