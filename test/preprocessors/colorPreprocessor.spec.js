import expect from 'expect';
import { identity } from '../../src/index';
import createColorPreprocessor from '../../src/preprocessors/createColorPreprocessor';

describe('colorPreprocessor', () => {
  it('passes states with no strings through unchanged', () => {
    const colorPreprocessor = createColorPreprocessor();

    const state = { x: 1, y: 4 };
    const easing = { x: identity, y: identity };

    const [ outState, outEasing, decode ] = colorPreprocessor(state, easing);

    expect(outState).toBe(state);
    expect(outEasing).toBe(easing);
    expect(decode).toBe(identity);
  });

  it('passes states with no non-tweenable colors through unchanged', () => {
    const colorPreprocessor = createColorPreprocessor();

    const state = { x: 'translate(4em)', y: 'rgb(12%, 45%, 13%)' };
    const easing = { x: identity, y: identity };

    const [ outState, outEasing, decode ] = colorPreprocessor(state, easing);

    expect(outState).toBe(state);
    expect(outEasing).toBe(easing);
    expect(decode).toBe(identity);
  });

  it('converts CSS/CSS4 hex colors to rgb/rgba percentages', () => {
    const colorPreprocessor = createColorPreprocessor();

    const state = {
      x: '#379',
      y: '#4F2c',
      a: '#1a47c8',
      b: '#d6398B16',
    };
    const easing = { x: identity, y: identity };

    const [ outState, outEasing, decode ] = colorPreprocessor(state, easing);

    expect(outState).toEqual({
      x: 'rgb(20.00%, 46.67%, 60.00%)',
      y: 'rgba(26.67%, 100.00%, 13.33%, 0.800)',
      a: 'rgb(10.20%, 27.84%, 78.43%)',
      b: 'rgba(83.92%, 22.35%, 54.51%, 0.086)',
    });
    expect(outEasing).toBe(easing);
    expect(decode).toBe(identity);
  });

  it('does not convert hex colors with incorrect digits', () => {
    const colorPreprocessor = createColorPreprocessor();

    const state = {
      x: '#379',
      y: '#4F2c4',
      a: '#37g',
    };
    const easing = { x: identity, y: identity };

    const [ outState, outEasing, decode ] = colorPreprocessor(state, easing);

    expect(outState).toEqual({
      x: 'rgb(20.00%, 46.67%, 60.00%)',
      y: '#4F2c4',
      a: '#37g',
    });
    expect(outEasing).toBe(easing);
    expect(decode).toBe(identity);
  });

  it('converts rgb/rgba with integers to floats', () => {
    const colorPreprocessor = createColorPreprocessor();

    const state = {
      x: 'rgb(127, 45, 87)',
      y: 'rgba(34, 90, 245, 0.23)',
    };
    const easing = { x: identity, y: identity };

    const [ outState, outEasing, decode ] = colorPreprocessor(state, easing);

    expect(outState).toEqual({
      x: 'rgb(49.80%, 17.65%, 34.12%)',
      y: 'rgba(13.33%, 35.29%, 96.08%, 0.23)',
    });
    expect(outEasing).toBe(easing);
    expect(decode).toBe(identity);
  });
});
