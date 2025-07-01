import "./App.css";

function App() {
  return (
    <div className="bg-sky-950 h-screen flex  items-center flex-col">
      <br></br>
      <br></br>
      <br></br>
      <div id="header" className="bg-sky-950 w-1/2 h-1/2">  
        <div className="flex justify-center">
          <img src="https://webinar.gg/loginLogo.svg" alt="Webinar Logo" className="h-10 mr-2" />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="text-white text-center text-2xl font-bold">
          Verify your Age
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="text-gray-400 text-center text-lg">
          Please confirm your birth year. This data won't be stored.
        </div>
        
        <div className="flex justify-center mt-2">
          <input
            type="text"
            id="first_name"
            class="bg-white/15 text-gray-200 px-4 py-3 rounded-md w-1/2"
            placeholder="Your Birth Year"
            required
          />
        </div>

        <div className="flex justify-center mt-10">
          <button className="bg-gray-400 text-white px-4 py-3 rounded-md w-1/2">Continue</button>
        </div>

        <div className="flex justify-center"></div>
        </div>
      
    </div>
  );
}

export default App;
