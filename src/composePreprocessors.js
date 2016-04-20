import identity from './identity';
import compose from './compose';
import identityPreprocessor from './preprocessors/identityPreprocessor';

export default function composePreprocessors(...preprocessors) {
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
        const combinedDecoder = compose(innerDecoder, outerDecoder);
        return [ outerState, outerEasing, combinedDecoder ];
      };
    }
    return composed;
  }
}
