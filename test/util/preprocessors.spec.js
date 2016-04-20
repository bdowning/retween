import expect from 'expect';
import { destringify, double } from './preprocessors';

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
