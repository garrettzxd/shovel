/**
 * get type of data
 *
 * @param source js variable
 * @return string
 *
 * @example
 *
 * getType('test');
 * // => string
 * */
const getType = (source) => {
  if (typeof source !== 'object') {
    return typeof source;
  }

  return {
    '[object object]': 'object',
    '[object array]': 'array',
    '[object date]': 'date',
    '[object error]': 'error',
    '[object regexp]': 'regexp',
  }[Object.prototype.toString.call(source).toLowerCase()];
};

export default getType;
