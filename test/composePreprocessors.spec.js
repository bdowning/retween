import expect from 'expect';
import { composePreprocessors,
         identity,
         identityPreprocessor }
  from '../src/index';

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

  const destringify = (state, easing) => {
    const params = Object.keys(state).filter(k => typeof state[k] === 'string');
    const newState = Object.assign({}, state);
    for (let param of params) {
      newState[param] = parseFloat(state[param]);
    }
    const decoder = (outputState) => {
      const inputState = Object.assign({}, outputState);
      for (let param of params) {
        inputState[param] = outputState[param].toString();
      }
      return inputState;
    };
    return [ newState, easing, decoder ];
  };

  const double = (state, easing) => {
    const params = Object.keys(state).filter(k => typeof state[k] === 'number');
    const newState = Object.assign({}, state);
    for (let param of params) {
      newState[param] = state[param] * 2;
    }
    const decoder = (outputState) => {
      const inputState = Object.assign({}, outputState);
      for (let param of params) {
        inputState[param] = outputState[param] / 2;
      }
      return inputState;
    };
    return [ newState, easing, decoder ];
  };

  describe('test preprocessors', () => {
    it('destringify works', () => {
      const inState = {
        x: 0,
        y: 0,
        strX: '0',
        strY: '0',
      };
      const [ state, easing, decoder ] = destringify(inState, { });

      expect(state).toEqual({ x: 0, y: 0, strX: 0, strY: 0 });
      expect(decoder(state)).toEqual(inState);
      expect(decoder(state)).toNotBe(inState);

      expect(decoder({ x: '0', y: '0', strX: 4, strY: 12 }))
        .toEqual({ x: '0', y: '0', strX: '4', strY: '12' });
    });

    it('double works', () => {
      const inState = {
        x: 1,
        y: 1,
        strX: '1',
        strY: '1',
      };
      const [ state, easing, decoder ] = double(inState, { });

      expect(state).toEqual({ x: 2, y: 2, strX: '1', strY: '1' });
      expect(decoder(state)).toEqual(inState);
      expect(decoder(state)).toNotBe(inState);

      expect(decoder({ x: 12, y: 6, strX: 4, strY: 2 }))
        .toEqual({ x: 6, y: 3, strX: 4, strY: 2 });
    });
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
});
