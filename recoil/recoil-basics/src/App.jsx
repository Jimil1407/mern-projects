import React, {  useEffect  } from 'react';
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {counter, even} from "./atoms";
import { memo } from 'react';
// App Component
function App() {
  return <RecoilRoot>
    <Counter/>
    <IsEven/>
  </RecoilRoot>
};

function IsEven () {
  const isEven = useRecoilValue(even);

  return <div>
    {isEven ? "Even" : "Odd"}
  </div>
}

const Buttons =memo(function(){
  const setCount = useSetRecoilState(counter);

  function increase(){
    setCount(c => c+2);
  }

  function decrease(){
    setCount(c => c-1);
  }

  return(
    <div>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  )
})

function Counter(){
  const count = useRecoilValue(counter);

  return <div>
    {count}
    <Buttons/>
  </div>

}
export default App;