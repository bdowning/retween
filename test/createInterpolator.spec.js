import { expect } from 'chai';
import { createInterpolator, identity } from '../src/index';

describe('createInterpolator', () => {
  it('exposes the public API', () => {
    const interpolator = createInterpolator({ }, { });

    expect(interpolator).to.be.a('function');
  });
});
