import Component from "./Component";
import store, {StoreEvents} from "./Store.ts";
import {isEqual} from "./Utils";
type IProps = Record<string, any>;

function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function (Component: typeof Component) {
        return class extends Component {
            constructor(props: IProps, children?: Record<string, any>) {

                let state = mapStateToProps(store.getState());
                super(props, children);

                // Подписываемся на событие
                store.on(StoreEvents.Updated, () => {
                    const newState = getStateToProps(store.getState());

                    if (isEqual(state, newState)) {
                        this.setProps(store.getState())
                    }

                    state = newState;
                });
            };
        }
    }
}

export default connect;
