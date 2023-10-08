const logMiddleware = (store) => (next) => (action) => {
  // Log the action
  console.log("Dispatching action:", action);

  // Get the current state
  const prevState = store.getState();

  // Call the next middleware or the reducer to process the action
  const result = next(action);

  // Get the new state after the action has been processed
  const nextState = store.getState();

  // Log the previous state and the new state
  console.log("Previous State:", prevState);
  console.log("Next State:", nextState);

  // Return the result, which is usually the action
  return result;
};

export default logMiddleware;
