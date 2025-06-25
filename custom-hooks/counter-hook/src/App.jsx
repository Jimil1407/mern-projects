import './App.css'
import { useState } from 'react'

function useCounter() {

  const [counter, setCounter] = useState(0);

  function increaseCounter(){
    setCounter(counter+1);
  }
  return {
    counter: counter,
    increaseCounter: increaseCounter
  }
}

function App() {

  const {counter, increaseCounter} = useCounter();
  return (
    <div>
      <button onClick={increaseCounter}> Increase {counter}</button>
    </div>
  )
}

export default App
