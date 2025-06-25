import "./App.css";
import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { usePrev } from "./hooks/usePrev";

function App() {

  const [value, setValue] = useState(1);
  const prev = usePrev(value);

  return (
    <>
    <button onClick={() => setValue(c => c+1)}>
      Current value is {value}</button>
      <p>Previous value is {prev}</p>

    </>
  );
}

export default App;
