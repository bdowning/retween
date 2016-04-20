import { identity } from './identity';

export function compose(...functions) {
  let ret = identity;
  for (let i = functions.length - 1; i >= 0; --i) {
    if (ret === identity) {
      ret = functions[i];
    } else if (functions[i] !== identity) {
      const boundRet = ret;
      ret = (x) => functions[i](boundRet(x));
    }
  }
  return ret;
}
