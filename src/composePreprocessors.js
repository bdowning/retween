import { identity } from './identity';

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
                preprocessor(innerState, innerEasing);
        const combinedDecoder = (outputState) => {
          return innerDecoder(outerDecoder(outputState));
        };
        return [ outerState, outerEasing, combinedDecoder ];
      };
    }
    return composed;
  }
}
