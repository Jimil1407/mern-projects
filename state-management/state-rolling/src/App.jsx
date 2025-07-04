import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div>
      <Lightbulb/>
    </div>
  )
}

function Lightbulb(){
  const [bulbOn, setbulbON] = useState(true);
  return <div>
    <Bulbstate bulbOn={bulbOn}/>
    <Togglebulbstate bulbOn={bulbOn} setbulbON={setbulbON}/>
  </div>
}

function Bulbstate({bulbOn}){
  return <div>
    {bulbOn? "bulb on" : "bulb off"}
  </div>
}

function Togglebulbstate({bulbOn, setbulbON}){

  function toggle(){
    setbulbON(!bulbOn)
  }
  return <div>
    <button onClick={toggle}>toggle the bulb</button>
  </div>
}

export default App
