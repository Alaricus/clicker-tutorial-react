import React, { useEffect, useRef, useReducer } from 'react';

import { reducer, initialState } from './reducer';
import Autoclicker from './Autoclicker';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const callback = useRef();

  useEffect(() => {
    callback.current = () => {
      const currentClics = state.clicks.amount;
      const totalCount = Object.keys(state)
        .reduce(
          (acc, cur, idx) => idx === 0
            ? acc
            : acc + state[cur].amount * (state[cur].cost * 0.1), currentClics,
        );

      dispatch({ type: 'update', payload: totalCount });
    };
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => callback.current(), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="game">
      <div className="clicker">
        <h1>{state.clicks.amount}</h1>
        <button type="button" onClick={() => dispatch({ type: 'click' })}>click button</button>
      </div>
      {
        Object.keys(state).map((tier, idx) => {
          if (idx === 0) { return null; }
          const { cost, amount } = state[tier];
          return (state.clicks.amount >= cost || amount > 0) && (
            <Autoclicker
              key={tier}
              tier={tier}
              amount={amount}
              enabled={state.clicks.amount >= cost}
              purchase={() => dispatch({ type: 'increase', tier })}
            />
          );
        })
      }
    </div>
  );
};

export default App;
