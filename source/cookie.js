import getType from './type';

/**
 * @param name{string} cookie name
 * @return string
 *
 * @example
 * getCookie('key')
 *
 * // => 'value'
 * */
const getCookie = (name) => {
  const encodeName = encodeURIComponent(name).replace(/[-.+*]/g, '\\$&');
  return decodeURIComponent(document.cookie.replace(new RegExp(`(?:(?:^|.*;)\\s*${encodeName}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1'));
};

/**
 * @param name{string} cookie name
 * @param value cookie value
 * @param expire 过期时间
 * @param path{string} 生效路径
 * @param domain{string} 生效域名
 * @param secure{boolean} 是否http only
 * @return boolean
 *
 * @example
 * setCookie({ name: 'test', value: 'smith' })
 * // => true
 * */
const setCookie = ({
  name, value, expire, path, domain, secure,
} = {}) => {
  // 非法name
  if (!name || /^(?:expires|max-age|path|domain|secure)$/i.test(name)) { return false; }

  let saveExpires = '';
  const infinityDate = 'Fri, 31 Dec 9999 23:59:59 GMT';
  if (expire) {
    switch (getType(expire)) {
      case 'number':
        saveExpires = expire === Infinity ? `;expires=${infinityDate}` : `;max-age=${expire}`;
        break;
      case 'string':
        saveExpires = `;expires=${expire}`;
        break;
      case 'date':
        saveExpires = `;expires=${expire.toUTCString()}`;
        break;
      default:
        saveExpires = expire === Infinity ? `;expires=${infinityDate}` : `;max-age=${expire}`;
    }
  }
  const saveDomain = domain ? `;domain=${domain}` : '';
  const savePath = path ? `;path=${path}` : '';
  const saveSecure = secure ? ';secure' : '';
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${saveExpires}${saveDomain}${savePath}${saveSecure}`;
  return true;
};

/**
 * is the specified value exists
 * @param name{string} cookie name
 *
 * @example
 * isHasCookie('test')
 *
 * // => false
 * */
const isHasCookie = (name) => {
  const nameRegExp = new RegExp(`(?:^|;\\s*)${encodeURIComponent(name).replace(/[-.+*]/g, '\\$&')}\\s*\\=`);
  return nameRegExp.test(document.cookie);
};

/**
 * remove specified cookie value
 * @param name{string}
 * @param domain{string}
 * @param path{string}
 * @return boolean
 *
 * @example
 * removeCookie('test')
 * // => true
 * */
const removeCookie = ({ name, domain, path } = {}) => {
  if (!name || !isHasCookie(name)) return false;

  const expireDate = 'Thu, 01 Jan 1970 00:00:00 GMT';
  const saveDomain = domain ? `;domain=${domain}` : '';
  const savePath = path ? `;path=${path}` : '';
  document.cookie = `${encodeURIComponent(name)}=;expires=${expireDate}${saveDomain}${savePath}`;
  return true;
};

export default {
  getCookie,
  setCookie,
  isHasCookie,
  removeCookie,
};
