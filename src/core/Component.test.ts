import { expect } from 'chai';
import sinon from 'sinon';
import { beforeEach, describe, it } from 'mocha';
import Component from './Component';

describe('Component', () => {
  let component: Component;

  beforeEach(() => {
    component = new Component({});
  });

  it('must set and store the props', () => {
    component.setProps({
      prop: 'prop',
    });

    const { state } = component.props;
    expect(state).to.have.property('prop', 'prop');
  });

  it('should update event on set props', () => {
    const spy = sinon.spy(component, '_componentDidMount');
    component.setProps({
      prop: 'new',
    });

    expect(spy.calledOnce).to.be.true;
  });
});
