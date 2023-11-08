import type Component from './Component.ts';

type IRouteProps = { rootQuery: HTMLElement };

function render(root: HTMLElement, block: Record<string, any> | null) {
  if (block) {
    root.append(block.getNode());
  }
  return root;
}

export default class Route {
  private _pathname: string;

  private _blockClass: typeof Component;

  private _block: null | Record<string, any>;

  private _props: IRouteProps;

  constructor(
    pathname: string,
    view: typeof Component,
    props: IRouteProps,
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render({});
    }
  }

  leave() {
    if (this._block) {
      this._block.unmountComponent();
      this._block.getNode().remove();
      this._block = null;
    }
  }

  match(pathname:string) {
    return pathname === this._pathname;
  }

  render(props: Record<string, any>) {
    if (!this._block) {
      this._block = new this._blockClass(props);
      render(this._props.rootQuery, this._block);
      return;
    }

    render(this._props.rootQuery, this._block);
  }
}
