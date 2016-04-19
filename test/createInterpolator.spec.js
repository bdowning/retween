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
});
