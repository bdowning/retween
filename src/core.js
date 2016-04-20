import './polyfill';

import identity from './identity';
import compose from './compose';
import createInterpolator from './createInterpolator';
import composePreprocessors from './composePreprocessors';
import identityPreprocessor from './preprocessors/identityPreprocessor';

export {
  identity,
  compose,
  createInterpolator,
  composePreprocessors,
  identityPreprocessor,
};
