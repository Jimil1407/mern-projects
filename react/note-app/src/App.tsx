import './App.css'
import ShowNotes from './components/shownotes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './components/authPage'


function App() {

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col items-center py-10">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowNotes />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
