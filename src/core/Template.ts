import Handlebars, { HelperOptions } from 'handlebars';

export function compile(template:string, props: object) {
  const children = [] as Array<any>;

  const data = {
    ...props,
    __children: children,
  };
  const pre = Handlebars.compile(template);
  const html = pre(data);

  /* eslint no-underscore-dangle: 0 */
  return { html, children: data.__children };
}

export function register([name, Component]: [string, any]) {
  Handlebars.registerHelper(name, ({ hash, data, fn }: HelperOptions) => {
    const component = new Component(hash);
    /* eslint no-param-reassign: 0 */
    (data.root.__children = data.root.__children || []).push({
      component,
      embed(fragment: DocumentFragment) {
        const stub = fragment.querySelector(`#${name}`);

        if (!stub) {
          return;
        }

        component.getNode()?.append(...Array.from(stub.childNodes));

        stub.replaceWith(component.getNode());
      },
    });
    const contents = fn ? fn(this) : '';

    return `<div id="${name}">${contents}</div>`;
  });
}
