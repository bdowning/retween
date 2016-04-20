import { identity } from '../identity';

export function createEasingPreprocessor(easingsMap) {
  return (state, easing) => {
    const props = Object.keys(easing).filter(el => typeof easing[el] === 'string');

    if (props.length === 0) {
      return [ state, easing, identity ];
    }

    const newEasing = Object.assign({ }, easing);
    for (let prop of props) {
      if (easingsMap[easing[prop]]) {
        newEasing[prop] = easingsMap[easing[prop]];
      }
    }

    return [ state, newEasing, identity ];
  };
}
