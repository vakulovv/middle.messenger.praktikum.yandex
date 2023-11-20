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

    const n = Math.floor(Math.random() * 10000);
    /* eslint no-param-reassign: 0 */
    (data.root.__children = data.root.__children || []).push({
      component,
      embed(fragment: DocumentFragment) {
        if (!fragment) return;
        const stub = fragment.querySelector(`#${name}__${n}`);

        if (!stub) {
          return;
        }

        component.getNode()?.append(...Array.from(stub.childNodes));
        //
        stub.replaceWith(component.getNode());
      },
    });
    const contents = fn ? fn(hash) : '';

    return `<div id="${name}__${n}">${contents}</div>`;
  });
}
