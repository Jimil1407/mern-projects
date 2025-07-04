import "./App.css";

function App() {
  return (
    <div className="bg-sky-950 h-screen flex items-center flex-col">
      <div id="header" className="max-w-md w-full h-1/2 mt-20">
        <div className="flex justify-center">
          <img
            src="https://webinar.gg/loginLogo.svg"
            alt="Webinar Logo"
            className="h-10 mr-2 "
          />
        </div>
        <div className="text-white text-center text-2xl font-bold mt-20">
          Verify your Age
        </div>
        <div className="text-gray-400 text-center text-lg mt-16">
          Please confirm your birth year. This data won't be stored.
        </div>

        <div className="flex justify-center mt-2">
          <input
            type="text"
            id="first_name"
            className="bg-white/15 text-gray-200 px-4 py-3 rounded-md w-full"
            placeholder="Your Birth Year"
            required
          />
        </div>

        <div className="flex justify-center mt-10">
          <button className="bg-gray-400 text-white px-4 py-3 rounded-md w-full">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
