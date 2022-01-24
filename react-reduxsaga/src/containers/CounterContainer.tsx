import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import {
  decreaseAsync,
  decreaseSagaAsync,
  increaseAsync,
  increaseSagaAsync,
} from "../modules/counter";

function CounterContainer() {
  const count = useSelector((state: { counter: number }) => state.counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increaseSagaAsync());
  };
  const onDecrease = () => {
    dispatch(decreaseSagaAsync());
  };
  return (
    <Counter count={count} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
}

export default CounterContainer;
