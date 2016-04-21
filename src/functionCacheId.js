let nextId = 1;

export default function functionCacheId(func) {
  if (!func.__retweenCacheId) {
    func.__retweenCacheId = `__id_${nextId++}`;
  }
  return func.__retweenCacheId;
}
