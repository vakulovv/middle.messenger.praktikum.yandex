import Route from './Route.ts';
import type Component from './Component';

export default class Router {
  public routes: Record<string, any>[];

  private history: History;

  public _currentRoute: null | Record<string, any>;

  private _rootQuery: any;

  private _errorRoute: null | Route;

  private static __instance: any;

  private _redirects: Record<string, any>;

  constructor(rootQuery: any) {
    if (Router.__instance) {
      /* eslint no-constructor-return:0 */
      return Router.__instance;
    }

    this.routes = [];
    this._redirects = {};
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
    return null;
  }

  use(pathname: string, block: typeof Component) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  error(pathname: string, block: typeof Component) {
    this._errorRoute = new Route(pathname, block, { rootQuery: this._rootQuery });
    return this;
  }

  redirect(pathname: string, to: string) {
    this._redirects[pathname] = to;
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Document;
      const location = target.location as Location;
      this._onRoute(location.pathname.slice(1));
    };

    this._onRoute(window.location?.pathname?.slice(1));
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname) || null;

    const props = {};

    if (this._redirects[pathname]) {
      this.go(this._redirects[pathname]);
      return;
    }

    if (!route) {
      route = this._errorRoute;
      if (route?._pathname !== pathname) {
        this.go(route?._pathname);
        return;
      }
      Object.assign(props, { code: 404, text: 'Не туда попали' });
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route?.render(props);
  }

  go(pathname: string | undefined) {
    if (pathname === undefined) {
      return;
    }
    this.history.pushState({}, '', pathname);

    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route: Record<string, any>) => route.match(pathname));
  }
}
