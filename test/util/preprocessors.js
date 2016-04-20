export function destringify(state, easing) {
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

export function double(state, easing) {
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
