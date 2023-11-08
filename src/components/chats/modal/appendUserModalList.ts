import Component from "../../../core/Component";
import ChatsController from "../../../controller/ChatsController";
import UserController from "../../../controller/UserController";
import connect from "../../../core/Connect";
const userController = new UserController();

class AppendUserModalList extends Component {
    constructor(props) {
        super({
            componentName: 'appendUserModalList',
            addUser: (e) => {
                const target = e.target;
                const {activeChatId} = props.state;
                const userId = target.dataset.id;

                ChatsController.appendUser([userId], activeChatId);
            },
            ...props
        });
    }

    init(): boolean {
        return true;
    }

    componentDidUpdate(): boolean {
        const { state } = this.props;
        /* eslint no-console: 0 */
        console.log("state", state);
        console.log("this.props4", JSON.stringify(this.props));
        return true;

    }

    render() {
        const { props } = this;
        const {  users = [] } = props.state;


        return (`
                <ul class="flat-list">
                    ${users.length ? users.map(user => `
                        <li class="">
                         {{{ Button class="btn btn_full btn_plain" label="${user.login}" onClick=addUser data-id="${user.id}" }}}
                        </li>`).join("") : ""}
                </ul>
                    `);
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        activeChatId: state.activeChatId,
    }
}

export default connect(mapStateToProps)(AppendUserModalList);