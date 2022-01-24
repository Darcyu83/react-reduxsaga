import React from "react";
function Counter({
  count,
  onIncrease,
  onDecrease,
}: {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
    </div>
  );
}

export default Counter;
