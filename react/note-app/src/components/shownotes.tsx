import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { notesAtom } from "./recoil/atom";

export default function ShowNotes() {
  const [notesState, setNotesState] = useRecoilState(notesAtom);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDeleteNote = (id: string) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        setNotesState(notesState.filter((note) => note.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  const handleUpdateNote = (id: string, title: string, description: string) => {
    axios
      .put(`http://localhost:3001/update/${id}`, { title, description })
      .then((response) => {
        console.log(response.data);
        setNotesState(
          notesState.map((note) =>
            note.id === id ? { ...note, title, description } : note
          )
        );
      });
  };

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
          <li key={note.id}>
            {editingId === note.id ? (
              // Show input boxes when editing
              <>
                <input
                  value={note.title}
                  onChange={(e) => {
                    setNotesState(
                      notesState.map((n) =>
                        n.id === note.id ? { ...n, title: e.target.value } : n
                      )
                    );
                  }}
                />
                <input
                  value={note.description}
                  onChange={(e) => {
                    setNotesState(
                      notesState.map((n) =>
                        n.id === note.id
                          ? { ...n, description: e.target.value }
                          : n
                      )
                    );
                  }}
                />
                <button
                  onClick={() => {
                    handleUpdateNote(note.id, note.title, note.description);
                    setEditingId(null);
                  }}
                >
                  Save
                </button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              // Show text when not editing
              <>
                <span>
                  {note.title} {note.description}
                </span>
                <button onClick={() => setEditingId(note.id)}>Edit</button>
              </>
            )}
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
