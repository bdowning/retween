export function identity(x) {
  return x;
}

function interpolate(from, to, position) {
  return from + (to - from) * position;
}

export function createInterpolator(state, easing) {
  for (let prop in state) {
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
  }

  return (fromState, toState, position, outputState = { }) => {
    for (let prop in state) {
      outputState[prop] =
        interpolate(fromState[prop], toState[prop], easing[prop](position));
    }
    return outputState;
  };
}

export function identityPreprocessor(state, easing) {
  return [ state, easing, identity ];
}

export function composePreprocessors(...preprocessors) {
  if (preprocessors.length === 0) {
    return identityPreprocessor;
  } else {
    let composed = preprocessors[preprocessors.length - 1];
    for (let i = preprocessors.length - 2; i >= 0; --i) {
      const preprocessor = preprocessors[i];
      const boundComposed = composed;
      composed = (state, easing) => {
        const [ innerState, innerEasing, innerDecoder ] =
                boundComposed(state, easing);
        const [ outerState, outerEasing, outerDecoder ] =
                preprocessor(innerState, innerDecoder);
        const combinedDecoder = (outputState) => {
          return innerDecoder(outerDecoder(outputState));
        };
        return [ outerState, outerEasing, combinedDecoder ];
      };
    }
    return composed;
  }
}
