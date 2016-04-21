import identity from '../identity';

const decodeFunctionCache = { };

function getDecodeFunction(propsInfo, cacheKey) {
  if (!decodeFunctionCache[cacheKey]) {
    const code = [ 'return function decode (state) { return {' ];

    for (let propInfo of propsInfo) {
      const { prop, parts, values } = propInfo;
      code.push(JSON.stringify(prop));
      code.push(':');
      for (let i = 0; i < parts.length; ++i) {
        if (i > 0) {
          code.push('+');
        }
        if (i % 2 === 1) {
          const value = values[(i - 1) / 2];
          code.push(`parseFloat(state[${JSON.stringify(value.name)}]).toFixed(${value.precision})`);
        } else {
          code.push(JSON.stringify(parts[i]));
        }
      }
      code.push(',');
    }
    code.push('}; };');

    decodeFunctionCache[cacheKey] = new Function(code.join(''))();
  }
  return decodeFunctionCache[cacheKey];
}

export default function createTokenPreprocessor(options = { }) {
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
        parts[i] = '!!!VAL!!!';
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

      const cacheKey = parts.join('');

      delete newState[prop];
      delete newEasing[prop];

      propsInfo.push({ prop, parts, values, cacheKey });
    }

    const cacheKey = propsInfo.map(x => x.cacheKey).join('!!!PROP!!!');

    const decoder = getDecodeFunction(propsInfo, cacheKey);

    return [ newState, newEasing, decoder ];
  };
}
