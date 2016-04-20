import { identity } from '../identity';

export function createTokenPreprocessor(options = { }) {
  options = Object.assign({
    defaultPrecision: 2
  }, options);

  return (state, easing) => {
    const props = Object.keys(state).filter(k => typeof state[k] === 'string');

    if (props.length === 0) {
      return [ state, easing, identity ];
    }

    const newState = Object.assign({ }, state);
    const newEasing = Object.assign({ }, easing);
    const propsInfo = [ ];

    for (let prop of props) {
      const parts = state[prop].split(/(-?\b(?:\d+(?:\.\d+|\.)?|\.\d+))/);
      const values = [ ];

      if (typeof easing[prop] === 'string' && easing[prop].match(/\s/)) {
        easing[prop] = easing[prop].split(/\s+/);
      }

      for (let i = 1; i < parts.length; i += 2) {
        values.push({
          value: parts[i],
          precision: options.defaultPrecision,
        });
      }

      for (let i = 0; i < values.length; ++i) {
        values[i].num = i;
        values[i].name = prop + '__' + i;
        newState[values[i].name] = parseFloat(values[i].value);

        if (easing[prop]) {
          if (Array.isArray(easing[prop])) {
            newEasing[values[i].name] = easing[prop][i];
          } else {
            newEasing[values[i].name] = easing[prop];
          }
        }
      }

      delete newState[prop];
      delete newEasing[prop];

      propsInfo.push({ prop, parts, values });
    }

    const decoder = (outputState) => {
      const inputState = Object.assign({ }, outputState);

      for (let propInfo of propsInfo) {
        const { prop, values } = propInfo;
        const parts = propInfo.parts.slice();

        for (let i = 0; i < values.length; ++i) {
          parts[i * 2 + 1] = outputState[values[i].name].toFixed(values[i].precision);
          delete inputState[values[i].name];
        }

        inputState[prop] = parts.join('');
      }

      return inputState;
    };

    return [ newState, newEasing, decoder ];
  };
}
