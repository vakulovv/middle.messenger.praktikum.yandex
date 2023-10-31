import Component from '../../../core/Component';
import template from './contacts.hbs?raw';
import { ContactsItem } from './contactsItem/index';
import { dataContacts as data } from './mocks';

export default class Contacts extends Component {
  constructor(props: Record<string, string | number>) {
    super({
      ...props,
      componentName: 'Contacts',
      contacts: data,
    }, {
      ContactsItem
    });
  }

  render() {
    return template;
  }
}
