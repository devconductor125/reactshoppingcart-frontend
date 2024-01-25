import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './slices/counterSlice';

export default function App() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}