import Component from './Component';
import store, { StoreEvents } from './Store.ts';
import { isEqual } from './Utils';
import { Indexed } from '../types/types.ts';

type IProps = Record<string, any>;

function connect(mapStateToProps: (state: Indexed) => Record<string, any>) {
  return function Foo(Block: typeof Component) {
    return class extends Block {
      constructor(props: IProps, children?: Record<string, any>) {
        let state = mapStateToProps(store.getState());

        super({ ...props, state }, children);

        // Подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps(newState);
          }

          state = newState;
        });
      }
    };
  };
}

export default connect;
