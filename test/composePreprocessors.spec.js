import expect from 'expect';
import { composePreprocessors,
         identity,
         identityPreprocessor }
  from '../src/index';
import { destringify, double } from './util/preprocessors';

describe('identityPreprocessor', () => {
  it('returns its arguments plus identity', () => {
    const state = { };
    const easing = { };
    const [ outState, outEasing, decoder ] =
            identityPreprocessor(state, easing);

    expect(outState).toBe(state);
    expect(outEasing).toBe(easing);
    expect(decoder).toBe(identity);
  });
});

describe('composePreprocessors', () => {
  it('exposes the public API', () => {
    const preprocessor = composePreprocessors(identityPreprocessor);
    
    expect(preprocessor).toBeA('function');
  });

  it('returns identityPreprocessor with no arguments', () => {
    const preprocessor = composePreprocessors();

    expect(preprocessor).toBe(identityPreprocessor);
  });

  it('returns a single argument unmodified', () => {
    const myPP = (...args) => [ ...args, identity ];
    const preprocessor = composePreprocessors(myPP);

    expect(preprocessor).toBe(myPP);
  });

  it('composes preprocessors right-to-left', () => {
    const state = {
      x: 1,
      y: 1,
      strX: '1',
      strY: '1',
    };

    const destringifyDouble = composePreprocessors(destringify, double);
    const doubleDestringify = composePreprocessors(double, destringify);

    const [ desDoubleState, desDoubleEasing, desDoubleDecoder ] =
            destringifyDouble(state, { });
    const [ doubleDesState, doubleDesEasing, doubleDesDecoder ] =
            doubleDestringify(state, { });

    expect(desDoubleState).toEqual({ x: 2, y: 2, strX: 1, strY: 1 });
    expect(desDoubleDecoder(desDoubleState)).toEqual(state);
    expect(doubleDesState).toEqual({ x: 2, y: 2, strX: 2, strY: 2 });
    expect(doubleDesDecoder(doubleDesState)).toEqual(state);

    expect(desDoubleDecoder(doubleDesState))
      .toEqual({ x: 1, y: 1, strX: '2', strY: '2' });
    expect(doubleDesDecoder(desDoubleState))
      .toEqual({ x: 1, y: 1, strX: '0.5', strY: '0.5' });
  });

  it('eliminates identity decoders from composed preprocessor', () => {
    const preprocessor = composePreprocessors(identityPreprocessor,
                                              identityPreprocessor,
                                              identityPreprocessor);

    const [ state, easing, decoder ] = preprocessor({ }, { });

    expect(decoder).toBe(identity);
  });
});
