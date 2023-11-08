import Component from "../../../core/Component";
import ChatsController from "../../../controller/ChatsController";
import UserController from "../../../controller/UserController";
import connect from "../../../core/Connect";
const userController = new UserController();

class RemoveUserModal extends Component {
    protected initial = {
        message: '',
        error: {},

    };

    constructor(props) {
        super({
            componentName: 'RemoveUserModal',
            onBlur: (e: Record<string, any>) => {
                // this.validateField(e);
            },
            removeUser: (e) => {
                const target = e.target;
                const {activeChatId} = props.state;
                const userId = target.dataset.id;
                console.log("removeUser_1")
                ChatsController.removeUser([userId], activeChatId);
            },
            ...props
        });

        this.setProps(this.initial);
    }

    init(): boolean {
        this.events = {

            click: (e) => e.stopPropagation(),
        };
        return true;
    }





    render() {
        const { props } = this;
        const { chatUsers = []} = props.state;


        return (`
                <div class="modal-content">
                    <h2>Удалить пользователя из чата</h2> 
                      <ul class="flat-list">
                        ${chatUsers.length ? chatUsers.map(user => `
                        <li class="">
                         {{{ Button class="btn btn_full btn_plain" label="${user.login}" onClick=removeUser data-id="${user.id}" }}}
                        </li>`).join("") : ""}
                    </ul>
                </div>
                    `);
    }
}


const mapUserToProps = (state) => {
    return {
        activeChatId: state.activeChatId,
        chatUsers: state.chatUsers,
    }
}


export default connect(mapUserToProps)(RemoveUserModal);