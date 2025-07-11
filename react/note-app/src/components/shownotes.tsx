import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { notesAtom } from "./recoil/atom";


export default function ShowNotes() {
  const [notesState, setNotesState] = useRecoilState(notesAtom);

  const handleDeleteNote = (id: string) => {    
    axios.delete(`http://localhost:3001/delete/${id}`)
    .then(response => {
      console.log(response.data)
      setNotesState(notesState.filter((note) => note.id !== id))
    })
    .catch(error => {
      console.error('Error deleting note:', error)
    })
  }

  const fetchNotes = () => {
    axios.get("http://localhost:3001/showNotes").then((response) => {
      setNotesState(response.data);
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesState.map((note, index) => (
          <li key={index}>
            {note.title} {note.description}
            <button onClick={() => handleDeleteNote(note.id)}>Delete Note</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
