import EventBus from './EventBus';
import { compile, register } from './Template';

type IProps = Record<string, any>;
type IEvents = Record<string, (event: string) => void>

enum Events {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render',
}

export default abstract class Component {
  protected events: IEvents = {};

  protected domElement:Element | null;

  /* eslint no-use-before-define: 0 */
  protected children: Array<Record<string, any>> = [];

  protected eventBus: () => EventBus;

  protected props: IProps;

  constructor(props: IProps, children?: Record<string, any>) {
    const eventBus = new EventBus();
    this.domElement = null;
    this.eventBus = () => eventBus;
    this.props = this._makePropsProxy({ ...props, state: {} });

    if (children !== undefined
            && children !== null
            && Object.entries(children).length > 0) {
      this.registerChildComponent(children);
    }

    this._registerEvents(eventBus);
    eventBus.emit(Events.INIT);
  }

  _init() {
    this.init();
    this._render();
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Events.INIT, this._init.bind(this));
    eventBus.on(Events.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Events.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Events.FLOW_RENDER, this._render.bind(this));
  }

  _mountComponent() {
    this._attachListener();
    this._componentDidMount();
  }

  _componentDidMount() {
    return true;
  }

  _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (response) {
      this.eventBus().emit(Events.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate() {
    return true;
  }

  init(): boolean {
    return true;
  }

  setProps = (nextProps: Record<string, any>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Events.FLOW_CDU);
  };

  protected registerChildComponent(children: Record<string, Component>):void {
    for (const child of Object.entries(children)) {
      register(child);
    }
  }

  public getNode(): Element {
    if (!this.domElement) {
      this._render();
    }

    return this.domElement as Element;
  }

  _render():void {
    this._unmountComponent();
    const fragment = this.compile(this.render(), this.props);

    const newElement: Element | null = fragment.firstElementChild || null;

    if (this.domElement) {
      this.domElement.replaceWith(newElement || '');
    }

    this.domElement = newElement;

    this._mountComponent();
  }

  _componentWillUnmount() {
    return true;
  }

  public unmountComponent() {
    this._unmountComponent();
  }

  _unmountComponent() {
    if (this.domElement) {
      this._componentWillUnmount();
      this._removeListeners();
      if (this.children) {
        // this.children.forEach(({embed, ...rest}) => rest.unmountComponent());
      }
    }
  }

  render() {
    return '';
  }

  _removeListeners() {
    return true;
  }

  _attachListener() {
    const addEventListener = (element: Component, event: string, cb: any) => {
      element.getNode().addEventListener(event, cb);
    };

    Object.keys(this.events).forEach((event) => {
      const cb = this.events[event];
      addEventListener(this, event, cb);
    });
  }

  compile(template: string, options: Record<string, any>) {
    const temp = document.createElement('template');
    const { html, children } = compile(template, options);
    this.children = children.length > 0 ? children : this.children;
    temp.innerHTML = html;

    this.children?.forEach(({ embed }) => {
      embed(temp.content);
    });

    return temp.content;
  }

  private _makePropsProxy<T extends Record<string, any>>(props: T) {
    const self = this;
    return new Proxy(props, {
      set(target, prop, value) {
        const prev = target.state[prop];
        /* eslint no-param-reassign: 0 */
        target.state[prop] = value;
        self.eventBus().emit(Events.FLOW_CDU, prev, value);
        return true;
      },
      // deleteProperty: function() {
      //     throw new Error("Нет доступа")
      // }
    });
  }
}
