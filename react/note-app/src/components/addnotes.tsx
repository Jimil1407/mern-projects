import axios from "axios"
import { notesAtom } from "./recoil/atom"
import { useState } from "react"
import { useRecoilState } from "recoil"


export default function AddNotes() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [notesState, setNotesState] = useRecoilState(notesAtom)

    const handleAddNote = () => {
        axios.post('http://localhost:3001/submit', {title: title, description: description})
        .then(response => {
            console.log(response.data)  // log the response data
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
            <input type = 'text'placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <input type='text' placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)}></input>
            <button onClick={() => handleAddNote()}>Add Note</button>
        </div>
    )
}
    