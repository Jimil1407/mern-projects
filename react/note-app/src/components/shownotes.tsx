import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { notesAtom } from "./recoil/atom";



export default function ShowNotes() {
  const [notesState, setNotesState] = useRecoilState(notesAtom);
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
        {notesState.map((note) => (
          <li key={note.title}>
            {note.title} {note.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
