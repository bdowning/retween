import expect from 'expect';
import { createInterpolator, identity } from '../src/index';

describe('createInterpolator', () => {
  it('exposes the public API', () => {
    const interpolator = createInterpolator({ }, { });

    expect(interpolator).toBeA('function');
  });
});
