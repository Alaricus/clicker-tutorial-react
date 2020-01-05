
# Clicker Game Tutorial

## The Introduction

Let’s say you get inspired by Cookie Clicker and decide to make your own game. Yea, this sort of stuff happens, believe it or not; it happened to me. In this article I’ll talk about the basics of building such a game and go over a relatively simple example of what a game like this might look like.

In order to benefit the most from the code we will be looking over later in the article, it would be helpful if you were at least somewhat familiar with the following:

1. JavaScript (we’ll be using ES2015 aka ES6 syntax)
2. React (we’ll be using version 16.12, which includes hooks)

While I will not go into great detail on everything, don’t worry, I will try to include as many relevant links as possible so that those who are new to this can have some reference material. Should you happen to come across a section that is unclear, there will be a link to bring you up to speed. If not, please let me know.

### To start locally

Install dependencies and run the project:

```
yarn
yarn start
```

or

```
npm i
npm start
```

## The Plan

We can begin by outlining the idea of what we want to end up with. Since this is just a tutorial, we want to build a clicker game that:

1. Allows a user to click a button to increment a counter
2. Allows a user to buy autoclickers in increment a counter automatically
3. Has several levels of autoclickers, each progressively more expensive and powerful

We will inevitably find ourselves adding new features as we go, but it’s still good to have a list of the features that are absolutely required. For those curious to see the end result before diving in, here is a [working example](https://alaricus.github.io/clicker-tutorial/) of the game we are going to build. Here is the [source code](https://github.com/Alaricus/clicker-tutorial). The rest of the article will be an explanation of technical decisions that took us from a plan to the finished product.

## The Execution

To begin we’ll use [create-react-app](https://github.com/facebook/create-react-app) to create a blank React application.

### The State
Our first order of business is to design a state variable, which will hold all of that data for us. This data should include a counter that increments when we click a button. Once we get to a high enough number of clicks, we will be able to spend them to buy autoclickers. Each autoclicker will, therefore, have a cost associated with it as well as the amount.

Let’s store all this data in an object like this:

```
const initialState = {
  clicks: { amount: 0 },
  auto: { cost: 10, amount: 0 },
};
```

Now, in order for our React component to be able to interact with this object we need to use a [useReducer()](https://reactjs.org/docs/hooks-reference.html#usereducer) hook. Although we could have broken the object up into individual variables and used a bunch of [useState()](https://reactjs.org/docs/hooks-reference.html#usestate) hooks, it wouldn’t scale very well if we were to increase the number of autoclickers. So let’s do something like this:

```
import { reducer, initialState } from './reducer';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
```

As you can see we are importing our `initialState` as well as a `reducer` function from another file. This is just to decrease clutter. The `reducer` itself is a function that takes the current state and an action object, and then performs an operation (which is specified inside that action object) on the state. It is invoked by dispatching an action. The `dispatch` function is something that is returned (along with the state itself) by the `useReducer` hook.

Our reducer will do the following for us:

1. Given the `click` action it will simply increment the amount of clicks. So that `clicks: { amount: 0 }` becomes `clicks: { amount: 1 }`. The action object that triggers this only needs to contain a `type`, so it would look like this: `{ type: 'click' }` and would be dispatched like this: `dispatch({ type: 'click' }`.
2. Given the `increase` action, it will increase the amount property of a given autoclicker and also decrease the amount of clicks by the cost of that particular autoclicker. The action object will, therefore, need to contain an action, and a tier. (Tier is just the name of a specific autoclicker we are addressing.) This action would look like this: `{ type: 'increase', tier: 'mega' }`.
3. Given the `update` action, it would update the amount of clicks with a tally of what all of the autoclickers had produced during a given cycle. This tally will be performed elsewhere, so we’ll just be passing a single number as the payload. Of course, if we have no atuoclickers and nothing was produced, we don’t need to update anything and can return the existing state. The action object would look like this: `{ type: 'update', payload: 10 }`

Ok, now that we are done with the state management, let’s move on to our core game loop.

### The Loop

Our autoclicker is just a function that increments our counter by a certain amount at particular intervals. For the sake of clarity let’s agree that all of our autoclickers will perform their work once per second. This means we require a game loop which will fire off our autoclickers once per second.

The following two paragraphs are the most complicated part of the entire app. Don’t beat yourself up if the reasoning isn’t very clear to you at first. Should you still require help after reading this bit a few times, here is a [detailed article](https://overreacted.io/making-setinterval-declarative-with-react-hooks/) on the topic.

In order to create such a loop we are going to use [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval). The problem is, `setInterval` doesn’t really like to play nicely with React hooks. In order to make it work we’ll need to create a callback function, which will execute on each iteration of `setInterval`. Since this function will depend on the current state to tally up all the clicks, it will need to be created anew on each iteration. This could cause an infinite render loop. To avoid that we’ll use the [useRef()](https://reactjs.org/docs/hooks-reference.html#useref) hook to hold the current version of the callback and then a [useEffect()](https://reactjs.org/docs/hooks-reference.html#useeffect) hook to update it whenever the state changes.

Another `useEffect` will fire only once and run our `setInterval`. It will actually be dependent on the `callback`, but since that is a `ref` variable (remember that we used a `useRef` hook to hold it) it will execute just a single time — when the app is first starting.

Take a breather, the hard part is over and we are almost done.

### The Components

All that’s left is displaying this on screen. Let’s create two new components. One for the clicker, and one for all of our autoclickers.

The `Clicker` component is dead simple. It will take two props, the `amount`, which will be used to display the current total of all the clicks we’ve accumulated, and the `dispatch`, which will be used to dispatch the clicking action we talked about above. The component itself will contain just an `<h1>` tag and a `<button>`. Clicking the button will fire off the dispatch. That’s it.

The `Autoclicker` component is more complicated, but only marginally so. Since we’ll be using the same component for a variety of different autoclickers, it will need to be able to display a given autoclicker tier (its name) and amount, as well as dispatch the buy function. To achieve this we’ll be passing it the following props: `tier`, `amount`, `dispatch`, and `enabled`.

Wait, what’s `enabled`? We didn’t talk about it, right?

`enabled` is a property that we’ll need in order to establish whether the button should be active or not. After all we don’t want to confuse the user by making it look like they can click the ‘buy’ button when they don’t have enough clicks to make the purchase. We’ll perform this calculation before rendering the `Autoclicker` and send the Boolean value to the component so it knows how to render correctly.

Before we finish with the `Autoclicker` let’s take a look at how we are rendering it inside of the `return` of our `App` component.

Since we have a bunch of different autoclickers sitting inside our state, we need to render each of them, and what better way to do than that to use an Array method [.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). Except we don’t have an array, we have an object. We could change our `state` to be an array, but that will create an issue, since we won’t be able to call up its elements by name and will be forced to search for them each time. That’s inefficient. Instead let’s create an array of object properties by using [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) and then `.map()` over those.

The first key will be the `clicks` property, which we’ll want to skip, since it’s not an autoclicker. We can do that by checking for the index of the array, and returning null if the index is 0. (Another potential solution would be to change our state object to contain all the autoclickers in a separate key, like this: `{ clicks: { … }, autoclickers, { … } }` and just address the contents of the `autoclickers` key. Maybe you can try rewriting the app in that way and then sharing the benefits and drawbacks of that solution.

Now that we are done with the components, let’s come back to our `App` component and see if there’s anything we still have to go over.

### The Rest
It looks like we only have one bit of code left. It’s the `totalCount` function which tallies up all of the clicks that the autoclickers produce each turn. We are using `Object.keys()` once again, and then another array method called [.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) to iterate through all the autoclickers’ amounts and return a single value. We then dispatch this value as a part of the `update` dispatch as we discussed earlier.

That’s it. We have a functional clicker game. It isn’t any fun, but it works and now we have something that we can use as a base for various gameplay experiments.

## THE BONUS:

If you already tried playing the game or looked at the source code you may have noticed that we can also sell autoclickers. This is achieved in exactly the same way as buying. We added a ‘decrease’ action to the `reducer` function, as well as the sell button and a `sell` function to `Autoclicker` component.

Another extra feature is an improvement to the efficiency of our app. Since the game re-renders every second due to the `state` being changed on each iteration of `setInterval` as well as during the user's own clicks, we ended up re-rendering every single `Autocliker` component as well, even the ones that didn’t change at all and didn’t need re-rendering. To address that we can memoize the `Autoclicker`. Now it will only ever re-render if the incoming props will change. Let’s say the `amount` increased or decreased, or the state of the button (the `enabled` prop) changed. The component will re-render then. Otherwise it will stay exactly as it was. To do that we are using the [memo()](https://reactjs.org/docs/react-api.html#reactmemo) function that comes with React to wrap our entire component.

Ok, that's really it this time. I promise. Thank you for reading and I hope this was useful to you.
