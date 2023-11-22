import { beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import Router from './Router';

describe('Router', () => {
  let router: Router;
  const root = document.querySelector('#root');
  class FakeComponent {
    constructor(props) { }

    getNode() {
      return document.createElement('div');
    }
  }

  beforeEach(() => {
    router = new Router(root);
  });

  it('new router instance should return the same instance', () => {
    const newRouter = new Router(root);
    expect(newRouter).to.eq(router);
  });

  it('should history length is 1 after init router', () => {
    router.start();
    expect(window.history.length).to.eq(1);
  });

  it('should get redirect', () => {
    router.redirect('', 'login');
    router.start();
    router.go('');
    expect(window.location.pathname).to.eq('/login');
  });

  it('should get use page', () => {
    const spy = sinon.spy(router, 'go');
    router.use('/page', FakeComponent);
    router.go('/page');
    expect(spy.calledOnceWith('/page')).to.be.true;
  });
});
