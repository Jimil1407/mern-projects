import "./App.css";
import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { usePrev } from "./hooks/usePrev";
import useDebounce from "./hooks/useDebounce";

function App() {

  const delay = 200
  const [inputVal, setInputval] = useState();
  const debounceValue = useDebounce(inputVal,delay);

  function expensive(){
    console.log("expensive operation")
  }

  function change(e){
    setInputval(e.target.value);
  }

  useEffect(() => {
    expensive();
  },[debounceValue])


  return (
    <>
    <input id="input" type="text" onChange={change} placeholder="Enter text" />
    </>
  );
}

export default App;
