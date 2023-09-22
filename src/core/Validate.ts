const VALID_EMAIL = 'validEmail';
const VALID_PASSWORD = 'validPassword';
const VALID_LOGIN = 'validLogin';
const VALID_PHONE = 'validPhone';
const VALID_NAME = 'validName';
const REQUIRED = 'required';
const MIN_LENGTH = 'minLength';
const MAX_LENGTH = 'maxLength';

const errors = {
  default: 'Проверьте правильность поля',
};

const rules: Record<string, Record<string, any>> = {
  email: {
    [VALID_EMAIL]: true,
    [REQUIRED]: true,
    [MIN_LENGTH]: 8,
    [MAX_LENGTH]: 40,
  },

  login: {
    [MIN_LENGTH]: 3,
    [MAX_LENGTH]: 20,
    [VALID_LOGIN]: true,
  },

  password: {
    [VALID_PASSWORD]: true,
    [MIN_LENGTH]: 8,
    [MAX_LENGTH]: 40,
  },
  phone: {
    [VALID_PHONE]: true,
    [MIN_LENGTH]: 8,
    [MAX_LENGTH]: 20,
  },
  message: {
    [REQUIRED]: true,
  },
  first_name: {
    [VALID_NAME]: true,
  },
  second_name: {
    [VALID_NAME]: true,
  },
};

type ICheck =(value: string, length?: number) => boolean;

const validateField: Record<string, ICheck> = {
  [VALID_EMAIL]: (value) => !!value.match(/^[A-Z0-9._-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i),
  [VALID_PASSWORD]: (value) => !!value.match(/^(?=.*[A-Z])(?=.*\d).+$/),
  [VALID_LOGIN]: (value) => !!value.match(/^(?!\d+$)[a-zA-Z0-9_-]+$/),
  [VALID_PHONE]: (value) => !!value.match(/^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/),
  [VALID_NAME]: (value) => !!value.match(/^([A-ZА-ЯЁ])[a-zA-Zа-яёА-ЯЁ-]+$/),
  [MIN_LENGTH]: (value, length) => (length ? value.length >= length : true),
  [MAX_LENGTH]: (value, length) => (length ? value.length <= length : true),
  // [REQUIRED]: (value) => value,
};
// type Fields = Array<Record<string, string | number>>;

const formValidate = (fields: Record<string, any>) : Record<string, any> => {
  if (Object.keys(fields).length === 0) {
    return {};
  }

  return Object.entries(fields)
    .reduce((acc: Record<string, any>, [key, valueField] : [string, string]) => {
      if (!rules[key]) {
        return acc;
      }
      const validates = rules[key];
      /* eslint-disable-next-line */
    for (const [rule, valueRule] of Object.entries(validates)) {
        if (valueRule === undefined || valueRule === null || valueRule === false) {
          return acc;
        }
        const fn = validateField[rule];

        if (fn && typeof fn === 'function') {
          const isValid = fn(valueField, valueRule);

          if (!isValid) {
            acc[key] = errors.default;
            break;
          }
        }
      }
      return acc;
    }, {});
};

export default formValidate;
