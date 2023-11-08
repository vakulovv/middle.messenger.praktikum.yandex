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
        this.state = {
            auth: false,
            user: null,
            chats: [],
        };
    }

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        // метод EventBus
        this.emit(StoreEvents.Updated, path);
    };
}

export default new Store();
