const myLogger = (store: any) => (next: any) => (action: any) => {
  const result = next(action);

  console.log("result next returned ", result);
  console.log(store.getState());

  return result;
};

const thunk = (store: any) => (next: any) => (action: any) => {
  console.log("in thunk", action);
  typeof action === "function"
    ? action(store.dispatch, store.getState)
    : next(action);
};
const myThunk = () => (dispatch: any, getState: any) => {
  dispatch({ type: "HELLO" });
  dispatch({ type: "BYE" });
};

export default myLogger;
