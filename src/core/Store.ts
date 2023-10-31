import EventBus from "./EventBus";
import {set} from "./Utils";

export enum StoreEvents {
    Updated = 'updated',
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
    private state: {};

    constructor() {
        super();
        this.state = {};
    }

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        // метод EventBus
        this.emit(StoreEvents.Updated);
    };
}

export default new Store();
