import React, { useState, useEffect, useRef } from 'react';

import Autoclicker from './Autoclicker';

const App = () => {
  const [clicks, setClicks] = useState(0);
  const [autoclickers, setAutoclickers] = useState(0);
  const [doubleclickers, setDoubleclickers] = useState(0);
  const [megaclickers, setMegaclickers] = useState(0);
  const [ultraclickers, setUltraclickers] = useState(0);
  const [monsterclickers, setMonsterclickers] = useState(0);
  const callback = useRef();

  const clickerTypes = {
    auto: { cost: 10, amount: autoclickers, set: setAutoclickers },
    double: { cost: 20, amount: doubleclickers, set: setDoubleclickers },
    mega: { cost: 100, amount: megaclickers, set: setMegaclickers },
    ultra: { cost: 1000, amount: ultraclickers, set: setUltraclickers },
    monster: { cost: 10000, amount: monsterclickers, set: setMonsterclickers },
  };

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  const buyClicker = type => {
    const { cost, amount, set } = clickerTypes[type];
    if (clicks >= cost) {
      setClicks(clicks - cost);
      set(amount + 1);
    }
  };

  useEffect(() => {
    callback.current = () => {
      const tallyAll = Object.keys(clickerTypes).reduce(
        (acc, cur) => acc + clickerTypes[cur].amount * (clickerTypes[cur].cost * 0.1),
        clicks,
      );

      setClicks(tallyAll);
    };
  }, [clicks, clickerTypes]);

  useEffect(() => {
    const interval = setInterval(() => callback.current(), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="game">
      <div className="clicker">
        <h1>{clicks}</h1>
        <button type="button" onClick={handleClick}>click button</button>
      </div>
      {
        Object.keys(clickerTypes).map(type => {
          const { cost, amount } = clickerTypes[type];
          return (clicks >= cost || amount > 0) && (
            <Autoclicker
              key={type}
              type={type}
              amount={amount}
              enabled={clicks >= cost}
              purchase={() => buyClicker(type)}
            />
          );
        })
      }
    </div>
  );
};

export default App;
