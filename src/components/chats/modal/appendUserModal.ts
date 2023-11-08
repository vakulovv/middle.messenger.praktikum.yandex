import Component from "../../../core/Component";
import ChatsController from "../../../controller/ChatsController";
import UserController from "../../../controller/UserController";
import connect from "../../../core/Connect";
import {debounce} from "../../../core/Utils";
const userController = new UserController();

class AppendUserModal extends Component {
    protected initial = {
        message: '',
        error: {},

    };


    constructor(props) {
        super({
            componentName: 'appendUserModal',
            onBlur: (e: Record<string, any>) => {
                // this.validateField(e);
            },
            onInput: debounce((e: Record<string, any>) => {
                console.log("onInput", e.target);
                this.findUser(e.target);
                // this.setProps({value: e.target.value});
            }),
            ...props
        });

        this.setProps(this.initial);
    }

    init(): boolean {
        this.events = {
            submit: this.onSubmit.bind(this),
            click: (e) => e.stopPropagation(),
        };

        return true;
    }


    findUser(target) {
        userController.search(target.value)
    }



    onSubmit(event: Record<string, any>) {
        event.preventDefault();
        const { target } = event;
        const formData = new FormData(target);
        const formObject = Object.fromEntries(formData.entries());
        console.log("state_5", target, formObject)
        ChatsController.createChat(formObject)
    }

    componentDidUpdate(): boolean {
        const { state } = this.props;
        /* eslint no-console: 0 */
        // console.log("state.getState111", JSON.stringify(this.props));

        return true;
    }

    render() {
        const { props } = this;
        const { error, users = [], value } = props.state;


        return (`
                <div class="modal-content">
                    <h2>Введите имя пользователя</h2> 
                    <form action="#" name="comment" class="row row_nowrap row_gap-sm" style="width: 100%">
                        <div class="textarea corner">
                        {{{ Field 
                            name="title" 
                            label="Имя"
                            class=""
                            value=""
                            error="${error?.message || ''}"
                            
                            onInput=onInput
                            }}}
                        </div>
                    </form>
                   {{{ AppendUserModalList activeChatId=activeChatId }}} 
                </div>
                    `);
    }
}



export default  AppendUserModal;