import expect from 'expect';
import identity from '../src/identity';
import compose from '../src/compose';

const f = x => x + 'f';
const g = x => x + 'g';

describe('compose', () => {
  it('returns identity with no arguments', () => {
    expect(compose()).toBe(identity);
  });

  it('returns a single argument unmodified', () => {
    expect(compose(f)).toBe(f);
    expect(compose(g)).toBe(g);
  });

  it('composes functions right-to-left', () => {
    expect(compose(f, g)('x')).toBe(f(g('x')));
    expect(compose(g, f)('x')).toBe(g(f('x')));
  });

  it('throws out all identity functions', () => {
    expect(compose(identity, identity, f, identity, identity)).toBe(f);
    expect(compose(identity, identity, g, identity, identity)).toBe(g);
  });
});
