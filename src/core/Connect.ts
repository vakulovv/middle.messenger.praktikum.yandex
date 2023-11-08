import Component from "./Component";
import store, {StoreEvents} from "./Store.ts";
import {isEqual} from "./Utils";
import {Chat} from "../components/chats/chat";
type IProps = Record<string, any>;

function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function (Component: typeof Component) {
        return class extends Component {
            constructor(props: IProps, children?: Record<string, any>) {

                let state = mapStateToProps(store.getState());

                let state01 = store.getState()

                console.log("props000", store.getState())
                console.log("props000", state)



                super({...props, state}, children);

                // Подписываемся на событие
                store.on(StoreEvents.Updated, () => {
                    const newState = mapStateToProps(store.getState());
                    const newState01 =  store.getState();

                    if (Component.name === 'Contacts') {
                        console.log("click_01", Component.name, !isEqual(state, newState), state, newState)
                        console.log("click_01", Component.name, !isEqual(state01, newState01), state01, newState01)
                    }



                    if (!isEqual(state, newState)) {

                        this.setProps(newState)
                    }

                    state = newState;
                    state01 = newState01;
                });
            };
        }
    }
}

export default connect;
