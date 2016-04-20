function interpolate(from, to, position) {
  return from + (to - from) * position;
}

export function createInterpolator(state, easing) {
  for (let prop in state) {
    if (typeof state[prop] !== 'number') {
      throw new Error(`Prototype state value ${prop} is not a number`);
    }
    if (typeof easing[prop] !== 'function') {
      if (!easing[prop]) {
        throw new Error(`Easing function for ${prop} is missing`);
      } else {
        throw new Error(`Easing function for ${prop} is not a function`);
      }
    }
  }

  return (fromState, toState, position, outputState = { }) => {
    for (let prop in state) {
      outputState[prop] =
        interpolate(fromState[prop], toState[prop], easing[prop](position));
    }
    return outputState;
  };
}
