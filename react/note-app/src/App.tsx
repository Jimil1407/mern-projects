import './App.css'
import { useState } from 'react'
import axios from 'axios'
import ShowNotes from './components/shownotes'
import { notesAtom } from './components/recoil/atom'
import { useRecoilState } from 'recoil'

function App() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [notesState, setNotesState] = useRecoilState(notesAtom)

  const handleAddNote = () => {
    axios.post('http://localhost:3001/submit', {title: title, description: description})
    .then(response => {
      console.log(response.data)
      axios.get('http://localhost:3001/showNotes')
        .then(fetchResponse => {
          setNotesState(fetchResponse.data)
        })
    })
    .catch(error => {
      console.error('Error adding note:', error)
    })
    setTitle('')
    setDescription('')
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-100 drop-shadow-lg">Notes App</h1>
      <div className="w-full max-w-4xl mb-10 p-6 rounded-2xl shadow-lg bg-black border border-gray-700 flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          onClick={handleAddNote}
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
        >
          Add Note
        </button>
      </div>
      <ShowNotes />
    </div>
  )
}

export default App
