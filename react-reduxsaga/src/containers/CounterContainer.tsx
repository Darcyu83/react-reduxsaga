import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import { TState } from "../modules";
import {
  decrease,
  decreaseAsync,
  increase,
  increaseAsync,
} from "../modules/counter";

function CounterContainer() {
  const { amount } = useSelector((state: TState) => state.counter);
  const dispatch = useDispatch();

  const onIncrease = () => dispatch(increaseAsync());
  const onDecrease = () => dispatch(decreaseAsync());

  return (
    <Counter amount={amount} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
}
export default CounterContainer;
