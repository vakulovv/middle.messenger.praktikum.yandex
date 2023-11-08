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
            this._block.unmountComponent();
            this._block.getNode().remove()
            this._block = null;
        }
    }

    match(pathname) {
        return isEqual(pathname, this._pathname);
    }

    render(props) {
        console.log("this._block", this._block)
        if (!this._block) {
            this._block = new this._blockClass(props);
            render(this._props.rootQuery, this._block);
            return;
        }

        render(this._props.rootQuery, this._block);
    }
}

export default class Router {
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this._redirect = {};
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        this._errorRoute = null;
        this._currentRoute = null;

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

    redirect(pathname, to) {
        this._redirect[pathname]  = to;
        return this;
    }

    start() {
        window.onpopstate = (event) => {
            console.log('onpopstate')
            console.log("this._block 2", this._block)
            this._onRoute(event.currentTarget.location.pathname.slice(1));
        }

        this._onRoute(window.location.pathname.slice(1));
    }

    _onRoute(pathname) {
        console.log("this._block 2", pathname)
        let route = this.getRoute(pathname);

        const props = {};

        if (this._redirect[pathname]) {
            this.go(this._redirect[pathname]);
            return;
        }

        console.log("this._block 2 route", route)

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
        if (pathname === undefined) {
            return;
        }
        this.history.pushState({}, "", pathname);
        console.log("pathname", pathname)
        console.log("this._block 4", pathname)

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
