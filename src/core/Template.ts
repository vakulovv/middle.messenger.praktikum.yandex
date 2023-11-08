import Handlebars, { HelperOptions } from 'handlebars';

export function compile(template:string, props: object) {


  const children = [] as Array<any>;

  const data = {
    ...props,
    __children: children,
  };



  const pre = Handlebars.compile(template);
  const html = pre(data);

  console.log("pre", html)

  /* eslint no-underscore-dangle: 0 */
  return { html, children: data.__children };
}

export function register([name, Component]: [string, any]) {
  Handlebars.registerHelper(name, ({ hash, data, fn }: HelperOptions) => {
    const component = new Component(hash);

    console.log("component15", name, data)

    const n = Math.floor(Math.random() * 10000);
    /* eslint no-param-reassign: 0 */
    (data.root.__children = data.root.__children || []).push({
      component,
      embed(fragment: DocumentFragment) {

        if (!fragment) return;
        const stub = fragment.querySelector(`#${name}__${n}`);

        console.log("stub", name, stub, component.getNode())
        if (!stub) {
          return;
        }

        component.getNode()?.append(...Array.from(stub.childNodes));
        //
        stub.replaceWith(component.getNode());

      },
    });
    const contents = fn ? fn(hash) : '';

    console.log("contents_5", name, contents)


    return `<div id="${name}__${n}">${contents}</div>`;
  });
}
