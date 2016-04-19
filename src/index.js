export function identity(x) {
  return x;
}

function interpolate(from, to, position) {
  return from + (to - from) * position;
}

export function createInterpolator(state, easing) {
  return (fromState, toState, position, outputState = { }) => {
    for (let prop in state) {
      outputState[prop] = interpolate(fromState[prop], toState[prop], position);
    }
    return outputState;
  };
}
