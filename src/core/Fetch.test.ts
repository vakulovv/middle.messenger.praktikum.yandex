import { beforeEach, describe, it } from 'mocha';
import sinon, { createSandbox } from 'sinon';
import { expect } from 'chai';
import HTTPTransport, { queryStringify } from './Fetch';

describe('Fetch', () => {
  function fakeFormData() {
    return {
      login: 'test',
      password: 'test',
    };
  }

  let http;
  let request;
  const timeout = 5000;
  const sandbox = createSandbox();

  beforeEach(() => {
    http = new HTTPTransport();
    request = sandbox.stub(http, 'request').callsFake(() => Promise.resolve() as Promise<any>);
  });

  it('should convert query string', () => {
    const str = '?login=test&password=test';
    const data = fakeFormData();
    expect(queryStringify(data)).to.equal(str);
  });

  it('should get method', async () => {
    const data = { hello: 'world' };

    // myapi.post(data, function() { });

    const headers = { 'Content-Type': 'application/json' };

    await http.post('https://ya-praktikum.tech/api/v2/test', { data, headers, timeout });

    expect(request.args[0]).to.be.deep.equal([
      'https://ya-praktikum.tech/api/v2/test',
      {
        data, timeout, headers, method: 'POST',
      },
      timeout]);

    //
    // const requestStub = sinon.stub(http, 'request').resolves()
    //
    // await http.get(`https://ya-praktikum.tech/api/v2/test`)
    //
    // expect(
    //     requestStub.calledWithMatch(
    //         'https://ya-praktikum.tech/api/v2/test',
    //         { method: 'GET' }
    //     )
    // ).to.be.true
  });

  // it('should GET', async () => {
  //     const response = await Fetch.get({server:serverUrl, path:'/1'});
  //     const responseObject = JSON.parse(response.response);
  //     expect(responseObject['id']).toBe(1);
  // });
  //
  // it('POST запрос', async () => {
  //     const response = await Fetch.post({server:serverUrl, data:data}) as XMLHttpRequest;
  //     const responseObject = JSON.parse(response.response);
  //     expect(responseObject['login']).toBe(data.login);
  // });
  //
  // it('GET method', () => {
  //     const http = new HTTPTransport('/user');
  //
  //     http.get('/getUser');
  //
  //     expect(open.callCount).to.eq(1);
  //     expect(send.callCount).to.eq(1);
  //
  //     expect(open.firstArg).to.eq('GET');
  //     expect(open.lastArg).to.eq('https://ya-praktikum.tech/api/v2/user/getUser');
  // });
});
