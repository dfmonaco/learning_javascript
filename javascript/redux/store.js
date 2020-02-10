function createStore() {
  // 1. Keep State
  // 2. Get State
  // 3. Subscribe to State changes (listeners)
  // 4. Update State

  const state = { hello: 'world' };
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const execListeners = () => {
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    execListeners,
  };
}

module.exports = createStore;
