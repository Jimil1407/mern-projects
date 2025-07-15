import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { notesAtom } from "./recoil/atom";
import AddNotes from "./addnotes";
import { useNavigate } from "react-router-dom";

export default function ShowNotes() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [notesState, setNotesState] = useRecoilState(notesAtom);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<{ [id: string]: string }>({});
  const navigate = useNavigate();
  
  const cardColors = [
    "bg-yellow-200",
    "bg-pink-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-purple-200",
    "bg-orange-200",
    "bg-teal-200",
  ];
  const [deletingIds, setDeletingIds] = useState<string[]>([]);
  
  const getRotation = (idx: number) => {
    const rotations = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-3', ''];
    return rotations[idx % rotations.length];
  };

  const handleDeleteNote = async (id: string) => {
    const token = localStorage.getItem('token');
    const previousNotes = notesState;
    setDeletingIds((prev) => [...prev, id]);
    setTimeout(() => {
      setNotesState((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }, 350); 

    try {
      await axios.delete(`http://localhost:3001/delete/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSuccessMsg('Note deleted successfully!');
      setTimeout(() => setSuccessMsg(''), 2000);
    } catch (error) {
      setNotesState(previousNotes); 
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    } finally {
      setTimeout(() => {
        setDeletingIds((prev) => prev.filter((delId) => delId !== id));
      }, 400);
    }
  };

  const handleUpdateNote = async (id: string, title: string, description: string) => {
    const token = localStorage.getItem('token');
    try{
      const response = await axios.put(`http://localhost:3001/update/${id}`, { title, description }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      console.log(response.data);
      setNotesState(
          notesState.map((note) =>
            note.id === id ? { ...note, title, description } : note
          )
        );
      setUpdateError((prev) => ({ ...prev, [id]: '' }));
      setSuccessMsg('Note updated successfully!');
      setTimeout(() => setSuccessMsg(''), 2000);
    } catch (error: any) {
      let message = 'Error updating note.';
      if (error.response && error.response.data && error.response.data.error) {
        message = error.response.data.error;
      }
      setUpdateError((prev) => ({ ...prev, [id]: message }));
      setTimeout(() => setUpdateError((prev) => ({ ...prev, [id]: '' })), 3000);
      console.error("Error updating note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    try{
      setLoading(true);
      const response = await axios.get("http://localhost:3001/showNotes", {  
      headers: {
        Authorization: `Bearer ${token}`
      }
      });
      setNotesState(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    // If you store a token in localStorage, clear it here (e.g., localStorage.removeItem('token');)
    localStorage.removeItem('token');
    navigate('/auth');
  };

  // Animation helpers
  const noteRefs = useRef<{ [id: string]: HTMLDivElement | null }>({});

  return (
    <div className="w-full px-2 sm:px-6 md:px-12 lg:px-24 xl:px-32 bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-100 drop-shadow-lg">Notes App</h1>
      <AddNotes />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleLogout}>Logout</button>
      <h2 className="text-2xl font-bold mb-6 text-gray-100 mt-2">Your Notes</h2>
      {loading && (
        <div className="flex justify-center items-center my-8">
          <svg className="animate-spin h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="ml-2 text-blue-300 font-semibold">Loading notes...</span>
        </div>
      )}
      {successMsg && (
        <div className="mb-4 w-full text-center bg-green-100 text-green-700 border border-green-300 rounded p-2 font-semibold animate-fade-in">
          {successMsg}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {notesState.map((note, idx) => (
          <div
            key={note.id}
            ref={el => { noteRefs.current[note.id] = el; }}
            className={`relative rounded-xl shadow-xl p-6 min-h-[180px] flex flex-col transition-all duration-300 hover:scale-105 border border-yellow-100 ${cardColors[idx % cardColors.length]} ${getRotation(idx)} sticky-note ${deletingIds.includes(note.id) ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 animate-fade-in'}`}
            style={{
              boxShadow: '0 8px 24px 0 rgba(0,0,0,0.10), 0 1.5px 6px 0 rgba(0,0,0,0.10)',
              backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 8px)',
            }}
          >
            {/* Tape effect */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-16 h-4 bg-yellow-300 rounded opacity-80 z-10 border-b-2 border-yellow-400" style={{boxShadow: '0 2px 6px 0 rgba(0,0,0,0.10)'}}></div>
            {editingId === note.id ? (
              <>
                {updateError[note.id] && (
                  <div className="mb-2 w-full text-center bg-red-100 text-red-700 border border-red-300 rounded p-2 font-semibold animate-fade-in">
                    {updateError[note.id]}
                  </div>
                )}
                <label className="text-xs text-gray-500 mb-1" htmlFor={`title-${note.id}`}>Title</label>
                <input
                  id={`title-${note.id}`}
                  className="border rounded px-2 py-1 mb-2 font-bold text-lg bg-white text-gray-900 border-gray-300"
                  value={note.title}
                  onChange={(e) => {
                    setNotesState(
                      notesState.map((n) =>
                        n.id === note.id ? { ...n, title: e.target.value } : n
                      )
                    );
                    if (updateError[note.id]) setUpdateError((prev) => ({ ...prev, [note.id]: '' }));
                  }}
                />
                <label className="text-xs text-gray-500 mb-1" htmlFor={`desc-${note.id}`}>Description</label>
                <textarea
                  id={`desc-${note.id}`}
                  className="border rounded px-2 py-1 mb-2 resize-none bg-white text-gray-800 border-gray-300"
                  value={note.description}
                  onChange={(e) => {
                    setNotesState(
                      notesState.map((n) =>
                        n.id === note.id ? { ...n, description: e.target.value } : n
                      )
                    );
                    if (updateError[note.id]) setUpdateError((prev) => ({ ...prev, [note.id]: '' }));
                  }}
                />
                <div className="flex gap-2 mt-auto">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => {
                      if (note.title && note.description) {
                        setUpdateError((prev) => ({ ...prev, [note.id]: '' }));
                        handleUpdateNote(note.id, note.title, note.description);
                        setEditingId(null);
                      } else {
                        setUpdateError((prev) => ({ ...prev, [note.id]: 'Title and description are required' }));
                      }
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
                <div className="text-xs text-gray-500 mb-1">Title</div>
                <div className="font-extrabold text-xl mb-1 text-gray-900 leading-tight break-words">{note.title}</div>
                <div className="w-full h-0.5 bg-yellow-300 opacity-60 my-2 rounded" />
                <div className="text-xs text-gray-500 mb-1">Description</div>
                <div className="text-base text-gray-800 mb-4 flex-1 leading-snug break-words">{note.description}</div>
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
