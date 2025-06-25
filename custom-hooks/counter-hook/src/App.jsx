import "./App.css";
import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";

function App() {

  const [value, setValue] = useState(1);
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/todos/" + value
  );

  return (
    <div>
      <button onClick={() => setValue(1)}>1</button>
      <button onClick={() => setValue(2)}>2</button>
      <button onClick={() => setValue(3)}>3</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
