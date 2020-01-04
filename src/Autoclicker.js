import React from 'react';

const Autoclicker = ({ tier, amount, cost, buy, sell, enabled }) => (
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
);

export default Autoclicker;
