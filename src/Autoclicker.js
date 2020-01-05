import React, { useMemo, useCallback } from 'react';

const Autoclicker = ({ tier, amount, cost, dispatch, enabled }) => {
  const buy = useCallback(() => dispatch({ type: 'increase', tier }), [tier, dispatch]);
  const sell = useCallback(() => dispatch({ type: 'decrease', tier }), [tier, dispatch]);

  return useMemo(() => (
    <div className="clicker">
      <div className="info">
        <h2>{`${amount} × ${tier}clicker`}</h2>
        <p>{`this ${tier}clicker buys and sells for ${cost}`}</p>
      </div>
      <button
        className={`buy ${enabled ? undefined : 'disabled'}`}
        type="button"
        onClick={buy}
      >
        {`buy ${tier}clicker`}
      </button>
      {
        amount > 0 && <button className="sell" type="button" onClick={sell}>-</button>
      }
    </div>
  ), [buy, sell, tier, amount, cost, enabled]);
};

export default Autoclicker;
