import { memo } from 'react';

const Autoclicker = memo(({ tier, amount, cost, dispatch, enabled }) => {
  const buy = () => dispatch({ type: 'increase', tier });
  const sell = () => dispatch({ type: 'decrease', tier });

  return (
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
});

export default Autoclicker;
