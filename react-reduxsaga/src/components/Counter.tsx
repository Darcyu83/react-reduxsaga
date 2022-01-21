interface ICounterProps {
  amount: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

function Counter({ amount, onIncrease, onDecrease }: ICounterProps) {
  return (
    <div>
      <h1>{amount}</h1>
      <button onClick={onIncrease}> +1 </button>
      <button onClick={onDecrease}> -1 </button>
    </div>
  );
}
export default Counter;
