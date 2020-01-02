import React from 'react';

const Autoclicker = ({ type, amount, purchase, enabled }) => (
  <div className="clicker">
    <h2>{`${amount} × ${type}clicker`}</h2>
    <button
      className={enabled ? undefined : 'disabled'}
      type="button"
      onClick={purchase}
    >
      {`buy ${type}clicker`}
    </button>
  </div>
);

export default Autoclicker;
