import identity from '../identity';

export default function identityPreprocessor(state, easing) {
  return [ state, easing, identity ];
}
