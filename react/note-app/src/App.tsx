import './App.css'
import ShowNotes from './components/shownotes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './components/authPage'
import AppHeader from './components/AppHeader'
import { useState } from 'react'


function App() {
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [categories] = useState(['All', 'Personal', 'Work', 'Fitness', 'Other']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [onAddNote, setOnAddNote] = useState(false);


  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col items-center py-10">
      <AppHeader selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} categories={categories} 
      activeCategory={activeCategory} setActiveCategory={setActiveCategory} onAddNote={() => setOnAddNote(true)} />
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
