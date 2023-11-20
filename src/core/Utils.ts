type PlainObject<T = any> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
      && value !== null
      && value.constructor === Object
      && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        /* eslint  no-continue: 0 */
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

type Indexed<T = unknown> = {
    [key in string]: T;
};

function isString(value: unknown): value is string {
  return Object.prototype.toString.call(value) === '[object String]';
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (!isPlainObject(object)) {
    return object;
  }

  if (!isString(path)) {
    throw new Error('path must be string');
  }

  let current: Indexed = object as Indexed;

  const arr: Array<string> = path.split('.').reverse();

  while (arr.length > 0) {
    const key: string = arr.pop() as string;
    current[key] = current[key] as Indexed || {} as Indexed;

    if (arr.length === 0) {
      current[key] = value;
    } else {
      current = current[key] as any;
    }
  }

  return object;
}

function debounce(fn: (...args: Record<string, any>[]) => void, timeout: number = 300) {
  let timer:ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => { fn.apply(this, args); }, timeout);
  };
}

function formatTime(time: Date) {
  return new Date(time).toLocaleString();
}

export {
  isEqual, set, isArray, debounce, formatTime,
};
