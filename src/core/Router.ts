import {isEqual} from "./Utils.ts";

function render(root, block) {
    root.append(block.getNode())
    return root;
}

class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname) {
        return isEqual(pathname, this._pathname);
    }

    render(props) {
        if (!this._block) {
            this._block = new this._blockClass(props);
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

export default class Router {
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        this._errorRoute = null;

        Router.__instance = this;
    }

    static get instance() {
        if (Router.__instance) {
            return Router.__instance;
        }
    }

    use(pathname, block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    error(pathname, block) {
        this._errorRoute = new Route(pathname, block, {rootQuery: this._rootQuery});
        return this;
    }

    start() {
        window.onpopstate = (event) => {
            this._onRoute(event.currentTarget.location.pathname.slice(1));
        }

        this._onRoute(window.location.pathname.slice(1));
    }

    _onRoute(pathname) {
        let route = this.getRoute(pathname);

        const props = {};

        if (!route) {
            route = this._errorRoute;
            if (route._pathname !== pathname) {
                this.go(route._pathname);
                return;
            }
            Object.assign(props, { code: 404, text: 'Не туда попали' });
        }

        console.log('route',  pathname, this.routes )

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;

        route.render(props);
    }

    go(pathname) {
        if (!pathname) {
            return;
        }
        this.history.pushState({}, "", pathname);
        console.log("pathname", pathname)
        this._onRoute(pathname);
    }

    back() {
        this.history.back()

    }

    forward() {
        this.history.forward();

    }

    getRoute(pathname) {
        // console.log("pathname", pathname)
        return this.routes.find(route => route.match(pathname));
    }
}
