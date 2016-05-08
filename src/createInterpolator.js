import functionCacheId from './functionCacheId';

const interpolateFunctionCache = { };

function propRef(prop, arr) {
  return `${arr}[${JSON.stringify(prop)}]`;
}

function getInterpolateFunction(props, state, easing, cacheKey) {
  if (!interpolateFunctionCache[cacheKey]) {
    const code = [
      'return function interpolate (fromState, toState, position, outputState) {',
      'outputState = outputState || { };',
    ];

    const easingNames = [ ];
    const easingFuncs = [ ];

    for (let i = 0; i < props.length; ++i) {
      const prop = props[i];

      code.push(`${propRef(prop, 'outputState')} = `);
      code.push(`${propRef(prop, 'fromState')} + `);
      code.push(`(${propRef(prop, 'toState')} - ${propRef(prop, 'fromState')}) * `);
      code.push(`easing${i}(position);`);

      easingNames[i] = `easing${i}`;
      easingFuncs[i] = easing[prop];
    }

    code.push('return outputState;');
    code.push('};');

    interpolateFunctionCache[cacheKey] =
      new Function(...easingNames, code.join(''))(...easingFuncs);
  }
  return interpolateFunctionCache[cacheKey];
}

export default function createInterpolator(state, easing) {
  const props = Object.keys(state).sort();
  const sig = [ ];

  for (let prop of props) {
    if (typeof state[prop] !== 'number') {
      throw new Error(`Prototype state value ${prop} is not a number`);
    }
    if (typeof easing[prop] !== 'function') {
      if (!easing[prop]) {
        throw new Error(`Easing function for ${prop} is missing`);
      } else {
        throw new Error(`Easing function for ${prop} is not a function`);
      }
    }

    sig.push(prop + '!!!' + functionCacheId(easing[prop]));
  }

  const cacheKey = sig.join('!!!');

  return getInterpolateFunction(props, state, easing, cacheKey);
}
