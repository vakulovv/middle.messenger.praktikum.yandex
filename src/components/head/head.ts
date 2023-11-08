import Component from '../../core/Component';

interface IPropsHead {
  title: string
}

export default class Head extends Component {
  constructor(props: IPropsHead) {
    super({ componentName: 'Head', ...props });
  }

  render() {
    return (`
            <h1 class="header text-center">{{ title }}</h1>
        `);
  }
}
