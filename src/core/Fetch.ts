const enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
export function queryStringify(data: Record<string, string>): string {
  // Можно делать трансформацию GET-параметров в отдельной функции
  return `?${Object.keys(data).map((key) => `${key}=${data[key]}`).join('&')}`;
}

/*  no-unused-vars */
class HTTPTransport {
  get = (url: string, options: Record<string, any> = {}) => this.request(
    url,
    { ...options, method: METHODS.GET },
    options.timeout,
  );

  put = (url: string, options: Record<string, any> = {}) => this.request(
    url,
    { ...options, method: METHODS.PUT },
    options.timeout,
  );

  post = (url: string, options: Record<string, any> = {}) => this.request(
    url,
    { ...options, method: METHODS.POST },
    options.timeout,
  );

  delete = (url: string, options: Record<string, any> = {}) => this.request(
    url,
    { ...options, method: METHODS.DELETE },
    options.timeout,
  );

  /* eslint class-methods-use-this: 0 */
  request = (url: string, options: Record<string, any> = {}, timeout = 5000) => {
    const {
      method = '', headers = {}, data, withCredentials,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      let link = url || '';

      if (method === METHODS.GET && data) {
        link += queryStringify(data);
      }

      xhr.open(method, link);

      // Установка заголовков
      if (headers && Object.keys(headers).length > 0) {
        Object.keys(headers).forEach((header) => {
          xhr.setRequestHeader(header, headers[header]);
        });
      }

      if (withCredentials) {
        xhr.withCredentials = true;
      }

      xhr.timeout = timeout;

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.ontimeout = () => {
        reject(new Error());
      };

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (headers['Content-Type'] === 'application/json') {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  };
}

export default HTTPTransport;
