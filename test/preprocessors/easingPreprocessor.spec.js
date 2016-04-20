import expect from 'expect';
import { identity } from '../../src/index';
import createEasingPreprocessor from '../../src/preprocessors/createEasingPreprocessor';

const customEasing = x => Math.pow(x, 2);

const easingMap = {
  identity: identity,
  customEasing: customEasing,
};

describe('easingPreprocessor', () => {
  it('passes easings with no strings through unchanged', () => {
    const easingPreprocessor = createEasingPreprocessor(easingMap);

    const state = { x: 1, y: 4 };
    const easing = { x: identity, y: identity };

    const [ outState, outEasing, decode ] = easingPreprocessor(state, easing);

    expect(outState).toBe(outState);
    expect(outEasing).toBe(outEasing);
    expect(decode).toBe(identity);
  });

  it('replaces easing strings with functions from easingMap', () => {
    const easingPreprocessor = createEasingPreprocessor(easingMap);

    const state = { x: 1, y: 4 };
    const easing = { x: 'identity', y: 'customEasing' };

    const [ outState, outEasing, decode ] = easingPreprocessor(state, easing);

    expect(outState).toBe(outState);
    expect(outEasing).toEqual({ x: identity, y: customEasing });
    expect(decode).toBe(identity);
  });

  it('will not replace easing strings with names not in easingMap', () => {
    const easingPreprocessor = createEasingPreprocessor(easingMap);

    const state = { x: 1, y: 4 };
    const easing = { x: 'identity', y: 'otherEasing' };

    const [ outState, outEasing, decode ] = easingPreprocessor(state, easing);

    expect(outState).toBe(outState);
    expect(outEasing).toEqual({ x: identity, y: 'otherEasing' });
    expect(decode).toBe(identity);
  });
});
