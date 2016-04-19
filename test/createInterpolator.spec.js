import expect from 'expect';
import { createInterpolator, identity } from '../src/index';

describe('createInterpolator', () => {
  it('exposes the public API', () => {
    const interpolator = createInterpolator({ }, { });

    expect(interpolator).toBeA('function');
  });

  it('interpolates a single parameter', () => {
    const interpolator = createInterpolator({ x: 0 }, { x: identity });

    expect(interpolator({ x: 0 }, { x: 1 }, 0.5)).toEqual({ x: 0.5 });
  });

  it('destructively mutates outputState', () => {
    const interpolator = createInterpolator({ x: 0 }, { x: identity });
    const outputState = { };

    expect(interpolator({ x: 0 }, { x: 1 }, 0.5, outputState))
      .toEqual({ x: 0.5 })
      .toBe(outputState);
  });

  it('calls the easing function', () => {
    const easing = pos => Math.pow(pos, 2);
    const interpolator = createInterpolator({ x: 0 }, { x: easing });

    expect(interpolator({ x: 0 }, { x: 1 }, 0.5))
      .toEqual({ x: 0.25 });
  });

  it('fails with a missing easing function', () => {
    expect(() => createInterpolator({ x: 0 }, { y: identity }))
      .toThrow(/missing/);
  });

  it('fails with a non-function easing function', () => {
    expect(() => createInterpolator({ x: 0 }, { x: 'easing' }))
      .toThrow(/not a function/);
  });

  it('fails if the shape prototype has bad values', () => {
    expect(() => createInterpolator({ x: 'what' }, { x: identity }))
      .toThrow(/not a number/);
  });
});
