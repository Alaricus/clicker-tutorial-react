import React from 'react';

const Autoclicker = ({ tier, amount, purchase, enabled }) => (
  <div className="clicker">
    <h2>{`${amount} × ${tier}clicker`}</h2>
    <button
      className={enabled ? undefined : 'disabled'}
      type="button"
      onClick={purchase}
    >
      {`buy ${tier}clicker`}
    </button>
  </div>
);

export default Autoclicker;
