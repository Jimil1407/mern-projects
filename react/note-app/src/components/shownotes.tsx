import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { notesAtom } from "./recoil/atom";

export default function ShowNotes() {
  const [notesState, setNotesState] = useRecoilState(notesAtom);
  const [editingId, setEditingId] = useState<string | null>(null);

  const cardColors = [
    "bg-yellow-900/60",
    "bg-orange-900/60",
    "bg-green-900/60",
    "bg-blue-900/60",
    "bg-purple-900/60",
    "bg-pink-900/60",
    "bg-teal-900/60",
  ];

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
    <div className="w-full px-2 sm:px-6 md:px-12 lg:px-24 xl:px-32 bg-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {notesState.map((note, idx) => (
          <div
            key={note.id}
            className={`relative rounded-2xl shadow-lg p-6 min-h-[180px] flex flex-col transition hover:scale-105 duration-200 border border-gray-800 ${cardColors[idx % cardColors.length]}`}
          >
            {editingId === note.id ? (
              <>
                <label className="text-xs text-gray-400 mb-1" htmlFor={`title-${note.id}`}>Title</label>
                <input
                  id={`title-${note.id}`}
                  className="border rounded px-2 py-1 mb-2 font-bold text-lg bg-black text-gray-100 border-gray-700"
                  value={note.title}
                  onChange={(e) =>
                    setNotesState(
                      notesState.map((n) =>
                        n.id === note.id ? { ...n, title: e.target.value } : n
                      )
                    )
                  }
                />
                <label className="text-xs text-gray-400 mb-1" htmlFor={`desc-${note.id}`}>Description</label>
                <textarea
                  id={`desc-${note.id}`}
                  className="border rounded px-2 py-1 mb-2 resize-none bg-black text-gray-100 border-gray-700"
                  value={note.description}
                  onChange={(e) =>
                    setNotesState(
                      notesState.map((n) =>
                        n.id === note.id ? { ...n, description: e.target.value } : n
                      )
                    )
                  }
                />
                <div className="flex gap-2 mt-auto">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => {
                      handleUpdateNote(note.id, note.title, note.description);
                      setEditingId(null);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded hover:bg-gray-600"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-xs text-gray-400 mb-1">Title</div>
                <div className="font-bold text-lg mb-2 text-gray-100">{note.title}</div>
                <div className="text-xs text-gray-400 mb-1">Description</div>
                <div className="text-gray-300 mb-4 flex-1">{note.description}</div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    className="rounded-full p-2 bg-black shadow hover:bg-blue-900/40"
                    onClick={() => setEditingId(note.id)}
                    title="Edit"
                  >
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z"></path></svg>
                  </button>
                  <button
                    className="rounded-full p-2 bg-black shadow hover:bg-red-900/40"
                    onClick={() => handleDeleteNote(note.id)}
                    title="Delete"
                  >
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
