import { useAppDispatch, useAppSelector } from "./redux/hook";
import {
  incrementByAmount,
  increment,
  decrement,
} from "./redux/feature/counterSlice";

const App = () => {
  const { value } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-4 justify-center items-center">
      <button
        className="p-4 border border-green-400 outline-none cursor-pointer"
        onClick={() => dispatch(increment())}
      >
        +
      </button>
      <button
        className="p-4 border border-green-400 outline-none cursor-pointer"
        onClick={() => dispatch(incrementByAmount(5))}
      >
        +5
      </button>
      <h1 className="text-3xl font-bold">{value}</h1>
      <button
        className="p-4 border border-red-400 outline-none cursor-pointer"
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
    </div>
  );
};

export default App;
