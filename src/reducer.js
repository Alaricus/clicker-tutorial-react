const initialState = {
  clicks: { amount: 0 },
  auto: { cost: 10, amount: 0 },
  double: { cost: 20, amount: 0 },
  mega: { cost: 100, amount: 0 },
  ultra: { cost: 1000, amount: 0 },
  monster: { cost: 10000, amount: 0 },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'click':
      return { ...state, clicks: { ...state.clicks, amount: state.clicks.amount + 1 } };
    case 'increase':
      return {
        ...state,
        [action.tier]: { ...state[action.tier], amount: state[action.tier].amount + 1 },
        clicks: { amount: state.clicks.amount - state[action.tier].cost },
      };
    case 'decrease':
      return {
        ...state,
        [action.tier]: { ...state[action.tier], amount: state[action.tier].amount - 1 },
        clicks: { amount: state.clicks.amount + state[action.tier].cost },
      };
    case 'update':
      return { ...state, clicks: { ...state.clicks, amount: action.payload } };
    default:
      throw new Error();
  }
};

export { reducer, initialState };