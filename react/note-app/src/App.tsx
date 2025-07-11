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
      // Refetch notes to get the proper data with IDs
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
  <div>
    <h1>Notes App</h1>
    <input type = 'text'placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
    <input type='text' placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)}></input>
    <button onClick={handleAddNote}>Add Note</button>
    <ShowNotes /> 
    </div>
  )
}

export default App
