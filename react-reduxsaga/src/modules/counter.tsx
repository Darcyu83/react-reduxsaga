import { Dispatch } from "react";

const INCREASE = "counter/increase" as const;
const DECREASE = "counter/decrease" as const;

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

export const increaseAsync = () => (dispatch: Dispatch<IAction>) => {
  setTimeout(() => dispatch(increase()), 1000);
};

export const decreaseAsync = () => (dispatch: Dispatch<IAction>) => {
  setTimeout(() => dispatch(decrease()), 1000);
};
const initialState = { amount: 0, diff: 1 };

interface IAction {
  type: typeof INCREASE | typeof DECREASE;
}

interface ICounter {
  amount: number;
  diff: number;
}
export default function reducer(
  state: ICounter = initialState,
  action: IAction
) {
  switch (action.type) {
    case INCREASE:
      return { ...state, amount: state.amount + 1 };
    case DECREASE:
      return { ...state, amount: state.amount - 1 };
    default:
      return state;
  }
}
