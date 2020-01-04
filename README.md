# clicker-tutorial

This is a very short and simple example of how to write an incrimental/idle (clicker) game.

## Some assumptions

In order to keep the code as simple as possible, the following rules and assumptions are established:

### Game Rules

* Each autoclicker always costs 10 times more than the amount it earns per tick.
* The period between ticks is always 1 second long.
* The tick is per app, not per each individual autoclicker, so all the earnings from autoclickers are tallied up at the same time, regardless of when each autoclicker was purchased.
* There are only 5 levels of autoclickers.
* There is no endgame of any kind.

### Tech

* This is written in React using hooks.
* Since there is a single child component, relevant data is being passed as props. If the complexity of the app should increase to include many more components including nested ones, it would make sense to use `Context` with `useContext` hook, or a store such as Redux.
* Only vanilla CSS is used.

## Development

Install dependencies and run project

```
yarn
yarn start
```

or

```
npm i
npm start
```