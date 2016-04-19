shifty-core
===========

A functional take on the interpolation kernel of
[Shifty](https://github.com/jeremyckahn/shifty).  Ideally something
highly-performant that Shifty proper and/or
[Rekapi](https://github.com/jeremyckahn/rekapi) could use.  Optimized
for fast repeated execution of similarly-shaped interpolations.
Explicitly not optimized for end-user ease-of-use; it should generally
be wrapped with something else.

Functional inspiration taken from [Redux](https://github.com/reactjs/redux).

Design notes
------------

### Interpolators

```javascript
createInterpolator: (state, easing) => interpolator
```

Creates and returns an interpolator function for a state shaped like
`state` and using the easing functions in `easing`.  The `interpolator`
function has the signature:

```javascript
interpolator: (fromState, toState, position, outputState = {}) => outputState
```

`fromState` and `toState` must be objects with the same shape as the
`state` argument to `createInterpolator`, and all values being
`number`s.  `position` must be a number between `0.0` and `1.0`
inclusive.  The interpolated result is copied into the object provided
in `outputState` and returned.

### Preprocessors

A preprocessor is a function with the following signature:

```javascript
preprocessor: (inputState, inputEasing) => [outputState, outputEasing, decoder]
```

`inputState` is an object with zero or more properties, and
`inputEasing` is an object containing easing functions for properties
in `inputState`.  The preprocessor must return an `outputState` which
is "closer" to a state accepted by an `interpolator`, an
`outputEasing` for the `outputState`, and a `decoder` function which
will perform a reverse transformation on a state shaped like
`outputState` to produce a state shaped like `inputShape`.  The
preprocessor should pass properties it does not deal with through
verbatim.

The signature of `decoder` is:

```javascript
decoder: (outputState) => inputState
```

### Composing preprocessors

Preprocessors may be composed with the following function:

```javascript
composePreprocessors: (...preprocessors) => preprocessor
```

This will compose the preprocessors in the `...preprocessors`
arguments right-to-left, returning a new `preprocessor` which performs
the composed transformation.

Usage strawman
--------------

```javascript
import { createInterpolator, linear } from 'shifty-core';

const fromState = { x: 1.0, y: 3.0 };
const toState = { x: 4.0, y: 1.0 };
const easing = { x: linear, y: linear };

const interpolator = createInterpolator(toState, easing);

interpolator(fromState, toState, 0.5); // { x: 2.5, y: 2.0 }
// Works for any states shaped like toState:
interpolator({ x: 0, y: 0 }, { x: 1, y: 1 }, 0.25); // { x: 0.25, y: 0.25 }

import { tokenPreprocessor } from 'shifty-core-token-preprocessor';
const customEasing = (pos) -> Math.pow(pos, 2);

const [ tokenState, tokenEasing, tokenDecoder ] =
    tokenPreprocessor({ transform: 'translateX(10px) rotate(10deg)' },
                      { transform: [ linear, customEasing ] });
// tokenState ~= {
//     transform__0: 10,
//     transform__1: 10,
// }
// tokenEasing ~= {
//     transform__0: [Function linear],
//     transform__1: [Function customEasing],
// }

tokenDecoder({ transform__0: 2.3, transform__1: 57 });
    // 'translateX(2.3px) rotate(57deg)'

import { easingFunctions } from 'shifty-core-easing-functions';
import { createEasingPreprocessor } from 'shifty-core-easing-preprocessor';

const easingPreprocessor =
    createEeasingPreprocessor({ ...easingFunctions, customEasing });

const [ easedState, easedEasing, easedDecoder ]
    = easingPreprocessor(fromState, { x: 'customEasing', y: 'easeInOutSine' });
// easedState === fromState
// easedEasing ~= {
//     x: [Function customEasing],
//     y: [Function easeInOutSine],
// }
// easedDecoder === identity

import { composePreprocessors } from 'shifty-core';

const easedTokenPP =
    composePreprocessors(easingPreprocessor, tokenPreprocessor);

const [ easedTokenState, easedTokenEasing, easedTokenDecoder ] =
    easedTokenPP({ transform: 'translateX(10px) rotate(10deg)' },
                 { transform: [ 'linear', 'customEasing' ] });
// easedTokenState ~= {
//     transform__0: 10,
//     transform__1: 10,
// }
// easedTokenEasing ~= {
//     transform__0: [Function linear],
//     transform__1: [Function customEasing],
// }
// easedTokenDecoder === tokenDecoder
```

License
-------

MIT.
