import expect from 'expect';
import { identity } from '../../src/index';
import { createTokenPreprocessor } from '../../src/preprocessors/tokenPreprocessor';

describe('tokenPreprocessor', () => {
  it('passes non-string parameters through unchanged', () => {
    const tokenPreprocessor = createTokenPreprocessor();

    const state = { x: 1, y: 4 };
    const easing = { x: identity, y: identity };

    const [ outState, outEasing, decode ] = tokenPreprocessor(state, easing);

    expect(outState).toBe(state);
    expect(outEasing).toBe(easing);
    expect(decode).toBe(identity);
  });

  it('preprocesses and decodes simple stringified numbers', () => {
    const tokenPreprocessor = createTokenPreprocessor();

    const [ outState, outEasing, decode ] =
            tokenPreprocessor({ x: '1', y: '4' }, { x: identity, y: identity });

    expect(outState).toEqual({ x__0: 1, y__0: 4 });
    expect(outEasing).toEqual({ x__0: identity, y__0: identity });
    expect(decode({ x__0: 3, y__0: 2 })).toEqual({ x: '3.00', y: '2.00' });
  });

  it('preprocesses and decodes complex strings', () => {
    const tokenPreprocessor = createTokenPreprocessor();

    const [ outState, outEasing, decode ] =
            tokenPreprocessor({ x: 'transformX(1px) rotate(5deg) scale(0.27)' }, { x: identity });

    expect(outState).toEqual({ x__0: 1, x__1: 5, x__2: 0.27 });
    expect(outEasing).toEqual({ x__0: identity, x__1: identity, x__2: identity });
    expect(decode({ x__0: 3, x__1: 2, x__2: 1 }))
      .toEqual({ x: 'transformX(3.00px) rotate(2.00deg) scale(1.00)' });
  });

  it('allows multiple easings for a single value', () => {
    const customEasing = x => x;
    const tokenPreprocessor = createTokenPreprocessor();

    const [ outState, outEasing, decode ] =
            tokenPreprocessor({ x: 'transformX(1px) rotate(5deg) scale(0.27)' },
                              { x: [ customEasing, identity, customEasing ] });

    expect(outEasing).toEqual({ x__0: customEasing, x__1: identity, x__2: customEasing });
  });

  it('allows multiple easings as a space-separated string', () => {
    const customEasing = x => x;
    const tokenPreprocessor = createTokenPreprocessor();

    const [ outState, outEasing, decode ] =
            tokenPreprocessor({ x: 'transformX(1px) rotate(5deg) scale(0.27)' },
                              { x: 'customEasing identity customEasing' });

    expect(outEasing).toEqual({ x__0: 'customEasing', x__1: 'identity', x__2: 'customEasing' });
  });

  it('does not barf on mid-symbol numbers', () => {
    const tokenPreprocessor = createTokenPreprocessor();

    const [ outState, outEasing, decode ] =
            tokenPreprocessor({ x: 'transform3d(1px)' }, { x: [ identity ] });

    expect(outState).toEqual({ x__0: 1 });
    expect(outEasing).toEqual({ x__0: identity });
    expect(decode({ x__0: 3 }))
      .toEqual({ x: 'transform3d(3.00px)' });
  });

  it('handles negative numbers', () => {
    const tokenPreprocessor = createTokenPreprocessor();

    const [ outState, outEasing, decode ] =
            tokenPreprocessor({ x: 'transform3d(-2.54px)' }, { x: [ identity ] });

    expect(outState).toEqual({ x__0: -2.54 });
    expect(outEasing).toEqual({ x__0: identity });
    expect(decode({ x__0: 3 }))
      .toEqual({ x: 'transform3d(3.00px)' });
  });
});
