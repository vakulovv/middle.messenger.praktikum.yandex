import Component from '../../../core/Component';

class ErrorPage extends Component {
  constructor(props: Record<string, unknown>) {
    super({ componentName: 'ErrorPage', ...props });
  }

  render() {
    return `<div class="container main__full main__vcenter">
            <div class="row row_center">
                <div class="text-center">
                    <h1 class="error">{{code}}</h1>
                        <p>{{text}}</p>
                    <button class="btn btn_md btn_plain">Назад к чатам</button>
                </div>
            </div>
        </div>`;
  }
}

export default ErrorPage;
