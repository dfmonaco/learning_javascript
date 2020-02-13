function createStore(reducer) {
  // 1. Keep State
  // 2. Get State
  // 3. Subscribe to State changes (listeners)
  // 4. Update State

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener(state));
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

const addNumber = (number) => (
  {
    type: 'ADD_NUMBER',
    number,
  }
);

const removeNumber = (number) => (
  {
    type: 'REMOVE_NUMBER',
    number,
  }
);

// the reducer reduces the current state and an action to a new state
// it must be a pure function:
// 1. Always returns the same result given the same arguments
// 2. Only depend on the arguments passed into them, not on global variables
// 3. Never produce any side effects.
//
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NUMBER':
      return state.concat([action.number]);
    case 'REMOVE_NUMBER':
      return state.filter((number) => number !== action.number);
    default:
      return state;
  }
};

const store = createStore(reducer);

console.log(store.getState());

store.subscribe((state) => { console.log(state+' from subscriber 1'); });
store.subscribe((state) => { console.log(state+' from subscriber 2'); });

store.dispatch(addNumber(3));
store.dispatch(addNumber(8));
store.dispatch(addNumber(23));

store.dispatch(removeNumber(8));

module.exports = createStore;
