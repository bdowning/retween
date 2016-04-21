import functionCacheId from './functionCacheId';

export default function cachePreprocessor(preprocessor) {
  const cache = { };
  return (state, easing) => {
    const props = Object.keys(state).sort();
    const sig = props.map(p => `${p}!!!${JSON.stringify(state[p])}!!!${typeof easing[p] === 'function' ? functionCacheId(easing[p]) : JSON.stringify(easing[p])}`);
    const cacheKey = sig.join('!!!');
    if (!cache[cacheKey]) {
      cache[cacheKey] = preprocessor(state, easing);
    }
    return cache[cacheKey];
  };
}
