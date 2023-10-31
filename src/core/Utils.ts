function isObject(value: object): value is Record<string, any> {
    return Object.prototype.toString.call(value) === "[object Object]";
}
function isArray(value: object): value is [] {
    return Object.prototype.toString.call(value) === "[object Array]";
}

function isEqual(a: object, b: object): boolean {
    // Код здесь

    if ((!isObject(a) || !isObject(b)) ) {
        if ((!isArray(a) || !isArray(b)) ) {
            return a === b;
        }
    }

    const entriesLeft: [string, any][] = Object.entries(a);
    const entriesRight: [string, any][] = Object.entries(b);

    for (let [key, value] of entriesLeft) {
        if (!(key in b)) {
            return false;
        }

        const rightValue = b[key] as any;

        if (isObject(value) && isObject(rightValue)
            || isArray(value) && isArray(rightValue)) {
            if (!isEqual(value, rightValue)) {
                return false;
            }
        } else {
            if (value !== rightValue) {
                console.log("value", value, rightValue)
                return false;
            }
        }
    }

    for (let [key, value] of entriesRight) {
        if (!(key in a)) {
            return false;
        }
    }

    return true;
}

type Indexed<T = unknown> = {
    [key in string]: T;
};


function isString(value: unknown): value is string {
    return Object.prototype.toString.call(value) === "[object String]";
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {

    if (!isObject(object)) {
        return object;
    }

    if (!isString(path)) {
        throw new Error('path must be string')
    }

    let current: Indexed = object as Indexed;

    const arr: Array<string> = path.split(".").reverse();

    while (arr.length > 0) {
        const key: string  = arr.pop() as string;
        current[key] = current[key] as Indexed || {} as Indexed;

        if (arr.length === 0) {
            current[key] = value;
        } else {
            current = current[key] as any;
        }
    }

    return object;

}

export {isEqual, set};

