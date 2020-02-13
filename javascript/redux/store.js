// CREATESTORE IS THE LIBRARY CODE
function createStore(reducer) {
  // 1. Keep State
  // 2. Get State (getState)
  // 3. Subscribe to State changes by adding listeners (subscribe)
  // 4. Update State (dispatch)

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
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

// ACTIONS AND REDUCERS ARE APP CODE

// ACTIONS
//
const ADD_NUMBER = 'ADD_NUMBER';
const REMOVE_NUMBER = 'REMOVE_NUMBER';
const ADD_STRING = 'ADD_STRING';
const REMOVE_STRING = 'REMOVE_STRING';

const addNumber = (number) => (
  {
    type: ADD_NUMBER,
    number,
  }
);

const removeNumber = (number) => (
  {
    type: REMOVE_NUMBER,
    number,
  }
);

const addString = (string) => (
  {
    type: ADD_STRING,
    string,
  }
);

const removeString = (string) => (
  {
    type: REMOVE_STRING,
    string,
  }
);

// REDUCERS
// the reducer reduces the current state and an action to a new state
// it must be a pure function:
// 1. Always returns the same result given the same arguments
// 2. Only depend on the arguments passed into them, not on global variables
// 3. Never produce any side effects.
//
const numbersReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_NUMBER:
      return state.concat([action.number]);
    case REMOVE_NUMBER:
      return state.filter((number) => number !== action.number);
    default:
      return state;
  }
};

const stringsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_STRING:
      return state.concat([action.string]);
    case REMOVE_STRING:
      return state.filter((string) => string !== action.string);
    default:
      return state;
  }
};

const appReducer = (state = {}, action) => (
  {
    numbers: numbersReducer(state.numbers, action),
    strings: stringsReducer(state.strings, action),
  }
);

// USING THE LIBRARY AND APP CODE

const store = createStore(appReducer);

store.subscribe(() => { console.log('SUBSCRIBER 1:\n'+JSON.stringify(store.getState(), null, 4)); });
store.subscribe(() => { console.log('SUBSCRIBER 2:\n'+JSON.stringify(store.getState(), null, 4)); });

store.dispatch(addNumber(3));
store.dispatch(addNumber(8));
store.dispatch(addNumber(23));

store.dispatch(removeNumber(8));

store.dispatch(addString('foo'));
store.dispatch(addString('bar'));
store.dispatch(addString('baz'));

store.dispatch(removeString('bar'));
