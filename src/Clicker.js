const Clicker = ({ amount, dispatch }) => (
  <div className="clicker">
    <h1>{Intl.NumberFormat().format(amount)}</h1>
    <button
      className="buy"
      type="button"
      onClick={() => dispatch({ type: 'click' })}
    >
      click button
    </button>
  </div>
);

export default Clicker;
